import React from 'react';
import { connect } from 'react-redux';
import { fetchItem } from '../src/actions/item';

function App({ fetchItem }) {

React.useEffect(() => {
  fetchItem("5fb0c6b0fec2dd075ccc7f20");
}, []);

  return (
    <div className="App">
    </div>
  );
}

const ConnectedApp = connect(
  null, 
  { fetchItem }
)(App);

export default ConnectedApp;
