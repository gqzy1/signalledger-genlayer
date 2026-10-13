import {createClient} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {TransactionHashVariant,type TransactionHash} from 'genlayer-js/types';
import type {EIP1193Provider} from 'viem';
import {address,CHAIN_ID,RPC,receiptState} from './domain';
import manifest from '../deployment.json';
export type Provider = EIP1193Provider;
export const reader = createClient({chain:studionet,endpoint:RPC});
export async function verifyContract(value:string){
 const target=address(value);
 const network=await reader.request({method:'eth_chainId'});
 if(Number(network)!==CHAIN_ID) throw new Error('Unexpected RPC network. Writes disabled.');
 const code=await reader.getContractCode(target);
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(code));
 const hash=Array.from(new Uint8Array(digest),v=>v.toString(16).padStart(2,'0')).join('');
 if(hash!==manifest.sourceSha256) throw new Error('Contract source differs from the official SignalLedger source.');
 await reader.readContract({address:target,functionName:'get_count',args:[],transactionHashVariant:TransactionHashVariant.LATEST_FINAL});
 return target;
}
export async function connect(provider:Provider){
 const accounts=await provider.request({method:'eth_requestAccounts'});
 const account=address(accounts[0]??'');
 await ensureChain(provider);
 return account;
}
export async function ensureChain(provider:Provider){
 const current=await provider.request({method:'eth_chainId'});
 if(Number(current)!==CHAIN_ID){
  try {await provider.request({method:'wallet_switchEthereumChain',params:[{chainId:'0xf22f'}]})}
  catch(error){
   if((error as {code?:number}).code!==4902) throw error;
   await provider.request({method:'wallet_addEthereumChain',params:[{chainId:'0xf22f',chainName:'GenLayer Stable Studionet',nativeCurrency:{name:'GEN',symbol:'GEN',decimals:18},rpcUrls:[RPC],blockExplorerUrls:['https://explorer-studio.genlayer.com']}]});
   await provider.request({method:'wallet_switchEthereumChain',params:[{chainId:'0xf22f'}]});
  }
 }
 if(Number(await provider.request({method:'eth_chainId'}))!==CHAIN_ID) throw new Error('Wallet must use Stable Studionet 61999.');
}
export async function read(target:`0x${string}`,method:string,args:(string|number)[]){
 return reader.readContract({address:target,functionName:method,args,transactionHashVariant:TransactionHashVariant.LATEST_FINAL});
}
export async function write(provider:Provider,account:`0x${string}`,target:`0x${string}`,method:string,args:(string|number)[]){
 await ensureChain(provider);
 const current=await provider.request({method:'eth_accounts'});
 if(current[0]?.toLowerCase()!==account.toLowerCase()) throw new Error('Wallet account changed. Reconnect.');
 const wallet=createClient({chain:studionet,endpoint:RPC,account,provider});
 // Stable SDK uses eth_estimateGas/eth_gasPrice, not sim_getFeeConfig.
 const hash=await wallet.writeContract({address:target,functionName:method,args,value:0n,leaderOnly:false,consensusMaxRotations:1});
 if(typeof hash!=='string' || !/^0x[0-9a-fA-F]{64}$/.test(hash)) throw new Error('No valid transaction ID returned. Inspect your wallet before retrying.');
 return hash;
}
export async function poll(hash:string,onReceipt:(tx:unknown)=>void){
 if(!/^0x[0-9a-fA-F]{64}$/.test(hash)) throw new Error('Enter a 32-byte transaction ID.');
 for(let attempt=0;attempt<40;attempt++){
  const tx=await reader.getTransaction({hash:hash as TransactionHash});
  onReceipt(tx);
  const outcome=receiptState(tx);
  if(outcome!=='pending') return outcome;
  await new Promise(resolve=>setTimeout(resolve,3000));
 }
 return 'pending';
}
