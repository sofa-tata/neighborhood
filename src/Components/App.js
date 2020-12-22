import React from 'react';
import UserProvider from '../providers/UserProvider.jsx';
import MainPage from './MainPage.js'
// import '../App.css';

function App() {
  return (
    <UserProvider>
      <MainPage />
    </UserProvider>
  );
}

export default App;


// .\node_modules\.bin\react-scripts.cmd start
