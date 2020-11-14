import React from 'react';

function App() {
  React.useEffect(() => {
    fetch('/api')
    .then(res => res.json())
    .then(res => console.log(res));
  }, []);
  
  return (
    <div className="App"></div>
  );
}

export default App;
