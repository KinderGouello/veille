import React from 'react';

const AddButton = ({ onClick, saved }) => (
  <div className={"card-action card-add" + (saved ? ' card-add-disabled' : '')} onClick={!saved ? onClick : ''}>
    <span>
      <i className="fa fa-check fa-2x"></i>
      {saved &&
        <span>Saved !</span>  
      }
    </span>
  </div>
);

export default AddButton;
