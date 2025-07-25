import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css';
import '@fontsource/sen/400.css';
import '@fontsource/sen/700.css'; // Optional: bold


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
