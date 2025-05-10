import { useEffect, useState } from "react";
import Link from "next/link";
import Books from "../components/Books";
import Lenis from "@studio-freight/lenis";

export default function Layout({ children, hideBooks = false }) {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="layout" data-scroll-container>
      <header className="site-header">
        <Link href="/" className="logo-link" aria-label="Go to homepage">
          <img src="/logo.svg" alt="Deux Machina Logo" className="nav-logo" />
        </Link>
        <h1 className="brand-name">Deux Machina</h1>
        <p className="project-description">
          A curated resource hub for emerging UX and Web designers— highlighting
          tools, books, and best practices from across the web.
        </p>
      </header>

      {!hideBooks && (
        <section className="books-section">
          <Books />
        </section>
      )}

      <main className="page-content">
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Collection{" "}
        </h2>
        {children}
      </main>

      <footer className="site-footer">
        <p>&copy; {year} Deux Machina</p>
        <p>
          Created as part of the <em>Developing for Change</em> module at MMU.
        </p>
      </footer>

      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          min-height: 100vh;
          padding: 2rem 1.5rem;
          font-family: "Inter", "Helvetica Neue", Helvetica, sans-serif;
          background: white;
          color: #111;
        }

        .site-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          animation: fadeIn 0.6s ease-in-out;
        }

        .logo-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.75rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .logo-link:hover {
          transform: scale(1.05) rotate(2deg);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
        }

        .nav-logo {
          height: 64px;
          width: 64px;
          will-change: transform;
        }

        .brand-name {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 0;
        }

        .project-description {
          font-size: 0.875rem;
          color: #666;
          max-width: 460px;
          line-height: 1.5;
        }

        .books-section {
          width: 100%;
          max-width: 720px;
          text-align: left;
          margin: 2rem 0;
        }

        .page-content {
          max-width: 720px;
          width: 100%;
          padding: 1rem 0;
        }

        .site-footer {
          margin-top: 3rem;
          font-size: 0.75rem;
          color: #888;
          line-height: 1.4;
        }

        .site-footer p {
          margin: 0.25rem 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 600px) {
          .project-description,
          .books-section,
          .page-content {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
