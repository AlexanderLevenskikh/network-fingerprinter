import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'typesafe-actions';

type ReturnType<TValue> = [
    TValue,
    (event: any) => void,
    (event: any) => void,
];

export function useLocalState<TState, TModel, TValue>(
    modelSelector: (state: TState) => TModel,
    valueSelector: (model: TModel) => TValue,
    createChangingAction: (model: TModel) => Action,
    fieldName: keyof TModel,
): ReturnType<TValue> {
    const model = useSelector<TState, TModel>(modelSelector);
    const value = valueSelector(model);

    const [ localValue, changeLocalValue ] = useState(value);

    const dispatch = useDispatch();

    const onChange = useCallback(
        (event: any) => {
            changeLocalValue(event.currentTarget.value)
        },
        [],
    );
    const onBlur = useCallback(
        (event: any) => {
            if (localValue !== value) {
                const changingAction = createChangingAction({
                    ...model,
                    [ fieldName ]: localValue,
                });
                dispatch(changingAction);
            }
        },
        [ model, localValue ],
    );

    useEffect(() => {
        changeLocalValue(value);
    }, [ model ]);

    return [
        localValue,
        onChange,
        onBlur,
    ];
}
