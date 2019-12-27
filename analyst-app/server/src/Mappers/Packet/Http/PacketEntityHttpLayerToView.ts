import { IPacketEntityHttp } from '../../../Entities/Packet/IPacketEntityHttp';
import { PacketViewHttpType } from '../../../DAL/Packet/Http/PacketViewHttpType';
import { IPacketViewHttpLayer } from '../../../DAL/Packet/Http/IPacketViewHttpLayer';
import { mapHttpTextHeaderNameToView } from './HttpTextHeaderNameToView';
import { IPacketViewHttpHeader } from '../../../DAL/Packet/Http/IPacketViewHttpHeader';
import { PacketViewHttpVersion } from '../../../DAL/Packet/Http/PacketViewHttpVersion';

export function mapPacketEntityHttpLayerToView(entity: IPacketEntityHttp): IPacketViewHttpLayer {
    const {
        http_http_request_line, http_http_response_line, http_http_request, http_http_response,
        text_http_request_version, text_http_response_version,
    } = entity;

    const type = http_http_request === '1' ? PacketViewHttpType.Request : PacketViewHttpType.Response;
    const headersStr = type === PacketViewHttpType.Request ? http_http_request_line : http_http_response_line;
    const versionStr = type === PacketViewHttpType.Request ? text_http_request_version : text_http_response_version;

    const versionMap = {
        'HTTP/1.0': PacketViewHttpVersion.Http1_0,
        'HTTP/1.1': PacketViewHttpVersion.Http1_1,
        'HTTP/2.0': PacketViewHttpVersion.Http2_0,
    };
    const version = versionMap[versionStr] || PacketViewHttpVersion.Unknown;

    const headers: IPacketViewHttpHeader[] = headersStr
        .map(x => x.replace(/\s+/, ''))
        .map(headerStr => {
            const [ nameStr, value ] = headerStr.split(/\s*:\s*/);
            const name = mapHttpTextHeaderNameToView(nameStr);

            return {
                name,
                value,
            }
        });

    return {
        type,
        version,
        headers,
    }
}
