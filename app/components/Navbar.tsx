"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled || open
          ? "border-nexora-indigo/10 bg-white/90 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-nexora-teal text-sm font-bold text-white">
            N
          </span>
          <span className="text-lg font-bold tracking-tight text-nexora-indigo">NEXORA</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-nexora-indigo/70 transition hover:text-nexora-teal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-nexora-indigo transition hover:bg-nexora-indigo/5"
          >
            Log in
          </a>
          <a
            href="#get-started"
            className="rounded-lg bg-nexora-teal px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-nexora-teal/90"
          >
            Get started
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-nexora-indigo hover:bg-nexora-indigo/5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-nexora-indigo/10 bg-white px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-nexora-indigo hover:bg-nexora-indigo/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <a href="#login" onClick={() => setOpen(false)} className="rounded-lg border border-nexora-indigo/15 px-4 py-3 text-center font-medium text-nexora-indigo">
              Log in
            </a>
            <a href="#get-started" onClick={() => setOpen(false)} className="rounded-lg bg-nexora-teal px-4 py-3 text-center font-semibold text-white">
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
