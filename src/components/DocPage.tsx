import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "./sections/Footer";
import { PrelaunchBanner } from "./ui/PrelaunchBanner";
import { Wordmark } from "./ui/Wordmark";

export function DocPage({ title, draft = true, children }: { title: string; draft?: boolean; children: ReactNode }) {
  return (
    <>
      <PrelaunchBanner />
      <header className="site-header is-scrolled">
        <div className="container site-header__inner">
          <Wordmark />
          <Link className="nav-link" href="/">
            ← Back to home
          </Link>
        </div>
      </header>
      <main id="main" className="container">
        <article className="doc">
          <h1>{title}</h1>
          {draft && (
            <div className="form-alert form-alert--info" role="note">
              <span>
                <strong>Draft placeholder.</strong> This page must be completed and approved by qualified counsel before
                public launch.
              </span>
            </div>
          )}
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
