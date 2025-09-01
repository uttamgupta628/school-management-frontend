import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get('http://localhost:5000/api/schools');
      
      if (response.data && response.data.success && response.data.data) {
        setSchools(response.data.data);
      } else {
        setSchools([]); 
        setError('No schools data received from server');
      }
      
    } catch (err) {
      setError('Failed to fetch schools. Please check if the server is running.');
      console.error('Error fetching schools:', err);
      setSchools([]); 
    } finally {
      setLoading(false);
    }
  };
  const filteredSchools = Array.isArray(schools) ? schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.state.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleViewDetails = (school) => {
    alert(`School Details:\n\nName: ${school.name}\nAddress: ${school.address}\nCity: ${school.city}\nState: ${school.state}\nContact: ${school.contact}\nEmail: ${school.email_id}`);
  };

  const handleEditSchool = (school) => {
    console.log('Edit school:', school);
  };

  const handleDeleteSchool = async (schoolId) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/schools/${schoolId}`);
        
        if (response.data.success) {
          // Remove the deleted school from the state
          setSchools(schools.filter(school => school.id !== schoolId));
          alert('School deleted successfully!');
        } else {
          setError('Failed to delete school');
        }
      } catch (err) {
        console.error('Error deleting school:', err);
        setError('Failed to delete school. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading schools...</p>
      </div>
    );
  }

  return (
    <div className="schools-container">
      <div className="schools-header">
        <h2>Schools Directory</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search schools by name, city, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="schools-grid">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school) => (
            <div key={school.id} className="school-card">
              <div className="school-image">
                <img
                  src={school.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop'}
                  alt={school.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop';
                  }}
                />
              </div>
              
              <div className="school-info">
                <h3 className="school-name">{school.name}</h3>
                <p className="school-address">{school.address}</p>
                <p className="school-location">
                  <span className="city">{school.city}, </span>
                  <span className="state">{school.state}</span>
                </p>
                <div className="contact-info">
                  <p className="contact">📞 {school.contact}</p>
                  <p className="email">✉️ {school.email_id}</p>
                </div>
              </div>
              
              <div className="school-actions">
                <button 
                  className="btn-info"
                  onClick={() => handleViewDetails(school)}
                >
                  View Details
                </button>
                <button 
                  className="btn-edit"
                  onClick={() => handleEditSchool(school)}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteSchool(school.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-schools">
            <p>
              {searchTerm 
                ? `No schools found matching "${searchTerm}".`
                : error 
                  ? 'Unable to load schools. Please check your connection and try again.'
                  : 'No schools available. Add some schools to get started.'
              }
            </p>
            {error && (
              <button 
                className="retry-btn"
                onClick={fetchSchools}
              >
                Retry
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSchools;