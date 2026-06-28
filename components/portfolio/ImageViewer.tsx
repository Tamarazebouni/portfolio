"use client";

/* eslint-disable @next/next/no-img-element -- The viewer preserves each image's natural aspect ratio without preset dimensions. */

import { useEffect } from "react";

import { BrandMark } from "@/components/portfolio/BrandMark";
import type { ImageEntry } from "@/data/images";

type ImageViewerProps = {
  image: ImageEntry;
  imageNumber: number;
  totalImages: number;
  projectTitle: string;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
};

const brandClassName =
  "text-[clamp(1.05rem,2.1vw,2.55rem)] leading-[0.82] tracking-[-0.075em]";
const textButtonClassName =
  "underline decoration-transparent underline-offset-4 hover:decoration-current focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-4";

export function ImageViewer({
  image,
  imageNumber,
  totalImages,
  projectTitle,
  onPrevious,
  onNext,
  onClose,
}: ImageViewerProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  return (
    <>
      <section className="grid min-h-[calc(100vh-2.5rem)] place-items-center bg-background">
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[calc(100vh-2.5rem)] w-full object-contain"
        />
      </section>

      <aside className="lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
        <div className="flex h-full flex-col justify-between">
          <div>
            <button
              type="button"
              onClick={onClose}
              className={`mb-8 text-xl ${textButtonClassName}`}
            >
              Close
            </button>
            <div className="mb-8 flex flex-col items-start gap-2 text-xl">
              <button
                type="button"
                onClick={onPrevious}
                className={textButtonClassName}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={onNext}
                className={textButtonClassName}
              >
                Next
              </button>
              <p className="pt-2 text-sm uppercase tracking-[0.24em] text-stone-500">
                {imageNumber} / {totalImages}
              </p>
            </div>
            <BrandMark className={brandClassName} />
          </div>

          <dl className="mt-12 grid gap-4 text-xl">
            <ImageMetaItem label="Project" value={projectTitle} />
            <ImageMetaItem label="Date" value={image.date} />
            <ImageMetaItem label="Place" value={image.place} />
            <ImageMetaItem label="Medium" value={image.medium} />
            <ImageMetaItem label="Note" value={image.note} />
          </dl>
        </div>
      </aside>
    </>
  );
}

function ImageMetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm uppercase tracking-[0.24em] text-stone-500">
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}
