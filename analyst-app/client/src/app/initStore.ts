import { createLogger } from 'redux-logger';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware  from 'redux-saga'
import { locationEnhancer, locationMiddleware } from 'root/app/router';
import { reducer } from 'root/app/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from 'root/app/saga';
import { IDependencies } from 'root/app/dependencies';

export const initStore = (dependencies: IDependencies) => {
    const isProd = process.env.NODE_ENV === 'production';
    const composeEnhancers: any = isProd ? compose : composeWithDevTools({ trace: true, traceLimit: 25 });
    const sagaMiddleware = createSagaMiddleware({
        context: {
            dependencies,
        },
    });
    const loggerMiddleware = createLogger({
        collapsed: true,
        diff: true,
    });

    const middlewareArray = [
        ...(isProd ? [] : [ loggerMiddleware ]),
        locationMiddleware,
        sagaMiddleware,
    ];

    const store = createStore(
        reducer,
        {},
        composeEnhancers(
            locationEnhancer,
            applyMiddleware(...middlewareArray),
        ),
    );

    sagaMiddleware.run(rootSaga);

    if (module.hot && !IS_PRODUCTION_MODE) {
        module.hot.accept('root/app/reducer', () => {
            store.replaceReducer(reducer);
        });
    }

    return store;
};
