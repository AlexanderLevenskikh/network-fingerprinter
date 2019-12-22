import 'root/app/general.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initStore } from 'root/app/initStore';
import { App } from 'root/app/component';

initApp();

function initApp() {
    const root = document.getElementById('root');
    const store = initStore();
    const renderApp = () => {
        return (
            <Provider store={ store }>
                <App/>
            </Provider>
        );
    };

    // TODO implement
    const render = () => {
        if (root) {
            ReactDOM.render(
                renderApp(),
                root,
            );
        }
    };

    render();
}

