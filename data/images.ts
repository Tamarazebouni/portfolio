import { projects, type ProjectId } from "@/data/projects";

export type ImageEntry = {
  id: string;
  src: string;
  alt: string;
  project: ProjectId;
  date: string;
  place: string;
  medium: string;
  note: string;
};

export const imageEntries: ImageEntry[] = [
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
