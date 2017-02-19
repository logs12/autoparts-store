import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { routes } from './routes'
import { Router } from 'react-router'
import DevTools from './DevTools'


const Root = ({ store, history }) => {

    const configData = store.getState().common.configData;
    return (
        <Provider store={store}>
            <div>
                <Router history={history} routes={routes} />
                {(configData.environment === 'dev') ? <DevTools /> : null}
            </div>
        </Provider>

    );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;