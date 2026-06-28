"use client";

/* eslint-disable @next/next/no-img-element -- The masonry grid needs each AVIF's intrinsic rendered height. */

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type ProjectId = "field-notes" | "quiet-rooms" | "surface-studies" | "after-light";

type ImageEntry = {
  id: string;
  src: string;
  alt: string;
  project: ProjectId;
  date: string;
  place: string;
  medium: string;
  note: string;
};

const projects: Array<{ id: ProjectId; title: string; description: string }> = [
  {
    id: "field-notes",
    title: "Field Note",
    description: "Open landscapes, fragments, and quiet exterior studies.",
  },
  {
    id: "quiet-rooms",
    title: "Quiet Rooms",
    description: "Interior images, held light, and domestic thresholds.",
  },
  {
    id: "surface-studies",
    title: "Surface Studies",
    description: "Texture, material memory, and small details in close view.",
  },
  {
    id: "after-light",
    title: "After Light",
    description: "Late-day color, shadow, and softened edges.",
  },
];

const imageEntries: ImageEntry[] = [
  {
    id: "hero",
    src: "/images/hero.avif",
    alt: "Portfolio hero image",
    project: "field-notes",
    date: "2026",
    place: "Archive",
    medium: "Digital photograph",
    note: "Opening image and first piece in the grid.",
  },
  ...Array.from({ length: 26 }, (_, index) => {
    const project = projects[Math.floor(index / 7)]?.id ?? "after-light";
    const number = String(index).padStart(2, "0");

    return {
      id: `art-${number}`,
      src: `/images/art/art-${number}.avif`,
      alt: `Artwork ${number}`,
      project,
      date: `202${index % 6}`,
      place: ["Berlin", "Paris", "Marrakesh", "Lisbon"][index % 4],
      medium: index % 3 === 0 ? "35mm scan" : "Digital photograph",
      note: ["Color study", "Location study", "Light study", "Material study"][
        index % 4
      ],
    };
  }),
];

