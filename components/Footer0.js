import React from 'react';
import style from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerContent}>
        <div className={style.leftColumn}>
          <div className={style.companyName}>Parallex 2023</div>
        </div>
        <div className={`${style.rightColumn} ${style.socialLinksContainer}`}>
          <a href="https://parallaxdefi.io" target="_blank" rel="noopener noreferrer" className={style.socialLink}>
            <img src="/webpage.png" alt="Website" style={{ width: '80%' }} />
          </a>
          <a href="https://twitter.com/DefiPter" target="_blank" rel="noopener noreferrer" className={style.socialLink}>
            <img src="/twitter.png" alt="Twitter" style={{ width: '80%' }} />
          </a>
          <a href="https://t.me/peetdefi" target="_blank" rel="noopener noreferrer" className={style.socialLink}>
            <img src="/telegram.png" alt="Telegram" style={{ width: '80%' }} />
          </a>
          <a href="https://github.com/ArielRin/prlxdrop" target="_blank" rel="noopener noreferrer" className={style.socialLink}>
            <img src="/github1.png" alt="GitHub" style={{ width: '80%' }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
