import React from 'react';

import './nav-button.css';

const NavButton = ({ icon, onClick }) => (
  <span className={"digest-nav-button fa-stack fa-2x" + (icon ? '' : " disabled") } onClick={onClick || undefined}>
    <i className="fas fa-circle fa-stack-2x"></i>
    <i className={"fas fa-stack-1x fa-inverse fa-" + icon}></i>
  </span>
);

export default NavButton;
