import Link from "next/link";

export default function Layout({ children }) {
  // Layout component that wraps around all pages
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <h1>
            <span>deux</span>
            <span>MACHINA</span>
          </h1>
          <h2>ultimate UX resource repo</h2>
        </Link>
      </header>

      <div className="page-content">{children}</div>

      <footer>
        <p>Copyright 2021 deux machina</p>
      </footer>
    </div>
  );
}
