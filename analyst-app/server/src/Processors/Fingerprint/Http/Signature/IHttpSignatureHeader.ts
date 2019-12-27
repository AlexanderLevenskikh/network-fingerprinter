import { PacketViewHttpHeaderName } from '../../../../DAL/Packet/Http/PacketViewHttpHeaderName';

export interface IHttpSignatureHeader {
    name: PacketViewHttpHeaderName;
    value?: string;
    isTransient?: boolean;
}
