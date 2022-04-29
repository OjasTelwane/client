import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from "styled-components";
import store from '../store';
import './app.scss';
import { loadUser } from './core/actions/authentication';
import { setAuthToken } from './core/services/central-operations.service';
import Layout from './layout';

require('./core/interceptors');

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// const theme = {
//   primaryColor : '#19B3Bd',
//   secondaryColor: '#E72C59',
//   dangerColor: '#800000',
//   textColor: '#333E48',
//   formBackgroundColor: '#ABD7E4',
//   skyBlue: '#4990EF',
//   lightPink:'#F84973',
//   white: '#FFFFFF'
// };
// primaryColor : '#4285F4',
// primaryColor : '#143560',
// primaryColor : '#2196F3',

const theme = {
  primaryColor : '#0A84A6',
  secondaryColor: '#F0EBF8',
  dangerColor: '#D93025',
  textColor: '#5F6368',
  formBackgroundColor: '#FFFFFF',
  skyBlue: '#4990EF',
  lightPink:'#F84973',
  white: '#FFFFFF',
  borderColor: '#DADCE0',
  inputAreaHoverColor: '#F1F3F4',
  buttonColor: '#007AFF'
};

const App = (props) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //read react.js documentation for explanation

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      <Layout />
        <script src='/socket.io/socket.io.js'></script>
    </Provider>
    </ThemeProvider>
  );
};

export default App;
