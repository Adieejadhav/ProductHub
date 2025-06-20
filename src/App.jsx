import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddItem from './pages/AddItem';
import ViewItems from './pages/ViewItems';
import Navbar from './components/Navbar';
import './stylings/index.css'
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/view" element={<ViewItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
