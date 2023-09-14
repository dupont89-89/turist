import './App.css';
import React from 'react'
import Header from './components/Header/Header';
import TourCatalog from './components/TourCatalog/TourCatalog';
import { Route, Routes } from 'react-router-dom';
import UserPage from './components/UserPage/UserPage';

function App() {
  return (
    <div className="App">
      <div className="headerBackground">
        <div className='wrapperContent'>
          <Header />
          <Routes>
            <Route exact path="/" element={<TourCatalog />} />
            <Route path="user/*" element={<UserPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
