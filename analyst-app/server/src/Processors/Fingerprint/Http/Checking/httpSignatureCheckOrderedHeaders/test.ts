import { IHttpSignature } from '../../Signature/IHttpSignature';
import { HttpSignatureVersion } from '../../Signature/HttpSignatureVersion';
import { PacketViewHttpHeaderName } from '../../../../../DAL/Packet/Http/PacketViewHttpHeaderName';
import { HttpFingerprintClass } from '../../Fingerprint/HttpFingerprintClass';
import { HttpFingerprintType } from '../../Fingerprint/HttpFingerprintType';
import { IPacketViewHttp } from '../../../../../DAL/Packet/Http/IPacketViewHttp';
import { PacketViewIpVersion } from '../../../../../DAL/Packet/Ip/PacketViewIpVersion';
import { PacketViewHttpVersion } from '../../../../../DAL/Packet/Http/PacketViewHttpVersion';
import { PacketViewHttpType } from '../../../../../DAL/Packet/Http/PacketViewHttpType';
import { httpSignatureOrderedHeaders } from './index';
import { tcpPacketStub } from '../../../__test__/tcpPacketStub';

const httpPacketCommonPart: IPacketViewHttp = {
    ...tcpPacketStub,
    http: {
        version: PacketViewHttpVersion.Http1_1,
        headers: [],
        type: PacketViewHttpType.Request,
    },
};

