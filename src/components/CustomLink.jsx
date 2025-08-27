import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomLink = ({ to, children, className = '', activeClassName = 'active', ...props }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `${className} ${isActive ? activeClassName : ''}`.trim()
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default CustomLink;
