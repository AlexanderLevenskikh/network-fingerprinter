import 'root/app/general.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initStore } from 'root/app/initStore';
import { App } from 'root/app/component';
import '../../i18n';
import { ProdDependencies } from 'root/app/dependencies/prod';

initApp();

function initApp() {
    const root = document.getElementById('root');
    const dependencies = new ProdDependencies();
    const store = initStore(dependencies);
    const renderApp = () => {
        return (
            <Provider store={ store }>
                <App/>
            </Provider>
        );
    };

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

