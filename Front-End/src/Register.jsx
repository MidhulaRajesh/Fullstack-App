import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    rollNo: '',
    aadharNo: '',
    department: '',
    mobile: '', 
    profilePic: null,
    aadharFile: null,
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.includes('@')) newErrors.email = 'Valid email is required';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!form.rollNo.trim()) newErrors.rollNo = 'Roll No is required';
    if (!form.aadharNo.trim()) newErrors.aadharNo = 'Aadhar No is required';
    if (!form.department.trim()) newErrors.department = 'Department is required';
    if (!form.mobile.trim() || form.mobile.length !== 10) newErrors.mobile = 'Valid mobile number is required';
    if (!form.profilePic) newErrors.profilePic = 'Profile picture is required';
    if (!form.aadharFile) newErrors.aadharFile = 'Aadhar file is required';
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;
    const userObject = {
      name: form.name,
      email: form.email,
      password: form.password,
      rollNo: form.rollNo,
      aadharNo: form.aadharNo,
      department: form.department,
      mobileNo: form.mobile, 
    };
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(userObject)], { type: 'application/json' }));
    formData.append('profilePic', form.profilePic);
    formData.append('aadharFile', form.aadharFile);
    try {
      await axios.post('http://localhost:8080/api/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Registered successfully!');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed.');
    }
  };
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form" encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
        <input type="text" name="rollNo" placeholder="Roll Number" value={form.rollNo} onChange={handleChange} />
        {errors.rollNo && <p className="error">{errors.rollNo}</p>}
        <input type="text" name="aadharNo" placeholder="Aadhar Number" value={form.aadharNo} onChange={handleChange} />
        {errors.aadharNo && <p className="error">{errors.aadharNo}</p>}
        <input type="text" name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        {errors.department && <p className="error">{errors.department}</p>}
        <input type="text" name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} />
        {errors.mobile && <p className="error">{errors.mobile}</p>}
          <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}
        <label>Upload Profile Picture (JPG):</label>
        <input type="file" name="profilePic" accept="image/jpeg" onChange={handleChange} />
        {errors.profilePic && <p className="error">{errors.profilePic}</p>}
        <label>Upload Aadhar File (PDF):</label>
        <input type="file" name="aadharFile" accept="application/pdf" onChange={handleChange} />
        {errors.aadharFile && <p className="error">{errors.aadharFile}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default Register;
