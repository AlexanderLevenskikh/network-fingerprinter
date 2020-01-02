import { SearchResponse } from 'elasticsearch';
import { IPacketViewTcp } from './IPacketViewTcp';
import { mapPacketEntityToTcpPacketView } from '../../../Mappers/Packet/Tcp/PacketEntityToView';
import { PacketViewTcpApplicationProtocol } from './PacketViewTcpApplicationProtocol';

export class PacketViewTcpProviderMappers {
    public static toTcpPacketViews(response: SearchResponse<any>): IPacketViewTcp[] {
        return response[0]
            .hits
            .hits
            .map(hit => mapPacketEntityToTcpPacketView(hit._source));
    }

    public static toApplicationLayerProtocols(response: SearchResponse<any>): PacketViewTcpApplicationProtocol[] {
        const set = new Set<PacketViewTcpApplicationProtocol>();

        const framesProtocols = response[0]
            .aggregations
            .protocols
            .buckets
            .map(bucket => bucket.key);

        framesProtocols.forEach(frameProtocol => {
            if (typeof frameProtocol === 'string') {
                const match = frameProtocol.match(/^.*tcp:(.*)$/);
                const chunks = (match && match[1]) ? match[1].split(':') : [];

                chunks.forEach(chunk => {
                    const applicationProtocol = Object.values(PacketViewTcpApplicationProtocol).find(v => v === chunk)
                        ? chunk as PacketViewTcpApplicationProtocol
                        : PacketViewTcpApplicationProtocol.Unknown;
                    set.add(applicationProtocol);
                });
            }
        });

        return Array.from(set.values());
    }
}
