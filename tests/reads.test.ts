import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {abi} from 'genlayer-js';
import {fromRlp,toHex} from 'viem';
import {reader,read,verifyContract} from '../src/client';
import {loadMonitor} from '../src/monitor';
import {monitorReference,parseMonitor,parseRecord,resolveMonitorReference} from '../src/domain';
import manifest from '../deployment.json';
import source from '../intelligent-contract/contracts/signal_ledger.py?raw';

// Offline fixtures, not captured chain evidence. Only state/revision/checks match the supplied baseline.
const ref=monitorReference(manifest.monitorOwner,manifest.monitorId);
const target=manifest.contractAddress as `0x${string}`;
const initial={id:manifest.monitorId,owner:manifest.monitorOwner.toLowerCase(),scope:'Offline test scope',url:'https://status.service.com/incidents/fixture',state:'UNKNOWN',revision:0,checks:0,last_event:'',last_checked:''};
const current={...initial,state:'OPERATIONAL',revision:1,checks:1};
const record={signal:'OPERATIONAL',before:'UNKNOWN',after:'OPERATIONAL',revision:1,disposition:'TRANSITION',quote:'Offline test fixture.',updated_at:'',source_sha256:'a'.repeat(64),checked_at:'',url:initial.url,scope:initial.scope};
const encoded=(value:Parameters<typeof abi.calldata.encode>[0])=>toHex(abi.calldata.encode(value)).slice(2);
beforeEach(()=>vi.stubGlobal('fetch',vi.fn(async()=>{throw new Error('Unmocked network request blocked by test')})));
afterEach(()=>{vi.restoreAllMocks();vi.unstubAllGlobals()});

function rpcFixture(monitor=initial,history:unknown=record){
 const calls:{method:string;args:unknown[];to:string;variant:string}[]=[];
 const handler=async (request:any)=>{
  if(request.method==='eth_chainId') return '0xf22f';
  if(request.method==='gen_getContractCode') return btoa(source);
  if(request.method!=='gen_call') throw new Error(`Unexpected RPC ${request.method}`);
  const params=request.params[0];
  const [data]=fromRlp(params.data,'bytes') as Uint8Array[];
  const call=Object.fromEntries(abi.calldata.decode(data) as Map<string,unknown>) as {method:string;args:unknown[]};
  calls.push({...call,to:params.to,variant:params.transaction_hash_variant});
  if(call.method==='get_count') return encoded(1n);
  if(call.args[0]!==ref) throw new Error('Use owner-address::monitor-id');
  if(call.method==='get_monitor') return encoded(JSON.stringify(monitor));
  if(call.method==='get_record') return {data:encoded(typeof history==='string'?history:JSON.stringify(history)),status:{code:0}};
  throw new Error(`Unexpected contract method ${call.method}`);
 };
 const request=vi.fn(async (url:string,init:RequestInit)=>{
  expect(url).toBe(manifest.rpc);
  expect(init.method).toBe('POST');
  const rpc=JSON.parse(init.body as string);
  return new Response(JSON.stringify({jsonrpc:'2.0',id:rpc.id,result:await handler(rpc)}));
 });
 vi.stubGlobal('fetch',request);
 return {calls,request};
}

describe('active frontend deployment',()=>{
 it('pins the supplied Stable deployment and verifies exact candidate source before binding',async()=>{
  const {calls}=rpcFixture();
  expect(target).toBe('0x6022e1Dba86A150e420bd4f027c6C2eD4a5487b4');
  expect(manifest.chainId).toBe(61999);
  expect(manifest.rpc).toBe('https://studio.genlayer.com/api');
  expect(reader.chain.id).toBe(61999);
  expect(await verifyContract(target)).toBe(target);
  expect(calls).toEqual([{method:'get_count',to:target,variant:'latest-final'}]);
 });
 it('still refuses a different deployed source',async()=>{
  vi.spyOn(reader,'request').mockResolvedValue('0xf22f');
  vi.spyOn(reader,'getContractCode').mockResolvedValue('different source');
  await expect(verifyContract(target)).rejects.toThrow('source differs');
 });
 it('refuses the wrong RPC chain before fetching source',async()=>{
  vi.spyOn(reader,'request').mockResolvedValue('0x1');
  const code=vi.spyOn(reader,'getContractCode');
  await expect(verifyContract(target)).rejects.toThrow('Unexpected RPC network');
  expect(code).not.toHaveBeenCalled();
 });
});

