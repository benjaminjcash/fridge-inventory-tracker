import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ConnectedLogin from './components/Login';
import Register from './components/Register';
import Main from './components/Main';

function App({ auth }) {
    const [loggedIn, setLoggedIn] = React.useState(auth?.token?.length > 0);
    React.useEffect(() => {
      setLoggedIn(auth?.token?.length > 0)
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
    }
)(App);

export default ConnectedApp;
