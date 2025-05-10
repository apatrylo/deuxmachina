export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="bg-background text-foreground py-[var(--space-2xl)] min-h-[50vh] flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side: Hero text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
              Deux <br /> Machina
            </h1>
            <p className="text-[var(--color-text-light)] text-[var(--font-size-lg)] mb-6 max-w-lg">
              Building god-tier web experiences through modern interfaces, bold
              typography, and a dash of AI.
            </p>
            <a
              href="#projects"
              className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium hover:bg-purple-700 transition"
            >
              Explore Projects
            </a>
          </div>

          {/* Right side: Placeholder image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-64 md:h-80 rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-muted)]">
              <img
                src="/placeholder.svg"
                alt="Deux Machina Visual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="page-content">{children}</main>

      <footer className="mt-[var(--space-2xl)] pt-[var(--space-lg)] text-center border-t border-[var(--color-muted)] text-[color:var(--color-text-light)] text-[var(--font-size-sm)]">
        &copy; {new Date().getFullYear()} Deux Machina
      </footer>
    </div>
  );
}
