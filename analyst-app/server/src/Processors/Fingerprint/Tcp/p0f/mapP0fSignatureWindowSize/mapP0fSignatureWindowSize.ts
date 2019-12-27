import { ITcpSignatureWindowSize } from '../../Signature/ITcpSignatureWindowSize';
import { TcpSignatureWindowSizeValueType } from '../../Signature/TcpSignatureWindowSizeValueType';

export function mapP0fSignatureWindowSize(wsize: string): ITcpSignatureWindowSize {
    const windowSizeMatchResult = wsize.match(/^mss\*(\d+)$/);

    return  {
        value: Number.parseInt(windowSizeMatchResult ? windowSizeMatchResult[1] : wsize, 10),
        valueType: windowSizeMatchResult ? TcpSignatureWindowSizeValueType.MultipliedByMss : TcpSignatureWindowSizeValueType.Exact,
    };
}
