import {describe,it,expect} from 'vitest';
import {address,validateMonitor,parseMonitor,receiptState,monitorReference} from '../src/domain';
import capturedReceipt from './fixtures/studio-finalized-insufficient.json';
describe('input and read boundary',()=>{
 it('normalizes owner-scoped monitor references',()=>expect(monitorReference('0x'+'A'.repeat(40),'payments-eu')).toBe('0x'+'a'.repeat(40)+'::payments-eu'));
 it('rejects invalid monitor IDs in public references',()=>expect(()=>monitorReference('0x'+'a'.repeat(40),'Bad ID')).toThrow());
 it('accepts a bounded scope and public source',()=>expect(()=>validateMonitor('payments-eu','Payment API / Europe','https://status.service.com/incidents/123')).not.toThrow());
 it.each(['http://site.com','https://127.0.0.1','https://localhost','https://site.internal','https://user@site.com','https://site.com?a=b','https://site.com/#x'])('rejects unsafe source %s',url=>expect(()=>validateMonitor('x','Service',url)).toThrow());
 it('rejects oversized scope and bad ID',()=>{expect(()=>validateMonitor('BAD','Service','https://site.com')).toThrow();expect(()=>validateMonitor('x','s'.repeat(161),'https://site.com')).toThrow()});
 it.each(['0x'+'0'.repeat(40),'bad','0x123'])('rejects missing address %s',x=>expect(()=>address(x)).toThrow());
 it('requires valid finalized read schema',()=>{expect(()=>parseMonitor({})).toThrow();expect(()=>parseMonitor('{"state":"FAKE","revision":0}')).toThrow()});
});
describe('honest transaction lifecycle',()=>{
 it('does not treat accepted as finalized success',()=>expect(receiptState({statusName:'ACCEPTED',resultName:'MAJORITY_AGREE',txExecutionResult:1})).toBe('pending'));
 it('requires consensus AND execution evidence',()=>{expect(receiptState({statusName:'FINALIZED'})).toBe('unverified');expect(receiptState({statusName:'FINALIZED',resultName:'MAJORITY_AGREE'})).toBe('unverified');expect(receiptState({statusName:'FINALIZED',txExecutionResult:1})).toBe('unverified')});
 it('accepts finalized SDK result with execution proof',()=>expect(receiptState({statusName:'FINALIZED',resultName:'MAJORITY_AGREE',txExecutionResult:1})).toBe('success'));
 it('supports stable Studio vote and receipt proof',()=>expect(receiptState({statusName:'FINALIZED',consensus_data:{votes:{a:'AGREE',b:'AGREE',c:'AGREE',d:'DISAGREE',e:'DISAGREE'},leader_receipt:[{execution_result:'SUCCESS'}]}})).toBe('success'));
 it('recognizes lowercase votes returned by the real Studio RPC',()=>expect(receiptState({statusName:'FINALIZED',consensus_data:{votes:{a:'agree',b:'agree',c:'agree',d:'idle',e:'idle'},leader_receipt:[{execution_result:'SUCCESS'}]}})).toBe('success'));
 it.each(['UNDETERMINED','CANCELED','LEADER_TIMEOUT','VALIDATORS_TIMEOUT'])('fails terminal %s',statusName=>expect(receiptState({statusName})).toBe('failed'));
 it('does not turn finalized execution error into PASS',()=>expect(receiptState({statusName:'FINALIZED',resultName:'MAJORITY_AGREE',txExecutionResult:2})).toBe('failed'));
 it('does not accept a minority',()=>expect(receiptState({statusName:'FINALIZED',consensus_data:{votes:{a:'AGREE',b:'DISAGREE',c:'DISAGREE'},leader_receipt:[{execution_result:'SUCCESS'}]}})).toBe('unverified'));
});

describe('captured live Studio receipt',()=>{
 it('accepts the actual successful transaction with a trailing validator timeout',()=>expect(receiptState(capturedReceipt)).toBe('success'));
 it('still fails when the actual leader fails',()=>{const tx=structuredClone(capturedReceipt);tx.consensus_data.leader_receipt[0].execution_result='ERROR';expect(receiptState(tx)).toBe('failed')});
 it('does not treat a validator-only receipt as leader execution proof',()=>{const tx=structuredClone(capturedReceipt);tx.consensus_data.leader_receipt=[{mode:'validator',vote:'agree',execution_result:'SUCCESS'}];expect(receiptState(tx)).toBe('unverified')});
});
