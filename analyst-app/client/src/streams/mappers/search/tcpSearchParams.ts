import { ITcpStreamFilter } from 'DAL/Stream/Tcp/ITcpStreamFilter';
import { TcpStreamsSearchParamsModel } from 'root/streams/model/list/tcpStreamsSearchParams';
import { notEmpty } from 'root/shared/utils/notEmpty';
import { StreamDatesOrder } from 'root/streams/model/list/streamDatesOrder';
import { TcpStreamFilterDateOrder } from 'DAL/Stream/Tcp/TcpStreamFilterDateOrder';

export function mapSearchParamsToDto(model: TcpStreamsSearchParamsModel): ITcpStreamFilter {
    return {
        current: notEmpty(model.current) ? model.current.toString() : '1',
        take: notEmpty(model.take) ? model.take.toString() : '15',
        dateTimeFrom: notEmpty(model.dateTimeFrom) ? model.dateTimeFrom : undefined,
        dateTimeFromOrder: mapDateTimeOrder(model.dateTimeFromOrder),
        dateTimeTo: notEmpty(model.dateTimeTo) ? model.dateTimeTo : undefined,
        dateTimeToOrder: mapDateTimeOrder(model.dateTimeToOrder),
        sourceIp: model.sourceIp ? model.sourceIp.trim() : undefined,
        sourceMac: model.sourceMac ? model.sourceMac.trim() : undefined,
        sourcePort: model.sourcePort ? model.sourcePort.trim() : undefined,
        destinationIp: model.destinationIp ? model.destinationIp.trim() : undefined,
        destinationMac:model.destinationMac ? model.destinationMac.trim() : undefined,
        destinationPort: model.destinationPort ? model.destinationPort.trim() : undefined,
        sensorId: model.sensorId ? model.sensorId.trim() : undefined,
    }
}

function mapDateTimeOrder(order?: StreamDatesOrder): TcpStreamFilterDateOrder {
    switch (order) {
        case StreamDatesOrder.Asc:
            return TcpStreamFilterDateOrder.Asc;
        case StreamDatesOrder.Desc:
            return TcpStreamFilterDateOrder.Desc;
        case StreamDatesOrder.None:
        default:
            return TcpStreamFilterDateOrder.None;
    }
}
