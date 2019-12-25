import { TcpSignatureIpVersion } from '../Signature/TcpSignatureIpVersion';

export function mapP0fSignatureIpVersion(ver: string): TcpSignatureIpVersion {
    if (ver === '4') {
        return TcpSignatureIpVersion.Ipv4;
    } else if (ver === '6') {
        return TcpSignatureIpVersion.Ipv6;
    }

    return TcpSignatureIpVersion.Any;
}
