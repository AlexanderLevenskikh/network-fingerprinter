import { StreamsSearchActions } from 'root/streams/actions/search';
import { StreamRouterSelectors } from 'root/streams/selectors/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

export function useTcpStreamsFilterFormDateTimeTo() {
    const model = useSelector(StreamRouterSelectors.tcpStreamsSearchParamsDraft);
    const dispatch = useDispatch();
    const onChange = (dateTimeTo: moment.Moment | null) => dispatch(StreamsSearchActions.changeSearchParams({
        model: {
            ...model,
            dateTimeTo: dateTimeTo ? dateTimeTo.toISOString() : undefined,
        }
    }));

    return {
        dateTimeTo: moment(model.dateTimeTo),
        onChange,
    }
}
