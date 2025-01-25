import React from 'react'
import '../Styles/SearchBar.css';

export default function SearchBar(theme) {
  return (
    <div classNameName="searcbox">
       <form class="form-container">
        <div class="form-group">
            
            <button id="dropdown-button" class="dropdown-button" type="button" onclick="toggleDropdown()">All categories 
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id="dropdown" class="dropdown-menu hidden">
                <ul>
                    <li><button type="button" class="dropdown-item">Mockups</button></li>
                    <li><button type="button" class="dropdown-item">Templates</button></li>
                    <li><button type="button" class="dropdown-item">Design</button></li>
                    <li><button type="button" class="dropdown-item">Logos</button></li>
                </ul>
            </div>
            <div class="search-box">
                <input type="search" id="search-dropdown" class="search-input" placeholder="Search Mockups, Logos, Design Templates..." required/>
                <button type="submit" class="search-button">
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </div>
        </div>
    </form>

    </div>
  )
}