const brandName = "Tamara Pio Zebouni";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectId>(projects[0].id);
  const [selectedImage, setSelectedImage] = useState<ImageEntry | null>(null);
  const sectionRefs = useRef<Record<ProjectId, HTMLElement | null>>({
    "field-notes": null,
    "quiet-rooms": null,
    "surface-studies": null,
    "after-light": null,
  });

  const groupedImages = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        images: imageEntries.filter((image) => image.project === project.id),
      })),
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroComplete(true), 1100);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveProject(visible.target.id as ProjectId);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [introComplete]);

  const scrollToProject = (projectId: ProjectId) => {
    setSelectedImage(null);
    sectionRefs.current[projectId]?.scrollIntoView({ block: "start" });
  };

  return (
    <LayoutGroup>
      <main className="min-h-screen bg-white text-stone-950">
        <div className="grid min-h-screen grid-cols-1 gap-5 px-5 py-5 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:gap-10 lg:px-8">
          {selectedImage ? (
            <ImageViewer
              image={selectedImage}
              projectTitle={
                projects.find((project) => project.id === selectedImage.project)
                  ?.title ?? "Project"
              }
              onClose={() => setSelectedImage(null)}
            />
          ) : (
            <>
              <section aria-label="Image projects" className="min-w-0">
                {groupedImages.map((project) => (
                  <section
                    id={project.id}
                    key={project.id}
                    ref={(node) => {
                      sectionRefs.current[project.id] = node;
                    }}
                    className="scroll-mt-5 pb-14"
                  >
                    <div className="mb-5 border-t border-stone-950 pt-3">
                      <h2 className="text-[clamp(2.25rem,7vw,7rem)] leading-[0.86] tracking-[-0.06em]">
                        {project.title}
                      </h2>
                      <p className="mt-3 max-w-xl text-lg italic leading-snug text-stone-600">
                        {project.description}
                      </p>
                    </div>
                    <div className="columns-1 gap-5 md:columns-2 *:mb-5">
                      {project.images.map((image) => (
                        <button
                          key={image.id}
                          type="button"
                          onClick={() => setSelectedImage(image)}
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
                      ))}
                    </div>
                  </section>
                ))}
              </section>

              <Sidebar
                introComplete={introComplete}
                activeProject={activeProject}
                onProjectClick={scrollToProject}
              />
            </>
          )}
        </div>

        <AnimatePresence>
          {!introComplete && (
            <motion.section
              key="intro"
              className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-white"
              aria-label="Portfolio opening"
              exit={{ backgroundColor: "rgba(255,255,255,0)" }}
              transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.img
                layoutId="hero-image"
                src="/images/hero.avif"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <motion.h1
                layoutId="brand-name"
                className="relative px-6 text-center text-[clamp(3.5rem,13vw,14rem)] leading-[0.82] tracking-[-0.075em] text-white mix-blend-difference"
              >
                {brandName}
              </motion.h1>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}

function Sidebar({
  introComplete,
  activeProject,
  onProjectClick,
}: {
  introComplete: boolean;
  activeProject: ProjectId;
  onProjectClick: (projectId: ProjectId) => void;
}) {
  return (
    <aside className="lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
      <div className="flex h-full flex-col justify-between border-t border-stone-950 pt-3">
        <div>
          {introComplete ? (
            <motion.h1
              layoutId="brand-name"
              className="text-[clamp(3.5rem,7vw,8.5rem)] leading-[0.82] tracking-[-0.075em]"
            >
              {brandName}
            </motion.h1>
          ) : (
            <h1 className="text-[clamp(3.5rem,7vw,8.5rem)] leading-[0.82] tracking-[-0.075em] opacity-0">
              {brandName}
            </h1>
          )}

          <nav aria-label="Primary navigation" className="mt-8 flex gap-5 text-xl">
            <Link href="/about" className="underline decoration-transparent hover:decoration-current">
              About
            </Link>
            <Link href="/contact" className="underline decoration-transparent hover:decoration-current">
              Contact
            </Link>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-transparent hover:decoration-current"
            >
              Instagram
            </a>
          </nav>
        </div>

        <nav aria-label="Projects" className="mt-12 text-xl lg:mt-0">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-stone-500">
            Projects
          </p>
          <div className="flex flex-col items-start gap-2">
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => onProjectClick(project.id)}
                className={`text-left underline-offset-4 ${
                  activeProject === project.id
                    ? "underline"
                    : "text-stone-500 hover:text-stone-950"
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}

function ImageViewer({
  image,
  projectTitle,
  onClose,
}: {
  image: ImageEntry;
  projectTitle: string;
  onClose: () => void;
}) {
  return (
    <>
      <section className="grid min-h-[calc(100vh-2.5rem)] place-items-center bg-white">
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[calc(100vh-2.5rem)] w-full object-contain"
        />
      </section>

      <aside className="border-t border-stone-950 pt-3 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
        <div className="flex h-full flex-col justify-between">
          <div>
            <button
              type="button"
              onClick={onClose}
              className="mb-8 text-xl underline decoration-transparent underline-offset-4 hover:decoration-current focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-4"
            >
              Close
            </button>
            <h1 className="text-[clamp(3.5rem,7vw,8.5rem)] leading-[0.82] tracking-[-0.075em]">
              {brandName}
            </h1>
          </div>

          <dl className="mt-12 grid gap-4 text-xl">
            <div>
              <dt className="text-sm uppercase tracking-[0.24em] text-stone-500">
                Project
              </dt>
              <dd>{projectTitle}</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-[0.24em] text-stone-500">
                Date
              </dt>
              <dd>{image.date}</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-[0.24em] text-stone-500">
                Place
              </dt>
              <dd>{image.place}</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-[0.24em] text-stone-500">
                Medium
              </dt>
              <dd>{image.medium}</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-[0.24em] text-stone-500">
                Note
              </dt>
              <dd>{image.note}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </>
  );
}
