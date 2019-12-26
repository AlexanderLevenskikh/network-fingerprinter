import { IHttpSignatureHeader } from '../../Signature/IHttpSignatureHeader';
import { PacketViewHttpHeaderName } from '../../../../../DAL/Packet/Http/PacketViewHttpHeaderName';
import { httpSignatureHeaderNameMap } from './map';

export function mapP0fSignatureHeaders(headers: string): IHttpSignatureHeader[] {
    const headersList = headers.split(',');

    return headersList.map(header => {
        const regex = /^(\?)?([-A-z]+)(?:=\[(.*)\])?$/;
        const [ _, transientLabel, name, value ] = header.match(regex);

        const isTransient = transientLabel === '?';

        return {
            name: httpSignatureHeaderNameMap[ name ] || PacketViewHttpHeaderName.Unknown,
            value,
            isTransient,
        }
    });
}
