"use client";

import Link from "next/link";

import { BrandMark } from "@/components/portfolio/BrandMark";
import { projects, type ProjectId } from "@/data/projects";

type SidebarProps = {
  introComplete: boolean;
  activeProject: ProjectId;
  onProjectClick: (projectId: ProjectId) => void;
};

const brandClassName =
  "text-[clamp(1.05rem,2.1vw,2.55rem)] leading-[0.82] tracking-[-0.075em]";

export function Sidebar({
  introComplete,
  activeProject,
  onProjectClick,
}: SidebarProps) {
  return (
    <aside className="lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
      <div className="flex h-full flex-col justify-between">
        <div>
          <BrandMark
            className={brandClassName}
            hidden={!introComplete}
            sharedLayout={introComplete}
          />

          <nav
            aria-label="Primary navigation"
            className="mt-8 flex flex-col items-start gap-2 text-xl"
          >
            <Link
              href="/about"
              className="underline decoration-transparent hover:decoration-current"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="underline decoration-transparent hover:decoration-current"
            >
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
