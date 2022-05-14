import React from "react";

export const Alert = () => {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
          This is a primary alert with
          <a to="/" className="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div>
    </div>
  );
};

export default Alert;
