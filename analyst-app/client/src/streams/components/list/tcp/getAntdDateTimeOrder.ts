import { StreamDatesOrder } from 'root/streams/model/list/streamDatesOrder';

export function getAntdDateTimeOrder(order: StreamDatesOrder | undefined): 'ascend' | 'descend' | undefined {
    switch (order) {
        case StreamDatesOrder.Asc:
            return 'ascend';
        case StreamDatesOrder.Desc:
            return 'descend';
        case StreamDatesOrder.None:
        default:
            return undefined;
    }
}
