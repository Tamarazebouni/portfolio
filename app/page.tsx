"use client";

import { LayoutGroup } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ImageViewer } from "@/components/portfolio/ImageViewer";
import { IntroOverlay } from "@/components/portfolio/IntroOverlay";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { imageEntries, type ImageEntry } from "@/data/images";
import { projects } from "@/data/projects";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

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

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroComplete(true), 1100);

    return () => window.clearTimeout(timer);
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
      <main className="min-h-screen bg-background text-foreground">
        <div className="grid min-h-screen grid-cols-1 gap-5 px-5 py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:px-10 lg:py-8">
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
              />

              <Sidebar introComplete={introComplete} />
            </>
          )}
        </div>

        <IntroOverlay introComplete={introComplete} />
      </main>
    </LayoutGroup>
  );
}
