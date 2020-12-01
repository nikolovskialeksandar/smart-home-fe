import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import meteoReducer from './store/reducers/meteoReducer';
import monthReducer from './store/reducers/monthReducer';
import dayReducer from './store/reducers/dayReducer';
import yearReducer from './store/reducers/yearReducer';
import sonoffReducer from './store/reducers/sonoffReducer';
import authReducer from './store/reducers/authReducer';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  meteo: meteoReducer,
  sonoff: sonoffReducer,
  auth: authReducer,
  month: monthReducer,
  day: dayReducer,
  year: yearReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
