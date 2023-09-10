import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Spinner() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Spinner;
