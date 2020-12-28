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

// "scripts": {
//   "start": "node node_modules/.bin/react-scripts start",
//   "build": "node node_modules/.bin/react-scripts build",
//   "test": "node node_modules/.bin/react-scripts test",
//   "eject": "node node_modules/.bin/react-scripts eject"
// }
