import { MessageSearchActions } from 'core/message/actions/search';
import { MessageRouterSelectors } from 'core/message/selectors/router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createValidationInfoSelector } from 'shared/selectors/validationInfo';
import { DateService } from 'shared/utils/date';

export function useMessageSearchDateInterval() {
    const tabName = useSelector(MessageRouterSelectors.tabName);
    const searchParamsModel = useSelector(MessageRouterSelectors.searchParamsDraft);
    const selectStartDateValidationInfo = createValidationInfoSelector(MessageRouterSelectors.validationReader, 'startDate');
    const selectEndDateValidationInfo = createValidationInfoSelector(MessageRouterSelectors.validationReader, 'endDate');
    const startDateValidationInfo = useSelector(selectStartDateValidationInfo);
    const endDateValidationInfo = useSelector(selectEndDateValidationInfo);

    const dispatch = useDispatch();

    const onChangeStartDate = useCallback(
        (newStartDate: string) => {
            let { endDate } = searchParamsModel;
            if (newStartDate && endDate) {
                const isEndDateLessThanStartDate = DateService.compareDatesStr(newStartDate, endDate) !== -1;
                if (isEndDateLessThanStartDate) {
                    endDate = '';
                }
            }

            dispatch(MessageSearchActions.changeSearchParams({
                searchParams: {
                    ...searchParamsModel,
                    startDate: newStartDate,
                    endDate,
                },
            }));
        },
        [ searchParamsModel, dispatch ],
    );

    const onChangeEndDate = useCallback(
        (newEndDate: string) => {
            dispatch(MessageSearchActions.changeSearchParams({
                searchParams: {
                    ...searchParamsModel,
                    endDate: newEndDate,
                },
            }));
        },
        [ searchParamsModel, dispatch ],
    );

    const resetDates = useCallback(
        () => {
            dispatch(MessageSearchActions.changeSearchParams({
                searchParams: {
                    ...searchParamsModel,
                    startDate: '',
                    endDate: '',
                },
            }));
        },
        [ searchParamsModel, dispatch ],
    );

    return {
        tabName,
        startDateValidationInfo,
        endDateValidationInfo,
        startDate: searchParamsModel.startDate || '',
        endDate: searchParamsModel.endDate || '',
        onChangeStartDate,
        onChangeEndDate,
        resetDates,
    };
}
