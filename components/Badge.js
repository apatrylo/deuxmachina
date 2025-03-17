import React from "react";

const Badge = ({ text }) => {
  return (
    <span className="badge">
      {text}
      <style jsx>{`
        .badge {
          border: 1px solid #e2e8f0;
          display: inline-block;
          padding: 0.25rem 0.75rem;
          margin: 0.25rem;
          border-radius: 9999px;
          background-color: #f1f5f9;
          color: #334155;
          font-size: 0.875rem;
        }
      `}</style>
    </span>
  );
};

export default Badge;
