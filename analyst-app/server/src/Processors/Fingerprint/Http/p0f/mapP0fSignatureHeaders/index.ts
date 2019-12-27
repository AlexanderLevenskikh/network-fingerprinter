import { IHttpSignatureHeader } from '../../Signature/IHttpSignatureHeader';
import { mapHttpTextHeaderNameToView } from '../../../../../Mappers/Packet/Http/HttpTextHeaderNameToView';

export function mapP0fSignatureHeaders(headers: string): IHttpSignatureHeader[] {
    const headersList = headers.split(/,(?![^\[]*])/);

    return headersList
        .filter(Boolean)
        .map(header => {
        const regex = /^(\?)?([-A-z]+)(?:=\[(.*)])?$/;
        const [ _, transientLabel, name, value ] = header.match(regex);

        const isTransient = transientLabel === '?';

        return {
            name: mapHttpTextHeaderNameToView(name),
            value,
            isTransient,
        }
    });
}
