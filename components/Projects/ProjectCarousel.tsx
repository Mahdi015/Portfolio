"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./ProjectCarousel.module.css";

interface ProjectCarouselProps {
  images: string[];
  title: string;
  aspectRatio?: string;
  maxWidth?: string;
}

export default function ProjectCarousel({
  images,
  title,
  aspectRatio = "1 / 2",
  maxWidth = "280px",
}: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (!images.length) return;
      const nextIndex = (index + images.length) % images.length;
      setActiveIndex(nextIndex);
    },
    [images.length],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  if (!images.length) return null;

  return (
    <div className={styles.carousel} style={{ maxWidth }}>
      <div className={styles.viewport}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={goPrev}
          aria-label="Previous screenshot"
        >
          <FiChevronLeft size={24} />
        </button>

        <div className={styles.slide}>
          <div
            className={styles.imageFrame}
            style={{ aspectRatio, maxWidth }}
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} screenshot ${activeIndex + 1}`}
              fill
              sizes="(max-width: 600px) 90vw, 560px"
              className={styles.image}
              priority={activeIndex === 0}
            />
          </div>
        </div>

        <button
          type="button"
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={goNext}
          aria-label="Next screenshot"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Screenshot navigation">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to screenshot ${index + 1}`}
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
