import { createClient } from "contentful"; // Use the createClient function, that is responsible for connection to the created Contentful space.
import ResourceCard from "../components/ResourceCard"; // Import the ResourceCard component.

//----------------------------------------------------------------
//API Fetch Client------------------------------------------------
//----------------------------------------------------------------
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID, // This is a server-side key
    accessToken: process.env.CONTENTFUL_ACCESS_KEY, // This is a server-side key
  });

  const res = await client.getEntries({ content_type: "resource" });

  return {
    props: {
      resources: res.items, // This is an array of objects fetched from Contentful
    },
    revalidate: 60, // Revalidate the page every 60 seconds
  };
}

//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
// The Resources component receives the resources prop, which is an array of objects fetched from Contentful.
export default function Resources({ resources }) {
  console.log("Fetched resources:", resources); // This line is for debugging purposes via console.log

  return (
    <div className="resource-list">
      {resources.map((resource) => (
        <ResourceCard key={resource.sys.id} resource={resource} />
      ))}

      <style jsx>{`
        .resource-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
          gap: var(--space-lg);
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
          justify-content: center;
        }

        @media (max-width: 48rem) {
          .resource-list {
            grid-template-columns: 1fr;
            padding: 1rem;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
