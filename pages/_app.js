import { useRouter } from "next/router";
import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // ✅ UPDATE THIS LINE based on your folder structure
  const isSlugPage = router.pathname === "/resources/[slug]";

  return (
    <Layout hideBooks={isSlugPage}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Deux Machina</title>
        <meta
          name="description"
          content="UX resources, AI-enhanced web interfaces, and design insights."
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
