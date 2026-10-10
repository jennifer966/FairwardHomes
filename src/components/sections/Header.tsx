"use client";

import { useEffect, useRef, useState } from "react";
import { brand, nav } from "@/config/site";
import { Wordmark } from "../ui/Wordmark";
import { ArrowRight } from "../ui/Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll, close on Escape, and keep focus inside the open mobile menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const items = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>("a, button")].filter(
          Boolean,
        ) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 960px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className={`site-header${scrolled || open ? " is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        <Wordmark />
        <nav className="nav-desktop" aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--sm btn--navy" href="#get-started" data-cta="Get Started" data-cta-location="header">
            Get Started
          </a>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          style={{ position: "relative", zIndex: 101 }}
        >
          <span className="menu-toggle__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      <div
        id="mobile-nav"
        ref={panelRef}
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a className="mobile-nav__link" href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                  <ArrowRight size={22} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-nav__foot">
          <a
            className="btn btn--block"
            href="#get-started"
            onClick={() => setOpen(false)}
            data-cta="Get Started"
            data-cta-location="mobile-menu"
          >
            Get Started <ArrowRight />
          </a>
          <p>{brand.tagline}</p>
        </div>
      </div>
    </header>
  );
}
