import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>VMH Shop</h1>
      </div>
      <nav className="nav" style={{marginRight:'50px'}}>
        <ul>
          <li><a href="/">Trang Chủ</a></li>
          <li><a href="#about">Giới Thiệu</a></li>
          <li><a href="#services">Dịch Vụ</a></li>
          <li><a href="#contact">Liên Hệ</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;