import { IPacketViewTcp } from '../../../../DAL/Packet/Tcp/IPacketViewTcp';
import { ITcpSignature } from '../Signature/ITcpSignature';
import { tcpSignatureCheckIpVersion } from './tcpSignatureCheckIpVersion';
import { tcpSignatureCheckInitialTtl } from './tcpSignatureCheckInitialTtl';
import { tcpSignatureCheckWindowSize } from './tcpSignatureCheckWindowSize';
import { tcpSignatureCheckScalingFactor } from './tcpSignatureCheckScalingFactor';
import { tcpSignatureCheckOptions } from './tcpSignatureCheckOptions';
import { tcpSignatureCheckQuirks } from './tcpSignatureCheckQuirks';

type TcpChecking = (packet: IPacketViewTcp, signature: ITcpSignature) => boolean;

export const tcpSignatureCheckingChain: TcpChecking[] = [
    tcpSignatureCheckIpVersion,
    tcpSignatureCheckInitialTtl,
    tcpSignatureCheckWindowSize,
    tcpSignatureCheckScalingFactor,
    tcpSignatureCheckOptions,
    tcpSignatureCheckQuirks,
];
