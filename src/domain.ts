export const CHAIN_ID = 61999;
export const RPC = 'https://studio.genlayer.com/api';
export const STATES = ['UNKNOWN','OPERATIONAL','DEGRADED','OUTAGE','MAINTENANCE'] as const;
export type State = typeof STATES[number];
export interface Monitor {id:string;owner:string;scope:string;url:string;state:State;revision:number;last_event:string;checks:number;last_checked:string}
export interface RecordItem {signal:State;updated_at:string;quote:string;source_sha256:string;before:State;after:State;disposition:string;revision:number;checked_at:string;url:string;scope:string}
export function address(value:string): `0x${string}` {
  if(!/^0x[0-9a-fA-F]{40}$/.test(value) || /^0x0{40}$/.test(value)) throw new Error('Enter a nonzero contract address.');
  return value as `0x${string}`;
}
export function monitorReference(owner:string,id:string):string {
  const normalized=address(owner).toLowerCase();
  if(!/^[a-z0-9][a-z0-9_-]{0,47}$/.test(id)) throw new Error('Enter a valid lowercase monitor ID.');
  return `${normalized}::${id}`;
}
export function resolveMonitorReference(input:string,account?:string):string {
  if(input.includes('::')){
    const parts=input.split('::');
    if(parts.length!==2) throw new Error('Use owner-address::monitor-id for public reads.');
    return monitorReference(parts[0],parts[1]);
  }
  if(account) return monitorReference(account,input);
  throw new Error('Connect the monitor owner wallet, or enter owner-address::monitor-id for public reads.');
}
export function validateMonitor(id:string,scope:string,url:string){
  if(!/^[a-z0-9][a-z0-9_-]{0,47}$/.test(id)) throw new Error('Use a lowercase ID, up to 48 letters, numbers, _ or -.');
  if(!scope.trim() || scope.length>160 || /[\x00-\x1f]/.test(scope)) throw new Error('Specify the exact service, component and region (up to 160 characters).');
  let parsed: URL; try {parsed=new URL(url)} catch {throw new Error('Enter a public HTTPS source URL.')}
  if(parsed.protocol!=='https:' || parsed.username || parsed.password || parsed.port || parsed.search || parsed.hash || url.length>512 || !/^https:\/\/[a-z0-9.-]+(?:\/[^\s?#\\]*)?$/.test(url) || !/\.[a-z]{2,24}$/.test(parsed.hostname) || /(^|\.)(localhost|local|internal|test|example|invalid|home|lan)$/.test(parsed.hostname)) throw new Error('Use public HTTPS, without credentials, ports, query or fragment.');
}
function parseContractJson(raw:unknown,method:string):Record<string,unknown> {
  if(typeof raw!=='string') throw new Error(`Invalid ${method} response: expected a JSON string.`);
  let data:unknown;
  try {data=JSON.parse(raw)} catch {throw new Error(`Invalid ${method} JSON response.`)}
  if(!data || typeof data!=='object' || Array.isArray(data)) throw new Error(`Invalid ${method} response object.`);
  return data as Record<string,unknown>;
}
export function parseMonitor(raw:unknown):Monitor {
  const data=parseContractJson(raw,'get_monitor');
  if(!STATES.includes(data.state as State) || !Number.isSafeInteger(data.revision) || (data.revision as number)<0 || !Number.isSafeInteger(data.checks) || (data.checks as number)<0 || ['id','owner','url','scope','last_event','last_checked'].some(k=>typeof data[k]!=='string')) throw new Error('Invalid get_monitor response fields.');
  return data as unknown as Monitor;
}
export function parseRecord(raw:unknown):RecordItem {
  const data=parseContractJson(raw,'get_record');
  if(['signal','before','after'].some(k=>!STATES.includes(data[k] as State)) || !Number.isSafeInteger(data.revision) || (data.revision as number)<1 || ['updated_at','quote','source_sha256','disposition','checked_at','url','scope'].some(k=>typeof data[k]!=='string')) throw new Error('Invalid get_record response fields.');
  return data as unknown as RecordItem;
}
export function json(value:unknown){return JSON.stringify(value,(_,v)=>typeof v==='bigint'?v.toString():v,2)}
export function receiptState(tx:unknown):'pending'|'success'|'failed'|'unverified' {
  if(!tx || typeof tx!=='object') return 'pending';
 const t=tx as {statusName?:string;status?:number|string;resultName?:string;result_name?:string;txExecutionResult?:number;txExecutionResultName?:string;consensus_data?:{votes?:Record<string,string>;leader_receipt?:{mode?:string;execution_result?:string}[]}};
  const status=String(t.statusName??t.status??'').toUpperCase();
  if(['UNDETERMINED','CANCELED','VALIDATORS_TIMEOUT','LEADER_TIMEOUT'].includes(status)) return 'failed';
  if(status!=='FINALIZED' && status!=='7') return 'pending';
 const votes=Object.values(t.consensus_data?.votes??{}).map(v=>v.toUpperCase());
 const consensus=String(t.resultName??t.result_name??'').toUpperCase();
 const receipts=t.consensus_data?.leader_receipt??[];
 // Studio can append a validator error to this array after a successful leader.
 const leader=receipts.some(r=>r.mode!==undefined)?receipts.filter(r=>r.mode==='leader').at(-1):receipts.at(-1);
 const agreed=consensus==='MAJORITY_AGREE' || (votes.length>=3 && votes.filter(x=>x==='AGREE').length>votes.length/2);
 const executed=t.txExecutionResult===1 || t.txExecutionResultName==='FINISHED_WITH_RETURN' || leader?.execution_result==='SUCCESS';
 if(t.txExecutionResult===2 || t.txExecutionResultName==='FINISHED_WITH_ERROR' || ['MAJORITY_DISAGREE','FAILURE','TIMEOUT','NO_MAJORITY'].includes(consensus) || leader?.execution_result==='ERROR') return 'failed';
  return agreed && executed ? 'success' : 'unverified';
}
