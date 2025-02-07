import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    familyName: '',
    phoneNumber: '',
    relationship: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,[name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!formData.name) formErrors.name = 'نام لازم است';
    if (!formData.familyName) formErrors.familyName = 'نام خانوادگی لازم است';
    if (!formData.phoneNumber) formErrors.phoneNumber = 'شماره لازم است';
    if (!formData.relationship) formErrors.relationship = 'نسبت لازم است';
    if (!formData.email) formErrors.email = 'ایمیل لازم است';
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await fetch('https://677d4c274496848554c9fb47.mockapi.io/userinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({
          name: '',
          familyName: '',
          phoneNumber: '',
          relationship: '',
          email: ''
        });
        setErrors({});
        fetchUsers();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>نام</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='نام'
          required
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label>نام خانوادگی</label>
        <input
          type="text"
          name="familyName"
          value={formData.familyName}
          onChange={handleChange}
          placeholder='نام خانوادگی'
          required
        />
        {errors.familyName && <div className="error">{errors.familyName}</div>}
      </div>
      <div className="form-group">
        <label>شماره</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder='شماره'
          required
        />
        {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
      </div>
      <div className="form-group">
        <label>نسبت</label>
        <input
          type="text"
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
          placeholder='نسبت'
          required
        />
        {errors.relationship && <div className="error">{errors.relationship}</div>}
      </div>
      <div className="form-group">
        <label>ایمیل</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='ایمیل'
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <button type="submit" className="btn-submit">اضافه کردن</button>
    </form>
  );
};
export default UserForm;
