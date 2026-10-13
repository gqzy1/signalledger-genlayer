import {createClient} from 'genlayer-js';import {studionet} from 'genlayer-js/chains';import {TransactionHashVariant} from 'genlayer-js/types';import {writeFile} from 'node:fs/promises';
const c=createClient({chain:studionet,endpoint:'https://studio.genlayer.com/api'}),address='0x468aCd1d9B4db1527d92Bc41Fc76d4016eb11247';
const state={monitor:JSON.parse(await c.readContract({address,functionName:'get_monitor',args:['fast2-eu-api'],transactionHashVariant:TransactionHashVariant.LATEST_FINAL}))};
if(process.argv[2])state.record=JSON.parse(await c.readContract({address,functionName:'get_record',args:['fast2-eu-api',Number(process.argv[2])],transactionHashVariant:TransactionHashVariant.LATEST_FINAL}));
await writeFile(process.argv[3],JSON.stringify(state,null,2));console.log(JSON.stringify(state));
