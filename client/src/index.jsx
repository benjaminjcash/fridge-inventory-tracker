import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { DarkTheme, LightTheme, BaseProvider, styled } from 'baseui';
import reducer from './reducers';
import ConnectedApp from './App';
const useLogger = true;

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%' 
});

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>  useLogger ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware()
});

ReactDOM.render(
  <Provider store={store}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <Centered>
          <ConnectedApp />
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  </Provider>,
  document.getElementById('root')
);
