import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register'
import Dashboard from './Dashboard';
import { UserProvider } from './UserContext';

function App() {
  

  return (
    <>
     <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </UserProvider>
    </>
  )
}

export default App
