import React from 'react';
import './App.css';
import Map from './component/map'
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Map />
      </div>
    </Provider>
  );
}

export default App;
