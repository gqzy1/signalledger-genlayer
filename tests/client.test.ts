import {describe,it,expect,vi,beforeEach} from 'vitest';
const sdk=vi.hoisted(()=>({request:vi.fn(),getContractCode:vi.fn(),readContract:vi.fn(),writeContract:vi.fn(),getTransaction:vi.fn()}));
vi.mock('genlayer-js',()=>({createClient:vi.fn(()=>sdk)}));
import {ensureChain,write,poll,type Provider} from '../src/client';
const account=('0x'+'a'.repeat(40)) as `0x${string}`;
const target=('0x'+'b'.repeat(40)) as `0x${string}`;
beforeEach(()=>vi.clearAllMocks());
describe('wallet guard and submission',()=>{
 it('rejects wrong network after switching',async()=>{const request=vi.fn().mockResolvedValue('0x1');await expect(ensureChain({request,on:vi.fn(),removeListener:vi.fn()} as Provider)).rejects.toThrow('61999');expect(request).toHaveBeenCalledWith({method:'wallet_switchEthereumChain',params:[{chainId:'0xf22f'}]})});
 it('rejects wallet account changes without signing',async()=>{const request=vi.fn().mockImplementation(async({method})=>method==='eth_chainId'?'0xf22f':['0x'+'c'.repeat(40)]);await expect(write({request,on:vi.fn(),removeListener:vi.fn()} as Provider,account,target,'check',['m',0])).rejects.toThrow('account changed');expect(sdk.writeContract).not.toHaveBeenCalled()});
 it('submits consensus-enabled call on stable SDK',async()=>{const hash='0x'+'d'.repeat(64);sdk.writeContract.mockResolvedValue(hash);const request=vi.fn().mockImplementation(async({method})=>method==='eth_chainId'?'0xf22f':[account]);expect(await write({request,on:vi.fn(),removeListener:vi.fn()} as Provider,account,target,'check',['m',3])).toBe(hash);expect(sdk.writeContract).toHaveBeenCalledWith({address:target,functionName:'check',args:['m',3],value:0n,leaderOnly:false,consensusMaxRotations:1})});
 it('propagates wallet rejection',async()=>{sdk.writeContract.mockRejectedValue(new Error('User rejected'));const request=vi.fn().mockImplementation(async({method})=>method==='eth_chainId'?'0xf22f':[account]);await expect(write({request,on:vi.fn(),removeListener:vi.fn()} as Provider,account,target,'check',['m',0])).rejects.toThrow('User rejected')});
 it('tracker stops on consensus failure',async()=>{sdk.getTransaction.mockResolvedValue({statusName:'UNDETERMINED'});expect(await poll('0x'+'e'.repeat(64),vi.fn())).toBe('failed');expect(sdk.getTransaction).toHaveBeenCalledTimes(1)});
});

describe('official source binding',()=>{
 it('rejects a wrong RPC chain before binding',async()=>{sdk.request.mockResolvedValue('0x1');const {verifyContract}=await import('../src/client');await expect(verifyContract(target)).rejects.toThrow('Unexpected RPC network')});
 it('rejects a contract with different source bytes',async()=>{sdk.request.mockResolvedValue('0xf22f');sdk.getContractCode.mockResolvedValue('unrelated code');const {verifyContract}=await import('../src/client');await expect(verifyContract(target)).rejects.toThrow('differs from the official');expect(sdk.readContract).not.toHaveBeenCalled()});
});
