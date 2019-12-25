import { ITcpSignatureInitialTtl } from '../../Signature/ITcpSignatureInitialTtl';
import { TcpSignatureInitialTtlMatchType } from '../../Signature/TcpSignatureInitialTtlMatchType';

export function mapP0fSignatureInitialTtl(ittl: string): ITcpSignatureInitialTtl {
    const ittlMatchResult = ittl.match(/^(\d+)(-)$/);

    return {
        value: Number.parseInt(ittlMatchResult ? ittlMatchResult[0] : ittl, 10),
        match: ittlMatchResult ? TcpSignatureInitialTtlMatchType.LessOrEqual : TcpSignatureInitialTtlMatchType.Exact,
    };
}
