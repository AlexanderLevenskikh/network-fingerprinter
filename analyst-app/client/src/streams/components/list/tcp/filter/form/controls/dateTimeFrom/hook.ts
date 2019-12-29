import { StreamsSearchActions } from 'root/streams/actions/search';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

export function useTcpStreamsFilterFormDateTimeFrom() {
    const model = useSelector(StreamRouterSelectors.tcpStreamsSearchParamsDraft);
    const dispatch = useDispatch();
    const onChange = (dateTimeFrom: moment.Moment | null) => dispatch(StreamsSearchActions.changeSearchParams({
        model: {
            ...model,
            dateTimeFrom: dateTimeFrom ? dateTimeFrom.toISOString() : undefined,
        }
    }));

    return {
        dateTimeFrom: moment(model.dateTimeFrom),
        onChange,
    }
}