describe('httpSignatureOrderedHeaders', () => {
    it('exactly match with ordered list', () => {
        const signature: IHttpSignature = {
            version: HttpSignatureVersion.Http1_1,
            orderedHeaders: [
                {
                    name: PacketViewHttpHeaderName.UserAgent,
                },
                {
                    name: PacketViewHttpHeaderName.Host,
                },
                {
                    name: PacketViewHttpHeaderName.Accept,
                    value: '*/*',
                },
            ],
            absentHeaders: [
                PacketViewHttpHeaderName.Connection,
                PacketViewHttpHeaderName.AcceptEncoding,
                PacketViewHttpHeaderName.AcceptLanguage,
                PacketViewHttpHeaderName.AcceptCharset,
            ],
            expectedUserAgentOrServerSubstring: 'curl/',
            fingerprint: {
                class: HttpFingerprintClass.Other,
                type: HttpFingerprintType.Specific,
                name: 'curl',
                flavour: '',
            },
        };

        const packet: IPacketViewHttp = {
            ...httpPacketCommonPart,
            http: {
                ...httpPacketCommonPart.http,
                headers: [
                    {
                        name: PacketViewHttpHeaderName.UserAgent,
                        value: 'curl/7.58.0',
                    },
                    {
                        name: PacketViewHttpHeaderName.Host,
                        value: 'o-site.spb.ru',
                    },
                    {
                        name: PacketViewHttpHeaderName.Accept,
                        value: '*/*',
                    },
                ],
            },
        };

        expect(httpSignatureOrderedHeaders(packet, signature)).toBeTruthy();
    });

    it('exactly match with list, but order is incorrect', () => {
        const signature: IHttpSignature = {
            version: HttpSignatureVersion.Http1_1,
            orderedHeaders: [
                {
                    name: PacketViewHttpHeaderName.UserAgent,
                },
                {
                    name: PacketViewHttpHeaderName.Host,
                },
                {
                    name: PacketViewHttpHeaderName.Accept,
                    value: '*/*',
                },
            ],
            absentHeaders: [
                PacketViewHttpHeaderName.Connection,
                PacketViewHttpHeaderName.AcceptEncoding,
                PacketViewHttpHeaderName.AcceptLanguage,
                PacketViewHttpHeaderName.AcceptCharset,
            ],
            expectedUserAgentOrServerSubstring: 'curl/',
            fingerprint: {
                class: HttpFingerprintClass.Other,
                type: HttpFingerprintType.Specific,
                name: 'curl',
                flavour: '',
            },
        };

        const packet: IPacketViewHttp = {
            ...httpPacketCommonPart,
            http: {
                ...httpPacketCommonPart.http,
                headers: [
                    {
                        name: PacketViewHttpHeaderName.Host,
                        value: 'o-site.spb.ru',
                    },
                    {
                        name: PacketViewHttpHeaderName.UserAgent,
                        value: 'curl/7.58.0',
                    },
                    {
                        name: PacketViewHttpHeaderName.Accept,
                        value: '*/*',
                    },
                ],
            },
        };

        expect(httpSignatureOrderedHeaders(packet, signature)).toBeFalsy();
    });

    it('lists are equal, but value not', () => {
        const signature: IHttpSignature = {
            version: HttpSignatureVersion.Http1_1,
            orderedHeaders: [
                {
                    name: PacketViewHttpHeaderName.UserAgent,
                },
                {
                    name: PacketViewHttpHeaderName.Host,
                },
                {
                    name: PacketViewHttpHeaderName.Date,
                    isTransient: true,
                },
                {
                    name: PacketViewHttpHeaderName.Accept,
                    value: '*/*',
                },
            ],
            absentHeaders: [
                PacketViewHttpHeaderName.Connection,
                PacketViewHttpHeaderName.AcceptEncoding,
                PacketViewHttpHeaderName.AcceptLanguage,
                PacketViewHttpHeaderName.AcceptCharset,
            ],
            expectedUserAgentOrServerSubstring: 'curl/',
            fingerprint: {
                class: HttpFingerprintClass.Other,
                type: HttpFingerprintType.Specific,
                name: 'curl',
                flavour: '',
            },
        };

        const packet: IPacketViewHttp = {
            ...httpPacketCommonPart,
            http: {
                ...httpPacketCommonPart.http,
                headers: [
                    {
                        name: PacketViewHttpHeaderName.UserAgent,
                        value: 'curl/7.58.0',
                    },
                    {
                        name: PacketViewHttpHeaderName.Host,
                        value: 'o-site.spb.ru',
                    },
                    {
                        name: PacketViewHttpHeaderName.Accept,
                        value: 'text/html',
                    },
                ],
            },
        };

        expect(httpSignatureOrderedHeaders(packet, signature)).toBeFalsy();
    });

    it('match with ordered list (transient fields are not present)', () => {
        const signature: IHttpSignature = {
            version: HttpSignatureVersion.Http1_1,
            orderedHeaders: [
                {
                    name: PacketViewHttpHeaderName.UserAgent,
                },
                {
                    name: PacketViewHttpHeaderName.Host,
                },
                {
                    name: PacketViewHttpHeaderName.Date,
                    isTransient: true,
                },
                {
                    name: PacketViewHttpHeaderName.Accept,
                    value: '*/*',
                },
            ],
            absentHeaders: [
                PacketViewHttpHeaderName.Connection,
                PacketViewHttpHeaderName.AcceptEncoding,
                PacketViewHttpHeaderName.AcceptLanguage,
                PacketViewHttpHeaderName.AcceptCharset,
            ],
            expectedUserAgentOrServerSubstring: 'curl/',
            fingerprint: {
                class: HttpFingerprintClass.Other,
                type: HttpFingerprintType.Specific,
                name: 'curl',
                flavour: '',
            },
        };

        const packet: IPacketViewHttp = {
            ...httpPacketCommonPart,
            http: {
                ...httpPacketCommonPart.http,
                headers: [
                    {
                        name: PacketViewHttpHeaderName.UserAgent,
                        value: 'curl/7.58.0',
                    },
                    {
                        name: PacketViewHttpHeaderName.Host,
                        value: 'o-site.spb.ru',
                    },
                    {
                        name: PacketViewHttpHeaderName.Accept,
                        value: '*/*',
                    },
                ],
            },
        };

        expect(httpSignatureOrderedHeaders(packet, signature)).toBeTruthy();
    });

    it('match with ordered list (transient fields are present)', () => {
        const signature: IHttpSignature = {
            version: HttpSignatureVersion.Http1_1,
            orderedHeaders: [
                {
                    name: PacketViewHttpHeaderName.UserAgent,
                },
                {
                    name: PacketViewHttpHeaderName.Host,
                },
                {
                    name: PacketViewHttpHeaderName.Date,
                    value: '19.03.2019',
                    isTransient: true,
                },
                {
                    name: PacketViewHttpHeaderName.Accept,
                    value: '*/*',
                },
            ],
            absentHeaders: [
                PacketViewHttpHeaderName.Connection,
                PacketViewHttpHeaderName.AcceptEncoding,
                PacketViewHttpHeaderName.AcceptLanguage,
                PacketViewHttpHeaderName.AcceptCharset,
            ],
            expectedUserAgentOrServerSubstring: 'curl/',
            fingerprint: {
                class: HttpFingerprintClass.Other,
                type: HttpFingerprintType.Specific,
                name: 'curl',
                flavour: '',
            },
        };

        const packet: IPacketViewHttp = {
            ...httpPacketCommonPart,
            http: {
                ...httpPacketCommonPart.http,
                headers: [
                    {
                        name: PacketViewHttpHeaderName.UserAgent,
                        value: 'curl/7.58.0',
                    },
                    {
                        name: PacketViewHttpHeaderName.Host,
                        value: 'o-site.spb.ru',
                    },
                    {
                        name: PacketViewHttpHeaderName.Date,
                        value: '100 19.03.2019 333',
                    },
                    {
                        name: PacketViewHttpHeaderName.Accept,
                        value: '*/*',
                    },
                ],
            },
        };

        expect(httpSignatureOrderedHeaders(packet, signature)).toBeTruthy();
    });

    it('match with ordered list (transient fields are present and value does not match)', () => {
        const signature: IHttpSignature = {
            version: HttpSignatureVersion.Http1_1,
            orderedHeaders: [
                {
                    name: PacketViewHttpHeaderName.UserAgent,
                },
                {
                    name: PacketViewHttpHeaderName.Host,
                },
                {
                    name: PacketViewHttpHeaderName.Date,
                    value: '20.03.2019',
                    isTransient: true,
                },
                {
                    name: PacketViewHttpHeaderName.Accept,
                    value: '*/*',
                },
            ],
            absentHeaders: [
                PacketViewHttpHeaderName.Connection,
                PacketViewHttpHeaderName.AcceptEncoding,
                PacketViewHttpHeaderName.AcceptLanguage,
                PacketViewHttpHeaderName.AcceptCharset,
            ],
            expectedUserAgentOrServerSubstring: 'curl/',
            fingerprint: {
                class: HttpFingerprintClass.Other,
                type: HttpFingerprintType.Specific,
                name: 'curl',
                flavour: '',
            },
        };

        const packet: IPacketViewHttp = {
            ...httpPacketCommonPart,
            http: {
                ...httpPacketCommonPart.http,
                headers: [
                    {
                        name: PacketViewHttpHeaderName.UserAgent,
                        value: 'curl/7.58.0',
                    },
                    {
                        name: PacketViewHttpHeaderName.Host,
                        value: 'o-site.spb.ru',
                    },
                    {
                        name: PacketViewHttpHeaderName.Date,
                        value: '100 19.03.2019 333',
                    },
                    {
                        name: PacketViewHttpHeaderName.Accept,
                        value: '*/*',
                    },
                ],
            },
        };

        expect(httpSignatureOrderedHeaders(packet, signature)).toBeFalsy();
    });

    it('does not match with ordered list', () => {
        const signature: IHttpSignature = {
            version: HttpSignatureVersion.Http1_1,
            orderedHeaders: [
                {
                    name: PacketViewHttpHeaderName.UserAgent,
                },
                {
                    name: PacketViewHttpHeaderName.Host,
                },
                {
                    name: PacketViewHttpHeaderName.Accept,
                    value: '*/*',
                },
            ],
            absentHeaders: [
                PacketViewHttpHeaderName.Connection,
                PacketViewHttpHeaderName.AcceptEncoding,
                PacketViewHttpHeaderName.AcceptLanguage,
                PacketViewHttpHeaderName.AcceptCharset,
            ],
            expectedUserAgentOrServerSubstring: 'curl/',
            fingerprint: {
                class: HttpFingerprintClass.Other,
                type: HttpFingerprintType.Specific,
                name: 'curl',
                flavour: '',
            },
        };

        const packet: IPacketViewHttp = {
            ...httpPacketCommonPart,
            http: {
                ...httpPacketCommonPart.http,
                headers: [
                    {
                        name: PacketViewHttpHeaderName.UserAgent,
                        value: 'curl/7.58.0',
                    },
                    {
                        name: PacketViewHttpHeaderName.Accept,
                        value: '*/*',
                    },
                ],
            },
        };

        expect(httpSignatureOrderedHeaders(packet, signature)).toBeFalsy();
    });
});
