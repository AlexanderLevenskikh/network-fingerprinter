import { FlowTcpControlBit } from '../../DAL/Flow/FlowTcpControlBit';
import { numberToWord } from '../../Shared/Utils/numberToWord';
import { notEmpty } from '../../Shared/Utils/notEmpty';

const bitIndexToTcpControlBitMap: { [key: number]: FlowTcpControlBit} = {
    7: FlowTcpControlBit.NS,
    8: FlowTcpControlBit.CWR,
    9: FlowTcpControlBit.ECE,
    10: FlowTcpControlBit.URG,
    11: FlowTcpControlBit.ACK,
    12: FlowTcpControlBit.PSH,
    13: FlowTcpControlBit.RST,
    14: FlowTcpControlBit.SYN,
    15: FlowTcpControlBit.FIN,
};

export function mapFlowToTcpControlBits(tcpControlBits: number): FlowTcpControlBit[] {
    const word = numberToWord(tcpControlBits);
    const bits = word.split('');

    return bits
        .map((bit: '0' | '1', index: number) => {
            if (bit === '1') {
                const tcpControlBit = bitIndexToTcpControlBitMap[index];
                if (notEmpty(tcpControlBit)) {
                    return tcpControlBit;
                }
            }

            return null;
        })
        .filter(notEmpty);
}
