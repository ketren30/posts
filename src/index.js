import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { BrowserRouter as Router } from "react-router-dom";

const composeEnhancers = composeWithDevTools({})

export const store = createStore(reducer, 
  composeEnhancers(
    applyMiddleware(
      thunk
    )
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <Provider store={store}>
    <Router basename={'/posts'}>
      <App />
    </Router>
  </Provider>
);