import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { checkLoggedIn } from './actions/auth';
import ConnectedLogin from './components/Login';
import Register from './components/Register';
import Main from './components/Main';

function App({ auth, checkLoggedIn }) {
    const [loggedIn, setLoggedIn] = React.useState(auth?.loggedIn);
    React.useEffect(() => {
      checkLoggedIn();
    }, []);
    React.useEffect(() => {
        setLoggedIn(auth?.loggedIn);
    }, [auth]);

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
          auth: state.auth
        }
    }, {
      checkLoggedIn
    }
)(App);

export default ConnectedApp;