describe('owner-scoped finalized reads through the pinned SDK',()=>{
 it('loads UNKNOWN / revision 0 / checks 0 with no history request',async()=>{
  const {calls}=rpcFixture();
  expect(await loadMonitor(target,ref)).toEqual({monitor:initial,records:[]});
  expect(calls).toEqual([{method:'get_monitor',args:[ref],to:target,variant:'latest-final'}]);
 });
 it('uses a qualified string and an integer revision; decodes SDK string and status/data responses',async()=>{
  const {calls}=rpcFixture(current);
  expect(await loadMonitor(target,ref)).toEqual({monitor:current,records:[record]});
  expect(calls).toEqual([
   {method:'get_monitor',args:[ref],to:target,variant:'latest-final'},
   {method:'get_record',args:[ref,1n],to:target,variant:'latest-final'}
  ]);
 });
 it('keeps the explicit example owner when another wallet is connected',async()=>{
  const {calls}=rpcFixture();
  await loadMonitor(target,ref,'0x'+'a'.repeat(40));
  expect(calls[0].args).toEqual([ref]);
 });
 it('does not guess a public owner from a bare ID',async()=>{
  const {request}=rpcFixture();
  await expect(loadMonitor(target,manifest.monitorId)).rejects.toThrow('owner-address::monitor-id');
  expect(request).not.toHaveBeenCalled();
  expect(resolveMonitorReference(manifest.monitorId,manifest.monitorOwner)).toBe(ref);
 });
 it('bounds history at ten records without ever requesting revision zero',async()=>{
  const {calls}=rpcFixture({...current,revision:12,checks:12});
  const loaded=await loadMonitor(target,ref);
  expect(loaded.records).toHaveLength(10);
  expect(calls.slice(1).map(c=>c.args[1])).toEqual([12n,11n,10n,9n,8n,7n,6n,5n,4n,3n]);
 });
 it('identifies a history decode failure rather than reporting a successful load',async()=>{
  rpcFixture(current,'broken JSON');
  await expect(loadMonitor(target,ref)).rejects.toThrow('Invalid get_record JSON response');
 });
 it('retains method, target and original HTTP/RPC error diagnostics',async()=>{
  vi.spyOn(reader,'readContract').mockRejectedValue(new Error('HTTP 403; error code: 1010'));
  await expect(read(target,'get_monitor',[ref])).rejects.toThrow(`Finalized read get_monitor(["${ref}"]) at ${target} failed. HTTP 403; error code: 1010`);
 });
 it('does not turn a gen_call error status into empty or UNKNOWN state',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>new Response(JSON.stringify({jsonrpc:'2.0',id:1,result:{data:'',status:{code:2,message:'Error getting the contract state'}}}))));
  await expect(read(target,'get_monitor',[ref])).rejects.toThrow('gen_call failed: Error getting the contract state');
 });
});

describe('JSON boundary',()=>{
 it.each(['null','[]','"wrapped"','broken','{}'])('rejects invalid monitor JSON %s',raw=>expect(()=>parseMonitor(raw)).toThrow('get_monitor'));
 it('requires fields used by the UI before rendering',()=>{
  expect(()=>parseMonitor(JSON.stringify({...initial,checks:undefined}))).toThrow('get_monitor');
  expect(()=>parseRecord(JSON.stringify({...record,disposition:undefined}))).toThrow('get_record');
 });
 it('rejects objects instead of double-decoding SDK output',()=>expect(()=>parseMonitor(initial)).toThrow('expected a JSON string'));
});
