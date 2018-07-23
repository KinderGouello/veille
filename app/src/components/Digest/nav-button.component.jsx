import React from 'react';

const NavButton = ({ icon, onClick }) => (
  <span className="fa-stack fa-2x" onClick={onClick}>
    <i className={"fas fa-circle fa-stack-2x" + (icon ? '' : " fa-inverse")}></i>
    <i className={"fas fa-stack-1x fa-inverse fa-" + icon}></i>
  </span>
);

export default NavButton;
