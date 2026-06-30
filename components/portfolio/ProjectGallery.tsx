"use client";

/* eslint-disable @next/next/no-img-element -- The masonry grid needs each AVIF's intrinsic rendered height. */

import { motion } from "motion/react";

import { BrandMark } from "@/components/portfolio/BrandMark";
import type { ImageEntry } from "@/data/images";
import type { Project } from "@/data/projects";

export type ProjectWithImages = Project & {
  images: ImageEntry[];
};

type ProjectGalleryProps = {
  introComplete: boolean;
  projects: ProjectWithImages[];
  onImageOpen: (image: ImageEntry) => void;
};

export function ProjectGallery({
  introComplete,
  projects,
  onImageOpen,
}: ProjectGalleryProps) {
  return (
    <section aria-label="Image projects" className="min-w-0">
      {projects.map((project, index) => (
        <ProjectSection
          key={project.id}
          introComplete={introComplete}
          isFirst={index === 0}
          project={project}
          onImageOpen={onImageOpen}
        />
      ))}
    </section>
  );
}

type ProjectSectionProps = {
  introComplete: boolean;
  isFirst: boolean;
  project: ProjectWithImages;
  onImageOpen: (image: ImageEntry) => void;
};

function ProjectSection({
  introComplete,
  isFirst,
  project,
  onImageOpen,
}: ProjectSectionProps) {
  return (
    <section id={project.id} className="scroll-mt-5 pb-20">
      <header className="mb-12 pb-2 lg:pl-8 xl:pl-12">
        {isFirst ? (
          <>
            <span className="sr-only">{project.title}</span>
            <BrandMark
              className={`editorial-heading transition-opacity duration-700 ${
                introComplete ? "opacity-100" : "opacity-0"
              }`}
              sharedLayout={introComplete}
            />
          </>
        ) : (
          <h2 className="editorial-heading lg:pl-8 xl:pl-12">
            {project.title}
          </h2>
        )}
      </header>
      {!isFirst && project.description ? (
        <p className="editorial-identity-disciplines mb-8 max-w-sm">
          {project.description}
        </p>
      ) : null}
      <div className="columns-1 gap-5 md:columns-2 *:mb-5">
        {project.images.map((image) => (
          <ImageTile
            key={image.id}
            image={image}
            introComplete={introComplete}
            onOpen={onImageOpen}
          />
        ))}
      </div>
    </section>
  );
}

type ImageTileProps = {
  image: ImageEntry;
  introComplete: boolean;
  onOpen: (image: ImageEntry) => void;
};

function ImageTile({ image, introComplete, onOpen }: ImageTileProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(image)}
      className="block w-full break-inside-avoid text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-4"
      aria-label={`Open ${image.alt}`}
    >
      {image.id === "hero" && introComplete ? (
        <motion.img
          layoutId="hero-image"
          src={image.src}
          alt={image.alt}
          className="h-auto w-full"
        />
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          className="h-auto w-full"
          loading={image.id === "hero" ? "eager" : "lazy"}
        />
      )}
    </button>
  );
}
