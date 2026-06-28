export type ProjectId =
  | "field-notes"
  | "quiet-rooms"
  | "surface-studies"
  | "after-light";

export type Project = {
  id: ProjectId;
  title: string;
  description: string;
};

export const projects: Project[] = [
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
