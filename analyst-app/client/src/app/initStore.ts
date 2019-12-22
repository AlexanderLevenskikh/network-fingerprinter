import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, compose, createStore } from 'redux';
import { locationEnhancer, locationMiddleware } from 'root/app/router';
import { reducer } from 'root/app/reducer';

export const initStore = () => {
    const isProd = process.env.NODE_ENV === 'production';
    const composeEnhancers: any = isProd ? compose : composeWithDevTools({ trace: true, traceLimit: 25 });

    let middlewares = [];

    const logger = createLogger({
        collapsed: true,
        diff: true,
    });

    if (!isProd) {
        middlewares.push(logger);
    }
    middlewares.push(locationMiddleware);

    const store = createStore(
        reducer,
        {},
        composeEnhancers(
            locationEnhancer,
            applyMiddleware(...middlewares),
        ),
    );

    if (module.hot && !IS_PRODUCTION_MODE) {
        module.hot.accept('root/app/reducer', () => {
            store.replaceReducer(reducer);
        });
    }

    return store;
};
