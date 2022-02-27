import React from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { checkLoggedIn } from './actions/auth';
import { fetchUser } from './actions/user';
import ConnectedLogin from './components/Login';
import Register from './components/Register';
import Main from './components/Main';

function App({ auth, checkLoggedIn, user, fetchUser }) {
  const [css, theme] = useStyletron();
  const [loggedIn, setLoggedIn] = React.useState(auth?.loggedIn);
  const [currentUser, setCurrentUser] = React.useState(user);

  React.useEffect(() => {
    checkLoggedIn();
  }, []);

  React.useEffect(() => {
    setLoggedIn(auth?.loggedIn);
    if(auth?.loggedIn) fetchUser();
  }, [auth]);

  React.useEffect(() => {
    setCurrentUser(user);
  }, [user])

  return (
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
  );
}

const ConnectedApp = connect(
  (state) => {
    return {
      auth: state.auth,
      user: state.user
    }
  }, {
    checkLoggedIn,
    fetchUser
  }
)(App);

export default ConnectedApp;
