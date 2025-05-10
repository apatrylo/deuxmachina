import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../components/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "resource" });

  const paths = res.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "resource",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return { notFound: true };
  }

  return {
    props: {
      resource: items[0],
    },
    revalidate: 10,
  };
}

export default function ResourceDetails({ resource }) {
  if (!resource) return <Skeleton />;

  const {
    featuredImage,
    title = "Untitled Resource",
    description,
    tags = [],
    content,
    resourceUrl = "#",
    externalEmbed,
  } = resource.fields || {};

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className={`resource-wrapper ${isLoaded ? "loaded" : ""}`}>
        <div className="resource-details">
          {featuredImage && (
            <div className="banner-image">
              <img
                src={`https:${featuredImage.fields.file.url}`}
                alt={`${title} thumbnail`}
              />
            </div>
          )}

          <div className="resource-details-content">
            <div className="text-content">
              <h1>{title}</h1>

              {!!tags.length && (
                <div className="badges-container">
                  {tags.map((tag) => (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {description && (
                <div className="description">
                  {documentToReactComponents(description)}
                </div>
              )}
            </div>

            <div className="embed-and-link">
              {externalEmbed && (
                <div
                  className="external-embed"
                  dangerouslySetInnerHTML={{ __html: externalEmbed }}
                />
              )}

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

      <style jsx>{`
        .resource-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          min-height: 100vh;
          padding: 2rem 1.5rem;
          font-family: "Inter", "Helvetica Neue", Helvetica, sans-serif;
          background: white;
          color: #111;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .resource-wrapper.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .resource-details {
          width: 100%;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .banner-image {
          width: 100%;
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .banner-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .resource-details-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
        }

        .text-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: center;
        }

        h1 {
          font-size: 2rem;
          font-weight: 600;
          margin: 0;
        }

        .badges-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }

        .badge {
          background: #f3f3f3;
          color: #444;
          padding: 4px 8px;
          font-size: 0.75rem;
          border-radius: 4px;
        }

        .description {
          font-size: 1rem;
          color: #555;
          line-height: 1.7;
          max-width: 600px;
        }

        .embed-and-link {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }

        .external-embed {
          width: 100%;
          max-width: 600px;
        }

        .resource-link {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          background-color: #111;
          color: #fff;
          border-radius: 0.5rem;
          transition: all 0.25s ease;
        }

        .resource-link:hover {
          background-color: #000;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .description,
          .external-embed {
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
