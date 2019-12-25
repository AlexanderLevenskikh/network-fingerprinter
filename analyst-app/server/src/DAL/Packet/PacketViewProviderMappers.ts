import { SearchResponse } from 'elasticsearch';
import { IPacketViewTcp } from './Tcp/IPacketViewTcp';
import { mapPacketEntityToTcpPacketView } from '../../Mappers/Packet/Tcp/PacketEntityToView';
import { IPacketView } from './IPacketView';
import { mapPacketEntityToView } from '../../Mappers/Packet/PacketEntityToView';
import { ITcpStreamMetaData } from '../Stream/Tcp/ITcpStreamMetaData';
import { max } from 'rxjs/operators';

export class PacketViewProviderMappers {
    public static toPacketViews(response: SearchResponse<any>): IPacketView[] {
        return response[0]
            .hits
            .hits
            .map(hit => mapPacketEntityToView(hit._source));
    }

    public static toTcpPacketViews(response: SearchResponse<any>): IPacketViewTcp[] {
        return response[0]
            .hits
            .hits
            .map(hit => mapPacketEntityToTcpPacketView(hit._source));
    }

    public static toTcpStreamMetaData(response: SearchResponse<any>): ITcpStreamMetaData {
        const { min_epoch, max_epoch } =  response[0].aggregations;
        const isMinEpochValid = !Number.isNaN(Number.parseFloat(min_epoch.value));
        const isMaxEpochValid = !Number.isNaN(Number.parseFloat(max_epoch.value));
        const startDateTime = isMinEpochValid ? new Date(min_epoch.value * 1000).toISOString() : '';
        const endDateTime = isMaxEpochValid ? new Date(max_epoch.value * 1000).toISOString() : '';

        return {
            startDateTime,
            endDateTime,
        }
    }

    public static toHosts(response: SearchResponse<any>): string[] {
        return response[0]
            .aggregations
            .host
            .buckets
            .map(bucket => bucket.key.ip);
    }
}
