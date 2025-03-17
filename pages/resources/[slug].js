import React, { useEffect } from "react";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Badge from "../../components/Badge"; // Import the Badge component.

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
    fallback: false,
  };
};

// Fetch data for each page using the slug.
export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "resource",
    "fields.slug": params.slug, // Use the slug parameter to filter the query
  });

  if (!items.length) {
    return { notFound: true };
  }

  return {
    props: {
      resource: items[0],
      revalidate: 1, // Revalidate the page every 10 seconds
    },
  };
}

// The ResourceDetails component receives the resource prop, which is an object fetched from Contentful.
export default function ResourceDetails({ resource }) {
  const {
    featuredImage,
    title,
    description,
    tags,
    content,
    resourceUrl,
    externalEmbed,
  } = resource.fields;

  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Return the JSX for the resource details page
  // This includes a banner image, title, tags, description, and external embed/link
  // The component uses CSS-in-JS with styled-jsx for styling
  return (
    <>
      <div className={`resource-details ${isLoaded ? "loaded" : ""}`}>
        <div className="banner-image">
          <img
            src={"https:" + featuredImage.fields.file.url}
            alt={title + " thumbnail"}
          />
        </div>
        <div className="resource-details-content">
          <div className="text-content">
            <h1>{title}</h1>
            <div className="badge">
              {tags.map((tag) => (
                <Badge key={tag} text={tag} />
              ))}
            </div>
            <div className="description">
              {documentToReactComponents(description)}
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
      {/* Styles using styled-jsx for component-scoped CSS */}
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
