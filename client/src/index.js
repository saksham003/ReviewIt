import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#6B48FF',
//     },
//     secondary: {
//       main: '#1EE3CF',
//     },
//     default: {
//       main: '#F9F9F9',
//     },
//     background: {
//       main: '#CDF0EA',
//     }
//   },
// });

// <MuiThemeProvider theme={theme}>
// </MuiThemeProvider>

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
