import React, { useState } from 'react';
import UserForm from './components/form/UserForm';
import UserList from "./components/list/UserList";
import './App.css';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'app dark-mode' : 'app light-mode'}>
      <div className='nav-bar'>
        <h1>مدیریت مخاطب</h1>
        <button className='theme-toggle-button' onClick={toggleTheme}>
          {isDarkMode ? 'Dark' : 'Light'}
        </button>
      </div>
      <div className="container">
        <div>
          <h2>اضافه کردن اطلاعات کاربر</h2>
          <UserForm />
        </div>
        <div>
          <h2>لیست کاربران</h2>
          <UserList />
        </div>
      </div>
    </div>
  );
}
