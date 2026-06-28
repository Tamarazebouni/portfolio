"use client";

import { LayoutGroup } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ImageViewer } from "@/components/portfolio/ImageViewer";
import { IntroOverlay } from "@/components/portfolio/IntroOverlay";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { imageEntries, type ImageEntry } from "@/data/images";
import { projects, type ProjectId } from "@/data/projects";


export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectId>(projects[0].id);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
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
  const selectedImage =
    selectedImageIndex === null ? null : imageEntries[selectedImageIndex];
  const selectedImageNumber =
    selectedImageIndex === null ? 0 : selectedImageIndex + 1;

  const setSectionRef = useCallback(
    (projectId: ProjectId, node: HTMLElement | null) => {
      sectionRefs.current[projectId] = node;
    },
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

  const scrollToProject = useCallback((projectId: ProjectId) => {
    setSelectedImageIndex(null);
    sectionRefs.current[projectId]?.scrollIntoView({ block: "start" });
  }, []);

  const openImage = useCallback((image: ImageEntry) => {
    const imageIndex = imageEntries.findIndex((entry) => entry.id === image.id);

    if (imageIndex >= 0) setSelectedImageIndex(imageIndex);
  }, []);

  const showPreviousImage = useCallback(() => {
    setSelectedImageIndex((currentIndex) =>
      currentIndex === null
        ? null
        : (currentIndex - 1 + imageEntries.length) % imageEntries.length,
    );
  }, []);

  const showNextImage = useCallback(() => {
    setSelectedImageIndex((currentIndex) =>
      currentIndex === null ? null : (currentIndex + 1) % imageEntries.length,
    );
  }, []);

  const closeImage = useCallback(() => setSelectedImageIndex(null), []);

  return (
    <LayoutGroup>
      <main className="min-h-screen bg-background text-stone-950">
        <div className="grid min-h-screen grid-cols-1 gap-5 px-5 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(11rem,15rem)] lg:gap-8 lg:px-8">
          {selectedImage ? (
            <ImageViewer
              image={selectedImage}
              imageNumber={selectedImageNumber}
              totalImages={imageEntries.length}
              projectTitle={
                projects.find((project) => project.id === selectedImage.project)
                  ?.title ?? "Project"
              }
              onPrevious={showPreviousImage}
              onNext={showNextImage}
              onClose={closeImage}
            />
          ) : (
            <>
              <ProjectGallery
                introComplete={introComplete}
                projects={groupedImages}
                onImageOpen={openImage}
                onSectionMount={setSectionRef}
              />

              <Sidebar
                introComplete={introComplete}
                activeProject={activeProject}
                onProjectClick={scrollToProject}
              />
            </>
          )}
        </div>

        <IntroOverlay introComplete={introComplete} />
      </main>
    </LayoutGroup>
  );
}
