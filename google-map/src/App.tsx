import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import Homepage from './page/homepage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Homepage />
      </div>
    </Provider>
  );
}

export default App;
