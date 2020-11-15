import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Fridge from './pages/Fridge';
import { requestLogin } from '../src/actions/auth';

function App({ auth, requestLogin }) {
  const [loggedIn, setLoggedIn] = React.useState(auth?.token?.length > 0);

  React.useEffect(() => {
    setLoggedIn( auth?.token?.length > 0)
  }, [auth]);

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/my/fridge" /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {loggedIn ? <Redirect to="/my/fridge" /> : <Redirect to="/login" />}
            <Login requestLogin={requestLogin} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/my/fridge">
            {loggedIn ? <Redirect to="/my/fridge" /> : <Redirect to="/login" />}
            <Fridge />
          </Route>
        </Switch>
    </Router>
  );
}

const ConnectedApp = connect(
  (state) => {
    return {
      auth: state.auth
    }
  }, 
  { requestLogin }
)(App);

export default ConnectedApp;
