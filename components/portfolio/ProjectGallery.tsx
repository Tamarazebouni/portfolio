"use client";

/* eslint-disable @next/next/no-img-element -- The masonry grid needs each AVIF's intrinsic rendered height. */

import { motion } from "motion/react";

import type { ImageEntry } from "@/data/images";
import type { Project, ProjectId } from "@/data/projects";

export type ProjectWithImages = Project & {
  images: ImageEntry[];
};

type ProjectGalleryProps = {
  introComplete: boolean;
  projects: ProjectWithImages[];
  onImageOpen: (image: ImageEntry) => void;
  onSectionMount: (projectId: ProjectId, node: HTMLElement | null) => void;
};

export function ProjectGallery({
  introComplete,
  projects,
  onImageOpen,
  onSectionMount,
}: ProjectGalleryProps) {
  return (
    <section aria-label="Image projects" className="min-w-0">
      {projects.map((project) => (
        <ProjectSection
          key={project.id}
          introComplete={introComplete}
          project={project}
          onImageOpen={onImageOpen}
          onSectionMount={onSectionMount}
        />
      ))}
    </section>
  );
}

type ProjectSectionProps = {
  introComplete: boolean;
  project: ProjectWithImages;
  onImageOpen: (image: ImageEntry) => void;
  onSectionMount: (projectId: ProjectId, node: HTMLElement | null) => void;
};

function ProjectSection({
  introComplete,
  project,
  onImageOpen,
  onSectionMount,
}: ProjectSectionProps) {
  return (
    <section
      id={project.id}
      ref={(node) => onSectionMount(project.id, node)}
      className="scroll-mt-5 pb-14"
    >
      <div className="mb-5">
        <h2 className="text-[clamp(0.675rem,2.1vw,2.1rem)] leading-[0.86] tracking-[-0.06em]">
          {project.title}
        </h2>
        <p className="mt-3 max-w-xl text-lg italic leading-snug text-stone-600">
          {project.description}
        </p>
      </div>
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
