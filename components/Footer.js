import React from 'react';
import style from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerContent}>
        <div className={style.leftColumn}>
          <div className={style.companyName}>Parallex 2023</div>
        </div>
        <div className={style.rightColumn}>
          <a href="https://parallaxdefi.io" target="_blank" rel="noopener noreferrer">
            <img src="/social-website.png" alt="Website" />
          </a>
          <a href="https://twitter.com/DefiPter" target="_blank" rel="noopener noreferrer">
            <img src="/social-twitter.png" alt="Twitter" />
          </a>
          <a href="https://t.me/peetdefi" target="_blank" rel="noopener noreferrer">
            <img src="/social-telegram.png" alt="Telegram" />
          </a>
          <a href="https://github.com/ArielRin/prlxdrop" target="_blank" rel="noopener noreferrer">
            <img src="/social-github.png" alt="GitHub" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
