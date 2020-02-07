import { tcpFingerprintProcessor, TcpFingerprintProcessorPacketType } from './Tcp';
import { windows7or8packetStub } from './__test__/win7or8';
import { TcpFingerprintClass } from './Fingerprint/TcpFingerprintClass';
import { TcpFingerprintType } from './Fingerprint/TcpFingerprintType';

describe('tcpFingerprintProcessor', () => {
    it('win 7 or 8 syn', () => {
        const result = tcpFingerprintProcessor(
            windows7or8packetStub,
            TcpFingerprintProcessorPacketType.Syn,
        );

        expect(Boolean(result)).toBeTruthy();
        expect(result.class).toEqual(TcpFingerprintClass.Windows);
        expect(result.type).toEqual(TcpFingerprintType.Specific);
        expect(result.flavour).toEqual('7 or 8');
        expect(result.name).toEqual('Windows');
    });
});
