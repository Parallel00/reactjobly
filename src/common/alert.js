import React from "react";

function Alert({ type = "danger", messages = [] }) {
  if (!messages.length) return null;

  return (
    <div className={`alert alert-${type}`} role="alert">
      {messages.map((msg, idx) => (
        <p className="mb-0 small" key={idx}>
          {msg}
        </p>
      ))}
    </div>
  );
}

export default Alert;

