// React
import React from 'react';
import ReactDOM from 'react-dom';

// CSS
import './index.css';

// APP
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redux
import { store } from './dataLayer/store';
import { Provider } from 'react-redux';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
