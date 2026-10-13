import {createClient} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {readFile} from 'node:fs/promises';
const client=createClient({chain:studionet,endpoint:'https://studio.genlayer.com/api'});
const network=await client.request({method:'eth_chainId'});
if(Number(network)!==61999)throw new Error('Wrong chain');
const code=await readFile('intelligent-contract/contracts/signal_ledger.py','utf8');
const schema=await client.getContractSchemaForCode(code);
console.log(JSON.stringify({chainId:Number(network),schema},null,2));
