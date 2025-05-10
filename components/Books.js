"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Books() {
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const queryTerms = ["UX", "UI", "Product", "Interaction", "Experience"];
        const randomTerm =
          queryTerms[Math.floor(Math.random() * queryTerms.length)];

        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${randomTerm}+design&maxResults=20&orderBy=relevance&t=${Date.now()}`,
          { cache: "no-store" }
        );

        const data = await response.json();
        const booksWithImages = (data.items || []).filter(
          (item) =>
            item.volumeInfo?.imageLinks?.thumbnail ||
            item.volumeInfo?.imageLinks?.smallThumbnail
        );

        if (booksWithImages.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * booksWithImages.length
          );
          setBook(booksWithImages[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    }

    fetchBook();
  }, []);

  if (!book) {
    return (
      <div style={cardStyle}>
        <p style={textMutedStyle}>Loading book recommendation...</p>
      </div>
    );
  }

  const { volumeInfo } = book;
  const title = volumeInfo.title ?? "Untitled";
  const authors = volumeInfo.authors?.join(", ") ?? "Unknown Author";
  const publishedYear = volumeInfo.publishedDate
    ? new Date(volumeInfo.publishedDate).getFullYear()
    : "Unknown";
  const description =
    volumeInfo.description?.length > 200
      ? volumeInfo.description.slice(0, 200) + "..."
      : volumeInfo.description ?? "No description available";
  const categories = volumeInfo.categories || [];

  const thumbnailRaw =
    volumeInfo.imageLinks?.thumbnail ||
    volumeInfo.imageLinks?.smallThumbnail ||
    "/placeholder.svg";
  const thumbnail = thumbnailRaw.replace("http://", "https://");

  return (
    <section
      style={{ margin: "3rem auto", padding: "0 1rem", maxWidth: "720px" }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        UX Book Recommendation
      </h2>

      <div style={cardStyle}>
        <div style={cardContentStyle}>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              {title}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "#666" }}>
              {authors} • {publishedYear}
            </p>
            <p
              style={{ fontSize: "0.875rem", color: "#555", marginTop: "1rem" }}
            >
              {description}
            </p>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {categories.slice(0, 3).map((cat, i) => (
                <span
                  key={i}
                  style={{
                    background: "#f3f3f3",
                    color: "#444",
                    padding: "4px 8px",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              width: "96px",
              height: "144px",
              position: "relative",
              flexShrink: 0,
              borderRadius: "6px",
              overflow: "hidden",
              marginLeft: "1rem",
            }}
          >
            <Image
              src={thumbnail}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div style={cardFooterStyle}>
          <p
            style={{ fontSize: "0.75rem", color: "#999", textAlign: "center" }}
          >
            Refresh the page to see a different UX book
          </p>
        </div>
      </div>
    </section>
  );
}

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  padding: "1.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const cardContentStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "1rem",
};

const cardFooterStyle = {
  borderTop: "1px solid #eee",
  marginTop: "1.5rem",
  paddingTop: "0.75rem",
};

const textMutedStyle = {
  textAlign: "center",
  fontSize: "0.875rem",
  color: "#888",
};
