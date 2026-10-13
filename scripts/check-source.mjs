import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const code=await readFile('intelligent-contract/contracts/signal_ledger.py');
const manifest=JSON.parse(await readFile('deployment.json','utf8'));
const hash=createHash('sha256').update(code).digest('hex');
if(hash!==manifest.sourceSha256)throw new Error('Canonical source SHA256 mismatch');
if(manifest.chainId!==61999 || manifest.rpc!=='https://studio.genlayer.com/api')throw new Error('Wrong network');
console.log('PASS official source SHA256: '+hash);
