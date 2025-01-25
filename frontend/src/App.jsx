import React, { useContext } from 'react';
import ThemeContext from './context/ThemeContext';
import './App.css';

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="app">
      
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default App;
