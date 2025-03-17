const ResourceDetailsSkeleton = () => {
  return (
    <>
      <div className="resource-details skeleton">
        <div className="banner-image skeleton-image"></div>
        <div className="resource-details-content">
          <div className="text-content">
            <div className="skeleton-title"></div>
            <div className="badge">
              <div className="skeleton-badge"></div>
              <div className="skeleton-badge"></div>
              <div className="skeleton-badge"></div>
            </div>
            <div className="description">
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
            </div>
          </div>
          <div className="embed-and-link">
            <div className="skeleton-embed"></div>
            <div className="resource-link-container">
              <div className="skeleton-button"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Component-scoped styles */}
      <style jsx>{`
        .resource-details {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .skeleton-image {
          width: 100%;
          height: 300px;
          margin-bottom: 3rem;
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #f8f8f8 50%,
            #f0f0f0 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .resource-details-content {
          display: grid;
          gap: 3rem;
          grid-template-columns: 1fr;
        }

        .text-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .skeleton-title {
          height: 40px;
          width: 80%;
          background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #f8f8f8 50%,
            #f0f0f0 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }

        .badge {
          display: flex;
          gap: 0.5rem;
        }

        .skeleton-badge {
          height: 24px;
          width: 80px;
          background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #f8f8f8 50%,
            #f0f0f0 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 50px;
        }

        .skeleton-text {
          height: 16px;
          width: 100%;
          margin-bottom: 0.5rem;
          background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #f8f8f8 50%,
            #f0f0f0 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }

        .skeleton-text:last-child {
          width: 70%;
        }

        .embed-and-link {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .skeleton-embed {
          width: 100%;
          height: 250px;
          background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #f8f8f8 50%,
            #f0f0f0 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }

        .skeleton-button {
          width: 150px;
          height: 40px;
          background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #f8f8f8 50%,
            #f0f0f0 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 50px;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Responsive layout for larger screens */
        @media (min-width: 768px) {
          .resource-details-content {
            grid-template-columns: 1fr 1fr;
            align-items: start;
          }
        }
      `}</style>
    </>
  );
};

export default ResourceDetailsSkeleton;
