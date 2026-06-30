"use client";

import Link from "next/link";

import { disciplines } from "@/data/site";

type SidebarProps = {
  introComplete: boolean;
};

export function Sidebar({ introComplete }: SidebarProps) {
  return (
    <aside
      aria-label="Artist identity"
      className="lg:sticky lg:top-0 lg:h-screen lg:min-w-[18rem] lg:pt-12"
    >
      <div
        className={`flex flex-col items-start gap-3 transition-opacity duration-700 delay-150 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="editorial-identity-disciplines">{disciplines}</p>

        <nav aria-label="Contact links" className="mt-[28vh] flex flex-col gap-1">
          <a
            href="https://www.instagram.com/tamarazebouni/"
            target="_blank"
            rel="noreferrer"
            className="editorial-contact-link underline decoration-transparent hover:decoration-current"
          >
            Instagram
          </a>
          <Link
            href="/contact"
            className="editorial-contact-link underline decoration-transparent hover:decoration-current"
          >
            Contact
          </Link>
        </nav>
      </div>
    </aside>
  );
}
