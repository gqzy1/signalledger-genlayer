import {read} from './client';
import {parseMonitor,parseRecord,resolveMonitorReference,type RecordItem} from './domain';

export async function loadMonitor(target:`0x${string}`,input:string,account?:string){
 const ref=resolveMonitorReference(input,account);
 const monitor=parseMonitor(await read(target,'get_monitor',[ref]));
 const records:RecordItem[]=[];
 for(let revision=monitor.revision;revision>Math.max(0,monitor.revision-10);revision--){
  records.push(parseRecord(await read(target,'get_record',[ref,revision])));
 }
 return {monitor,records};
}
