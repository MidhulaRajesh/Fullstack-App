import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { email, setEmail } = useUser();
  const [user, setUser] = useState(null);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedMobile, setUpdatedMobile] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8080/api/users/${encodeURIComponent(email)}`)
        .then((res) => {
          setUser(res.data);
          setUpdatedEmail(res.data.email);
          setUpdatedMobile(res.data.mobileNo);
        })
        .catch((err) => {
          console.error("Error fetching user: ", err);
        });
    }
  }, [email]);

  const handleUpdate = () => {
    axios
      .put('http://localhost:8080/api/users/update', {
        currentEmail: email,
        newEmail: updatedEmail,
        newMobileNo: updatedMobile,
      })
      .then(() => {
        alert('User info updated successfully');
        setEmail(updatedEmail);
      })
      .catch((err) => {
        console.error('Update failed: ', err);
        alert('Update failed. Check console for details.');
      });
  };

  const handleLogout = () => {
    setEmail('');
    navigate('/');
  };

  if (!email) return <p>Email is missing. Please login again.</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome, {user.name}</h2>

        <div className="profile-section">
          <img
            className="profile-pic"
            src={`http://localhost:8080/uploads/${user.profilePicPath}`}
            alt="Profile"
          />
        </div>

       
        <div className="readonly-fields">
          <label>Name:</label>
          <input type="text" value={user.name} disabled />

          <label>Roll Number:</label>
          <input type="text" value={user.rollno} disabled />

          <label>Department:</label>
          <input type="text" value={user.department} disabled />
        </div>

        
        <div className="editable-fields">
          <label>Email:</label>
          <input
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />

          <label>Mobile No:</label>
          <input
            type="tel"
            value={updatedMobile}
            onChange={(e) => setUpdatedMobile(e.target.value)}
          />
        </div>

       
        <div className="file-section">
          <label>Aadhar:</label>
          <a
            href={`http://localhost:8080/uploads/${user.aadharFilePath}`}
            target="_blank"
            rel="noreferrer"
          >
            View Aadhar PDF
          </a>
        </div>

        
        <div className="dashboard-buttons">
          <button className="update-btn" onClick={handleUpdate}>
            submit
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
