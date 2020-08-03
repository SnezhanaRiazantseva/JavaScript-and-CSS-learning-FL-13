import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import {createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/rootReducer';

const composeEnhancers = 
  (typeof window !== 'undefined' && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

