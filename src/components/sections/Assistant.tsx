"use client";

import { useEffect, useRef, useState } from "react";
import { assistantSamples } from "@/config/content";
import { track } from "@/lib/analytics";
import { ArrowRight, Info, Person } from "../ui/Icons";
import { Reveal } from "../ui/Reveal";

export function Assistant() {
  const [activeId, setActiveId] = useState(assistantSamples[0].id);
  const [typing, setTyping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = assistantSamples.find((s) => s.id === activeId) ?? assistantSamples[0];

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const choose = (id: string) => {
    if (id === activeId && !typing) return;
    setActiveId(id);
    track("assistant_demo_used", { question: id });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setTyping(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setTyping(false), 700);
  };

  return (
    <section className="section" id="assistant" aria-labelledby="assistant-title">
      <div className="container assistant">
        <Reveal className="assistant__intro">
          <span className="eyebrow">The Fairward Assistant</span>
          <h2 id="assistant-title" className="h2">
            Meet your new real estate <span className="serif-italic">co-pilot.</span>
          </h2>
          <p className="lede">
            Get organized, understand the process, and stay informed from listing preparation through closing.
          </p>
          <div>
            <p className="general-label" id="prompt-label" style={{ marginBottom: 12 }}>
              Try a sample question
            </p>
            <div className="prompt-list" role="group" aria-labelledby="prompt-label">
              {assistantSamples.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="prompt-btn"
                  aria-pressed={s.id === activeId}
                  aria-controls="assistant-log"
                  onClick={() => choose(s.id)}
                >
                  <span>{s.question}</span>
                  <ArrowRight />
                </button>
              ))}
            </div>
          </div>
          <p className="support-statement">
            <Info size={16} />
            <span>
              AI-assisted organization and education, with licensed professional support for transaction-specific advice
              and decisions.
            </span>
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="chat-app" role="region" aria-label="Fairward Assistant demonstration">
            <aside className="chat-side" aria-hidden="true">
              <div>
                <h4>My sale</h4>
                <ul>
                  <li>Overview</li>
                  <li>Listing prep</li>
                  <li>Showings</li>
                  <li>Offers</li>
                  <li className="is-active">Assistant</li>
                </ul>
              </div>
              <div>
                <h4>My team</h4>
                <ul>
                  <li>Licensed broker</li>
                  <li>Transaction support</li>
                </ul>
              </div>
            </aside>

            <div className="chat-main">
              <div className="chat-head">
                <span className="chat-head__title">
                  <span className="chat-avatar" aria-hidden="true">
                    f
                  </span>
                  Fairward Assistant
                </span>
                <span className="tag">Demo · sample responses</span>
              </div>

              <div className="chat-log" id="assistant-log" aria-live="polite" aria-busy={typing}>
                <div className="chat-msg chat-msg--user" key={`q-${active.id}`}>
                  {active.question}
                </div>
                {typing ? (
                  <div className="typing" aria-label="Assistant is responding">
                    <i />
                    <i />
                    <i />
                  </div>
                ) : (
                  <div className="chat-msg chat-msg--ai" key={`a-${active.id}`}>
                    <span className="general-label">General information · not personalized advice</span>
                    <p>{active.answer.intro}</p>
                    <ul>
                      {active.answer.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <div className="handoff">
                      <Person size={16} />
                      <span>
                        <b>Licensed professional review</b>
                        {active.answer.handoff}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="chat-input" aria-hidden="true">
                <span>Ask about your sale…</span>
                <i>
                  <ArrowRight size={14} />
                </i>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
