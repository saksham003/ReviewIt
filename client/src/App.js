import React, { useEffect } from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails'


const App = () => {
  const { theme: themeType } = useSelector((state) => state.theme);

  const light = {
    palette: {
      type: 'light',
      primary: {
        main: '#FF6740'
      },
      secondary: {
        main: '#B20600'
      }
    },
  };
  const dark = {
    palette: {
      type: 'dark',
      primary: {
        main: '#FF6740'
      },
      secondary: {
        main: '#B20600'
      }
    },
  };

  const appliedTheme = createTheme(themeType === 'DARK' ? dark : light);


  return (
    <BrowserRouter>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
