import React from 'react';
import '../Styles/SearchBar.css';

const darkTheme = {
  backgroundColor: '#ffffff',
  color: '#000000',
  border: '1px solid #ddd',
  padding: '10px',
};

const lightTheme = {
  backgroundColor: '#1d4ed8',
  color: '#ffffff',
  border: '1px solid #444',
  padding: '10px',
};

export default function SearchBar({ theme, query, setQuery, handleSearch }) {

    
  const toggleDropdown = () => {
    document.getElementById('dropdown').classList.toggle('hidden');
  };

  return (
    <div className="searchbox">
      <form className="form-container">
        <div className="form-group">
          <button
            id="dropdown-button"
            style={theme === 'light' ? lightTheme : darkTheme}
            className="dropdown-button"
            type="button"
            onClick={toggleDropdown}
          >
            All categories
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div id="dropdown" className="dropdown-menu hidden">
            <ul>
              <li><button type="button" className="dropdown-item">Mockups</button></li>
              <li><button type="button" className="dropdown-item">Templates</button></li>
              <li><button type="button" className="dropdown-item">Design</button></li>
              <li><button type="button" className="dropdown-item">Logos</button></li>
            </ul>
          </div>
          <div className="search-box">
            <input
              type="search"
              id="search-dropdown"
              className="search-input"
              placeholder="Search Mockups, Logos, Design Templates..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button type="submit" onClick={handleSearch} className="search-button">
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
