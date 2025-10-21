import React from 'react';
import './Header.scss';
import logo from '../../assets/entersoftone.svg';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="EnterSoftOne" className="header-logo" />
        <h1 className="header-title">Employees</h1>
      </div>
    </header>
  );
};

export default Header;
