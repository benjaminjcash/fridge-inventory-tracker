import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from 'baseui';
import { DarkTheme } from 'baseui';
import { checkLoggedIn } from './actions/auth';
import { fetchUser } from './actions/user';
import ConnectedLogin from './components/auth/Login';
import Register from './components/auth/Register';
import Main from './components/Main';

function App({ auth, checkLoggedIn, fetchUser, theme }) {
  const [loggedIn, setLoggedIn] = useState(auth?.loggedIn);
  const [currentTheme, setCurrentTheme] = useState(DarkTheme);

  useEffect(() => setCurrentTheme({ 
    ...DarkTheme, 
    name: theme.name,
    ...theme.colors 
  }), [theme]);
  useEffect(() => checkLoggedIn(), []);
  useEffect(() => {
    setLoggedIn(auth?.loggedIn);
    if(auth?.loggedIn) fetchUser();
  }, [auth]);

  return (
    <ThemeProvider theme={currentTheme}>
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/my/fridge" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {loggedIn ? <Redirect to="/my/fridge" /> : <Redirect to="/login" />}
          <ConnectedLogin />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/my/fridge">
          {loggedIn ? <Redirect to="/my/fridge" /> : <Redirect to="/login" />}
          <Main />
        </Route>
      </Switch>
    </Router>
    </ThemeProvider>
  );
}

const ConnectedApp = connect(
  (state) => {
    return {
      auth: state.auth,
      theme: state.theme
    }
  }, {
    checkLoggedIn,
    fetchUser
  }
)(App);

export default ConnectedApp;
