import React from "react";

const Badge = ({ text }) => {
  return (
    <span className="badge">
      {text}
      <style jsx>{`
        .badge {
          border: 1px solid rgba(147, 51, 234, 0.3);
          display: inline-block;
          padding: 0.25rem var(--space-md);
          margin: 0.25rem;
          border-radius: var(--radius-full);
          background-color: #e5e7eb;
          color: var(--color-text);
          font-size: 1rem;
          backdrop-filter: blur(4px);
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from {
            box-shadow: 0 0 5px rgba(147, 51, 234, 0.1);
          }
          to {
            box-shadow: 0 0 10px rgba(147, 51, 234, 0.2);
          }
        }
      `}</style>
    </span>
  );
};

export default Badge;
