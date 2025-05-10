import Image from "next/image";

async function getUXBook() {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=subject:UX+design&maxResults=1&orderBy=relevance",
      { next: { revalidate: 86400 } } // Revalidate once per day
    );

    if (!response.ok) {
      throw new Error("Failed to fetch book data");
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items[0];
    }

    return null;
  } catch (error) {
    console.error("Error fetching UX book:", error);
    return null;
  }
}

export default async function UXBookFeature() {
  const book = await getUXBook();

  if (!book) {
    return null;
  }

  const { volumeInfo } = book;
  const title = volumeInfo.title;
  const authors = volumeInfo.authors
    ? volumeInfo.authors.join(", ")
    : "Unknown Author";
  const description = volumeInfo.description
    ? volumeInfo.description.substring(0, 150) +
      (volumeInfo.description.length > 150 ? "..." : "")
    : "No description available";
  const thumbnail = volumeInfo.imageLinks?.thumbnail || "/placeholder.svg";
  const infoLink = volumeInfo.infoLink || "#";

  return (
    <section className="bg-[var(--color-muted-background)] py-[var(--space-xl)]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          UX Book Recommendation
        </h2>
        <div className="bg-background rounded-[var(--radius-lg)] p-6 shadow-md">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-full md:w-48 h-64 relative">
              <Image
                src={thumbnail || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover rounded-[var(--radius-md)]"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-[var(--color-text-light)] mb-3">
                By {authors}
              </p>
              <p className="mb-4">{description}</p>
              <a
                href={infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-sm)] font-medium hover:bg-purple-700 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
