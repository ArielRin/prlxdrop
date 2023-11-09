import React from 'react';
import style from '../styles/Logo.module.css';
const Logo = () => {
  return (

  <div className={style.logoContainer}>
      <img src="/logo.png" alt="Logo" className={style.logoImage} />
    </div>
  );
};

export default Logo;
