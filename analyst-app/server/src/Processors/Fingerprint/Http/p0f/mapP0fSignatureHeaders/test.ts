import { mapP0fSignatureHeaders } from './index';
import { IHttpSignatureHeader } from '../../Signature/IHttpSignatureHeader';
import { PacketViewHttpHeaderName } from '../../../../../DAL/Packet/Http/PacketViewHttpHeaderName';

describe('mapP0fSignatureHeaders', () => {
    it('with values', () => {
        const p0fHeaders = 'Host,User-Agent,Accept=[,image/png,*/*;q=0.5]';
        const headers = mapP0fSignatureHeaders(p0fHeaders);
        const expectedHeaders: IHttpSignatureHeader[] = [
            {
                name: PacketViewHttpHeaderName.Host,
                value: undefined,
                isTransient: false,
            },
            {
                name: PacketViewHttpHeaderName.UserAgent,
                value: undefined,
                isTransient: false,
            },
            {
                name: PacketViewHttpHeaderName.Accept,
                value: ',image/png,*/*;q=0.5',
                isTransient: false,
            },
        ];

        expect(headers).toEqual(expectedHeaders);
    });

    it('with transient headers', () => {
        const p0fHeaders = 'Host,?User-Agent=[Android]';
        const headers = mapP0fSignatureHeaders(p0fHeaders);
        const expectedHeaders: IHttpSignatureHeader[] = [
            {
                name: PacketViewHttpHeaderName.Host,
                value: undefined,
                isTransient: false,
            },
            {
                name: PacketViewHttpHeaderName.UserAgent,
                value: 'Android',
                isTransient: true,
            },
        ];

        expect(headers).toEqual(expectedHeaders);
    });
});
