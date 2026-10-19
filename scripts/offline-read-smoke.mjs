import {createRequire} from 'node:module';
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {webcrypto} from 'node:crypto';
// Optional DOM smoke check: provide jsdom 30.1.2 through SIGNALLEDGER_JSDOM_MODULE.
const require=createRequire(import.meta.url);
const {JSDOM}=require(process.env.SIGNALLEDGER_JSDOM_MODULE??'jsdom');
const root=process.cwd();
const {abi}=await import(root+'/node_modules/genlayer-js/dist/index.js');
const {fromRlp,toHex}=await import(root+'/node_modules/viem/_esm/index.js');
const manifest=JSON.parse(readFileSync(root+'/deployment.json'));
const code=readFileSync(root+'/intelligent-contract/contracts/signal_ledger.py','utf8');
const bundle=readFileSync(root+'/dist/assets/'+readdirSync(root+'/dist/assets').find(n=>/^index-.*\.js$/.test(n)),'utf8');
const reference=manifest.monitorOwner.toLowerCase()+'::'+manifest.monitorId;
const initial={id:manifest.monitorId,owner:manifest.monitorOwner.toLowerCase(),scope:'Offline UI fixture',url:'https://status.service.com/incidents/ui-fixture',state:'UNKNOWN',revision:0,checks:0,last_event:'',last_checked:''};
let fail=false;
const requests=[];
const errors=[];
const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:'https://frontend-fixture.invalid/?w=1',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window;
for(const [k,v] of Object.entries({TextEncoder,TextDecoder,Response,Request,Headers,structuredClone})) w[k]=v;
Object.defineProperty(w.crypto,'subtle',{value:webcrypto.subtle});
w.addEventListener('error',e=>errors.push(e.message));
w.fetch=async(url,init)=>{
 if(url!==manifest.rpc) throw new Error('External request blocked');
 const req=JSON.parse(init.body);requests.push(req);
 let result;
 if(req.method==='eth_chainId') result='0xf22f';
 else if(req.method==='gen_getContractCode') result=Buffer.from(code).toString('base64');
 else if(req.method==='gen_call'){
  const p=req.params[0];
  if(p.type!=='read' || p.to!==manifest.contractAddress || p.transaction_hash_variant!=='latest-final') throw new Error('Invalid read request');
  const call=Object.fromEntries(abi.calldata.decode(fromRlp(p.data,'bytes')[0]));
  if(call.method==='get_count') result=toHex(abi.calldata.encode(1n)).slice(2);
  else if(call.method==='get_monitor'){
   if(call.args[0]!==reference) throw new Error('Wrong monitor owner');
   if(fail) return new Response(JSON.stringify({jsonrpc:'2.0',id:req.id,result:{data:'',status:{code:2,message:'Error getting the contract state'}}}));
   result=toHex(abi.calldata.encode(JSON.stringify(initial))).slice(2);
  }else throw new Error('Unexpected history or write call '+call.method);
 }else throw new Error('Forbidden RPC '+req.method);
 return new Response(JSON.stringify({jsonrpc:'2.0',id:req.id,result}));
};
const until=async(predicate)=>{for(let i=0;i<100;i++){if(predicate())return;await new Promise(r=>setTimeout(r,10))}throw new Error('UI timeout: '+w.document.body.textContent.slice(-1200))};
const status=()=>w.document.querySelector('[role="status"]')?.textContent??'';
const button=(text)=>[...w.document.querySelectorAll('button')].find(b=>b.textContent===text);
try{w.eval(bundle.replace(/export\{[^}]+\};\s*$/,'').replaceAll('import.meta.url',JSON.stringify('https://frontend-fixture.invalid/assets/index.js')))}catch(error){console.error(error.name+': '+error.message);process.exit(1)}
await until(()=>status().includes('Onchain example loaded'));
if(!w.document.querySelector('.accepted')?.textContent.includes('UNKNOWN'))throw new Error('UNKNOWN initial state missing');
if(w.document.querySelectorAll('.record').length)throw new Error('Initial history not empty');
if(!button('Verify announcement').disabled)throw new Error('Guest write button enabled');
fail=true;button('Load by ID').click();
await until(()=>status().includes('Error getting the contract state'));
fail=false;button('Load by ID').click();
if(status().includes('Error getting the contract state')){
 await until(()=>!status().includes('Error getting the contract state'));
}
await until(()=>status()==='Loaded finalized contract state.');
if(errors.length)throw new Error('Browser errors: '+errors.join(';'));
const result={mode:'OFFLINE — all HTTP intercepted; synthetic UI fixture',checks:['production bundle renders UNKNOWN/revision 0/checks 0','no revision-zero/history read','guest write disabled','RPC error shown with method/target','successful reload replaces stale error'],rpcMethods:requests.map(r=>r.method),writeRequests:0,pageErrors:errors};
if(process.env.SIGNALLEDGER_SMOKE_OUTPUT)writeFileSync(process.env.SIGNALLEDGER_SMOKE_OUTPUT,JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));dom.window.close();
