// App.tsx:
import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage';


function App() {
  return (
    <div>
      <NavigationBar />
      <HomePage />
    </div>
  );
}

export default App;
