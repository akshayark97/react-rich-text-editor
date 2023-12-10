import React from "react";

import './customEditor.css'

export const Button = ({ onSubmitSave }) => {
  return (
    <button className="saveButton" onClick={onSubmitSave}>
      Save
    </button>
  );
};

export default Button;
