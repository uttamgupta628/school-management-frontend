import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddSchool from './component/AddSchool';
import ShowSchools from './component/ShowSchool';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">School Management</Link>
            <div className="nav-menu">
              <Link to="/add-school" className="nav-link">Add School</Link>
              <Link to="/schools" className="nav-link">View Schools</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-school" element={<AddSchool />} />
          <Route path="/schools" element={<ShowSchools />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="home">
    <h1>Welcome to School Management System</h1>
    <div className="home-actions">
      <Link to="/add-school" className="btn btn-primary">Add New School</Link>
      <Link to="/schools" className="btn btn-secondary">View All Schools</Link>
    </div>
  </div>
);

export default App;