import React from 'react';
import style from '../styles/Logo.module.css';
const Logo = () => {
  return (

      <div className={style.wrapper}>
  <div className={style.logoContainer}>
      <img src="/logo.png" alt="Logo" className={style.logoImage} />
    </div>
  </div>
  );
};

export default Logo;
