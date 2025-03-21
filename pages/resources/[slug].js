import React, { useEffect } from "react";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../components/Skeleton"; // Import the Skeleton component.

// Create a Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

// Fetch paths for static generation. This function is required for dynamic routes.
export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "resource" });

  const paths = res.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: true, // Show fallback loading state if a page is not found
  };
};

// Fetch data for each page using the slug.
export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "resource",
    "fields.slug": params.slug, // Use the slug parameter to filter the query
  });

  // If no resource found, return 404
  if (!items.length) {
    return { notFound: true };
  }

  return {
    props: {
      resource: items[0], // Use items instead of res.items
    },
    revalidate: 10, // Revalidate the page every 10 seconds
  };
}

// The ResourceDetails component receives the resource prop, which is an object fetched from Contentful.
export default function ResourceDetails({ resource }) {
  // Add safety check for resource
  if (!resource) {
    return <Skeleton />;
  }

  // Safely destructure fields with defaults
  const {
    featuredImage,
    title = "Untitled Resource",
    description,
    tags = [],
    content,
    resourceUrl = "#",
    externalEmbed,
  } = resource.fields || {};

  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Return the JSX for the resource details page
  return (
    <>
      <div className={`resource-details ${isLoaded ? "loaded" : ""}`}>
        <div className="banner-image">
          {featuredImage && (
            <img
              src={"https:" + featuredImage.fields.file.url}
              alt={title + " thumbnail"}
            />
          )}
        </div>
        <div className="resource-details-content">
          <div className="text-content">
            <h1>{title}</h1>
            <div className="badges-container">
              {tags &&
                tags.map((tag) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
            </div>
            <div className="description">
              {description && documentToReactComponents(description)}
            </div>
          </div>
          <div className="embed-and-link">
            {/* Render external embed content if available */}
            {externalEmbed && (
              <div
                className="external-embed"
                dangerouslySetInnerHTML={{ __html: externalEmbed }}
              />
            )}
            <div className="resource-link-container">
              <a
                href={resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                View Resource →
              </a>
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
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .resource-details.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .banner-image {
          width: 100%;
          margin-bottom: 3rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .banner-image img {
          width: 100%;
          height: auto;
          display: block;
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

        .badges-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .badge {
          display: inline-block;
          background-color: #f3f4f6;
          color: #374151;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
          line-height: 1;
        }

        .embed-and-link {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .external-embed {
          width: 100%;
          margin-bottom: 1rem;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
        }

        .description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #4b5563;
        }

        .resource-link {
          display: inline-block;
          background: transparent;
          color: #000;
          padding: 0.75rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
          border: 1px solid #000;
        }

        .resource-link:hover {
          background: #000;
          color: #fff;
          transform: translateY(-2px);
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
}
