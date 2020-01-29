import React from 'react';

import './ToolTip.css';

const ToolTip = ({ text = '' }) => {
  return (
    <>
      <div id="tooltip" className="on right">
        <div className="tooltip-arrow"></div>
        <div className="tooltip-content">{text}</div>
      </div>
    </>
  );
};

export default ToolTip;
