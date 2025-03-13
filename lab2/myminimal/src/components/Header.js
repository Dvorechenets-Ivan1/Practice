import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">MyMinimal</Link>
        </div>
        <div id="burger-menu" className="burger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="nav">
          <ul className={menuOpen ? "show" : ""}>
            <li><Link to="/">Головна</Link></li>
            <li><Link to="/about">Про нас</Link></li>
            <li><Link to="/contact">Контакти</Link></li>
            <li><Link to="/blog">Блог</Link></li>
            <li><Link to="/services">Послуги</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
