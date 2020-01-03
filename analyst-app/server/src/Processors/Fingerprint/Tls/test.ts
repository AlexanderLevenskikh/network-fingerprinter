import { IPacketViewTls } from '../../../DAL/Packet/Tls/IPacketViewTls';
import { tcpPacketStub } from '../__test__/tcpPacketStub';
import { PacketViewTlsCipherSuite } from '../../../DAL/Packet/Tls/PacketViewTlsCipherSuite';
import { tlsFingerprintProcessor } from './Tls';
import md5 = require('md5');
import { ja3SignaturesMap } from './Ja3/data';

describe('tlsFingerprintProcessor', () => {
    it('fetch yandex from curl', () => {
        const packet: IPacketViewTls = {
            ...tcpPacketStub,
            tls: {
                version: 771,
                cipherSuites: [
                    0x1302, 0x1303, 0x1301, 0xc02c, 0xc030, 0x009f, 0xcca9, 0xcca8, 0xccaa,
                    0xc02b, 0xc02f, 0x009e, 0xc024, 0xc028, 0x006b, 0xc023, 0xc027, 0x0067,
                    0xc00a, 0xc014, 0x0039, 0xc009, 0xc013, 0x0033, 0x009d, 0x009c, 0x003d,
                    0x003c, 0x0035, 0x002f, 0x00ff,
                ],
                extensions: [
                    0, 11, 10, 13172, 16, 22, 23, 49, 13, 43, 45, 51, 21,
                ],
                supportedEllipticGroups: [
                    0x001d, 0x0017, 0x001e, 0x0019, 0x0018,
                ],
                ellipticPointFormats: [
                    0, 1, 2,
                ],
            },
        };

        const cipherSuitesJa3 = '4866-4867-4865-49196-49200-159-52393-52392-52394-49195-49199-158-49188-49192-107-49187-49191-103-49162-49172-57-49161-49171-51-157-156-61-60-53-47-255';
        const extensionsJa3 = '0-11-10-13172-16-22-23-49-13-43-45-51-21';
        const supportedGroupsJa3 = '29-23-30-25-24';
        const formatsJa3 = '0-1-2';
        const calculatedHash = md5(`${771},${cipherSuitesJa3},${extensionsJa3},${supportedGroupsJa3},${formatsJa3}`);
        const expectedHash = 'f436b9416f37d134cadd04886327d3e8';

        const fingerprint = tlsFingerprintProcessor(packet);

        expect(calculatedHash).toEqual(expectedHash);
        expect(fingerprint.userAgent).toEqual(ja3SignaturesMap[expectedHash]);
    });
});
