import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ResourceCard = ({ resource }) => {
  // Add client-side rendering check
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent errors if resource or its fields are missing
  if (!resource || !resource.fields) {
    return <div className="resource-card">Loading...</div>;
  }

  const { title, resourceUrl, tags, slug, thumbnail } = resource.fields;

  return (
    <Link href={`/resources/${slug}`} passHref legacyBehavior>
      <a className="resource-card-link">
        <div className="resource-card">
          {/* Image that covers the entire card */}
          <div className="thumbnail">
            {isClient && thumbnail?.fields?.file?.url ? (
              <Image
                src={"https:" + thumbnail.fields.file.url}
                alt={title + " thumbnail"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="card-image"
              />
            ) : (
              <div className="placeholder-image">
                {isClient ? "No Image Available" : "Loading..."}
              </div>
            )}
          </div>

          {/* Content overlay that sits on top of the image */}
          <div className="content-overlay">
            <div className="content">
              <h2>{title}</h2>
              <p>
                {Array.isArray(tags) ? tags.join(", ") : "No tags available"}
              </p>
            </div>

            <div className="source-link">
              {isClient && (
                <a
                  href={resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-eye"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <style jsx>{`
            .resource-card-link {
              text-decoration: none;
              color: inherit;
              cursor: pointer;
              display: block;
            }

            .resource-card {
              position: relative;
              width: 100%;
              height: 100%;
              aspect-ratio: 4/3;
              border-radius: var(--radius-xl);
              overflow: hidden;
              box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1);
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }

            .resource-card:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }

            .thumbnail {
              position: absolute;
              width: 100%;
              height: 100%;
            }

            .placeholder-image {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #e0e0e0;
            }

            :global(.card-image) {
              z-index: 1;
            }

            .content-overlay {
              position: absolute;
              inset: 0;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              z-index: 2;
              background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.75) 90%
              );
              padding: 1rem;
            }

            .source-link {
              position: absolute;
              top: 10px;
              right: 10px;
              z-index: 3;
            }

            .source-link .link-button {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-color: var(--color-background);
              transition: all 0.2s ease;
              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }

            .source-link .link-button:hover {
              background-color: #e0e0e0;
              transform: scale(1.05);
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .content {
              margin-top: auto; /* Push content to bottom */
              color: white;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
            }

            .content h2 {
              margin: 0 0 0.5rem 0;
              font-size: 1.25rem;
            }

            .content p {
              margin: 0;
              font-size: 0.9rem;
              opacity: 0.9;
            }
          `}</style>
        </div>
      </a>
    </Link>
  );
};

export default ResourceCard;
