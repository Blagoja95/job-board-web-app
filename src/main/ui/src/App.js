import React from 'react';
import './index.css'
import Navigation from './sections/Navigation';
import Header from './sections/Header'
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div>
    <Navigation/>
    <Header/>
    <SearchBar/>
    </div>
  );
}

export default App;
