import { StreamListState } from 'root/streams/state/list';
import { ActionType } from 'typesafe-actions';
import { StreamsListActions, StreamsListActionTypes } from 'root/streams/actions/list';

export const initialState = new StreamListState();
type ReducerActions = ActionType<typeof StreamsListActions>;

export const streamListReducer = (state = initialState, action: ReducerActions): StreamListState => {
    switch (action.type) {
        case StreamsListActionTypes.FetchList: {
            return {
                ...state,
                streamsLoading: true,
            };
        }
        case StreamsListActionTypes.FetchListSucceed: {
            const { streams, streamsTotal } = action.payload;

            return {
                ...state,
                streamsLoading: false,
                streams,
                streamsTotal,
            }
        }

        case StreamsListActionTypes.FetchListFailed:  {
            return {
                ...state,
                streamsLoading: false,
            }
        }

        default:
            return state;
    }
};
