import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import MainPage from './Components/MainPage';
// import App from './Components/App.js'
import Firebase, { FirebaseContext } from './firebase';
import MainPage from './Components/MainPage.js'


ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
      <MainPage />
    </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

