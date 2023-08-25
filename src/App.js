import './App.css';
import React from 'react'
import Header from './components/Header/Header';
import TourCatalog from './components/TourCatalog/TourCatalog';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='wrapperContent'>
        <TourCatalog />
      </div>
    </div>
  );
}

export default App;
