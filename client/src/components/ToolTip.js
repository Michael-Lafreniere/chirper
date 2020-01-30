import React from 'react';

import './ToolTip.css';

const ToolTip = ({ text = '', arrow = 'on right' }) => {
  return (
    <div id="tooltip" className={arrow}>
      <div className="tooltip-arrow"></div>
      <div className="tooltip-content">{text}</div>
    </div>
  );
};

export default ToolTip;
