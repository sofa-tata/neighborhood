import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Firebase, { FirebaseContext } from './firebase';
import MainPage from './Components/common/MainPage.js'


ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
      <MainPage />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

