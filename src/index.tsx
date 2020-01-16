import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initAuth } from './auth';
import './i18n';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import { SnackbarProvider } from 'notistack';

const defaultTheme = createMuiTheme(theme);
initAuth()
  .success((authenticated: boolean) => {
    if (authenticated) {
      ReactDOM.render(
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={defaultTheme}>
            <ThemeProvider theme={defaultTheme}>
              <SnackbarProvider maxSnack={3}>
                <App />
              </SnackbarProvider>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>,
        document.getElementById('root')
      );
    } else {
      console.log('not authenticated');
    }
  })
  .error(() => {
    console.error('failed to initialize');
  });
serviceWorker.unregister();
