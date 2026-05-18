/* === POD — sections (part 2) === */

const { useState: useState2, useMemo: useMemo2, useEffect } = React;

/* ───── 5-year roadmap ───── */
function Roadmap() {
  const t = useT();
  const [active, setActive] = useState2(0);
  const phases = t.roadmap_phases;
  const phase = phases[active];
  const fillPct = ((active + 1) / phases.length) * 100;

  return (
    <section className="section roadmap" id="roadmap">
      <div className="container">
        <div className="split-12" style={{ alignItems: "end" }}>
          <div>
            <div className="eyebrow">{t.roadmap_eyebrow}</div>
          </div>
          <div>
            <h2 className="h-1 has-em" style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: t.roadmap_title_html }} />
          </div>
        </div>

        <div className="roadmap-bar" role="tablist">
          <div className="roadmap-fill" style={{ width: `${fillPct}%` }} />
          <div className="roadmap-marks">
            {phases.map((p, i) => (
              <div
                key={i}
                className={`roadmap-mark ${i === active ? "is-active" : ""} ${i < active ? "is-done" : ""}`}
                style={{ left: `${((i + 1) / phases.length) * 100 - (50 / phases.length)}%` }}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
              />
            ))}
          </div>
        </div>

        <div className="roadmap-labels">
          {phases.map((p, i) => (
            <div
              key={i}
              className={`roadmap-label ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="num">{t.roadmap_phase} 0{i + 1}</span>
              <span>{p.year}</span>
            </div>
          ))}
        </div>

        <div className="phase">
          <div>
            <div className="mono-up" style={{ color: "var(--terra)" }}>{t.roadmap_phase} 0{active + 1} · {phase.year}</div>
            <h3 style={{ margin: "16px 0 28px" }}>{phase.title}</h3>
            <ul>
              {phase.items.map(([h, d], i) => (
                <li key={i}>
                  <strong>{h}</strong>{d}
                </li>
              ))}
            </ul>
          </div>
          <div className="phase-side">
            <div className="mono-up small" style={{ color: "oklch(0.7 0.02 60)" }}>{t.roadmap_milestone}</div>
            <div className="phase-stat">{phase.stat}</div>
            <div className="small" style={{ marginTop: 4 }}>{phase.statSub}</div>
            <div style={{ height: 1, background: "oklch(0.30 0.013 55)", margin: "28px 0" }} />
            <div className="lead" style={{ color: "oklch(0.85 0.015 70)", margin: 0, fontSize: 16 }}>
              “{phase.side}”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── knowledge hub / archive ─────
   POD doesn't host content — this section is an index pointing
   at YouTube, Instagram, the press, and podcast feeds.
   Each card carries: platform glyph · topic · date · thumbnail ·
   title · outlet · optional pull quote · single open-out action.
   YouTube cards with a videoId can expand inline to a lite-embed. */

/* tiny mono SVG glyphs — intent indicators, not brand marks */
function PlatformGlyph({ platform, size = 14 }) {
  const s = { width: size, height: size, display: "inline-block", flex: "none" };
  const stroke = "currentColor";
  if (platform === "YOUTUBE") {
    return (
      <svg viewBox="0 0 16 16" style={s} fill="none" aria-hidden="true">
        <rect x="0.75" y="2.75" width="14.5" height="10.5" rx="2.5" stroke={stroke} strokeWidth="1.2"/>
        <path d="M6.5 5.6v4.8l4-2.4z" fill={stroke}/>
      </svg>
    );
  }
  if (platform === "INSTAGRAM") {
    return (
      <svg viewBox="0 0 16 16" style={s} fill="none" aria-hidden="true">
        <rect x="1.4" y="1.4" width="13.2" height="13.2" rx="3.2" stroke={stroke} strokeWidth="1.2"/>
        <circle cx="8" cy="8" r="2.8" stroke={stroke} strokeWidth="1.2"/>
        <circle cx="11.6" cy="4.4" r="0.7" fill={stroke}/>
      </svg>
    );
  }
  if (platform === "PRESS") {
    return (
      <svg viewBox="0 0 16 16" style={s} fill="none" aria-hidden="true">
        <rect x="1.4" y="2.4" width="13.2" height="11.2" stroke={stroke} strokeWidth="1.2"/>
        <line x1="3.4" y1="5.4" x2="12.6" y2="5.4" stroke={stroke} strokeWidth="1"/>
        <line x1="3.4" y1="8" x2="12.6" y2="8" stroke={stroke} strokeWidth="1"/>
        <line x1="3.4" y1="10.6" x2="9.4" y2="10.6" stroke={stroke} strokeWidth="1"/>
      </svg>
    );
  }
  if (platform === "PODCAST") {
    return (
      <svg viewBox="0 0 16 16" style={s} fill="none" aria-hidden="true">
        <rect x="6" y="1.4" width="4" height="8" rx="2" stroke={stroke} strokeWidth="1.2"/>
        <path d="M3.4 7.4a4.6 4.6 0 0 0 9.2 0" stroke={stroke} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="8" y1="12" x2="8" y2="14.4" stroke={stroke} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (platform === "FACEBOOK") {
    return (
      <svg viewBox="0 0 16 16" style={s} fill="none" aria-hidden="true">
        <rect x="1.4" y="1.4" width="13.2" height="13.2" rx="2.4" stroke={stroke} strokeWidth="1.2"/>
        <path d="M10.2 5.4h-1.3c-.45 0-.7.3-.7.75V7.4h2l-.25 2h-1.75v5.2H7.0V9.4H5.4v-2H7V5.8c0-1.35.8-2.2 2.15-2.2h1.05v1.8z" fill={stroke}/>
      </svg>
    );
  }
  return null;
}

const PLATFORM_LABEL = {
  YOUTUBE: "YouTube",
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  PRESS: "Press",
  PODCAST: "Podcast"
};

function platformLabelML(p) {
  return { YOUTUBE: "YouTube", INSTAGRAM: "Instagram", FACEBOOK: "Facebook", PRESS: "പ്രസ്സ്", PODCAST: "പോഡ്കാസ്റ്റ്" }[p];
}

function ArchiveMedia({ item, expanded, onPlay }) {
  /* For YouTube with a videoId, show the real poster and a play overlay;
     when expanded, swap to the lite-embed iframe (youtube-nocookie). */
  if (item.platform === "YOUTUBE" && item.videoId) {
    const poster = `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;
    if (expanded) {
      return (
        <div className="archive-media is-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0`}
            title={item.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    return (
      <button className="archive-media is-poster" onClick={onPlay} aria-label="Play inline">
        <img src={poster} alt="" loading="lazy" />
        <span className="play-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
        </span>
      </button>
    );
  }
  /* No videoId, or non-YouTube: striped placeholder with platform label.
     The thumbnail field is a future override slot. */
  if (item.thumbnail) {
    return (
      <div className="archive-media">
        <img src={item.thumbnail} alt="" loading="lazy" />
      </div>
    );
  }
  return (
    <a
      className="archive-media is-placeholder"
      data-platform={item.platform}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open on ${PLATFORM_LABEL[item.platform]}`}
    >
      <span className="ph-stripes" />
      <span className="ph-center">
        <span className="ph-glyph"><PlatformGlyph platform={item.platform} size={56} /></span>
        <span className="ph-platform mono-up">{PLATFORM_LABEL[item.platform]}</span>
        <span className="ph-outlet">{item.outlet}</span>
      </span>
    </a>
  );
}

function ArchiveCard({ item, lang, t }) {
  const [expanded, setExpanded] = useState2(false);
  const canEmbed = item.platform === "YOUTUBE" && !!item.videoId;

  const openLabel = {
    YOUTUBE: t.archive_open_youtube,
    INSTAGRAM: t.archive_open_instagram,
    FACEBOOK: t.archive_open_facebook,
    PRESS: t.archive_open_press,
    PODCAST: t.archive_open_podcast
  }[item.platform];

  const platformWord = lang === "ml" ? platformLabelML(item.platform) : PLATFORM_LABEL[item.platform];

  return (
    <article className="archive-card" data-platform={item.platform}>
      <ArchiveMedia item={item} expanded={expanded} onPlay={() => setExpanded(true)} />

      <div className="archive-card-body">
        <div className="archive-meta">
          <span className="platform-tag">
            <PlatformGlyph platform={item.platform} />
            {platformWord}
          </span>
          <span className="dot-sep" aria-hidden="true">·</span>
          <span className="topic">{item.topic}</span>
          {item.district && <><span className="dot-sep" aria-hidden="true">·</span><span>{item.district}</span></>}
          <span style={{ marginLeft: "auto" }}>{item.duration}</span>
        </div>

        <h3 className="archive-title">{item.title}</h3>

        <div className="archive-sub">
          <span className="outlet">{item.outlet}</span>
          <span className="dot-sep" aria-hidden="true">·</span>
          <span className="date">{item.date}</span>
        </div>

        {item.quote && <div className="archive-quote">“{item.quote}”</div>}

        <div className="archive-actions">
          {canEmbed && !expanded && (
            <button className="action-link is-primary" onClick={() => setExpanded(true)}>
              {t.archive_play_inline}
              <span className="action-arrow" aria-hidden="true">▶</span>
            </button>
          )}
          {canEmbed && expanded && (
            <button className="action-link" onClick={() => setExpanded(false)}>
              {t.archive_close_inline}
            </button>
          )}
          <a className="action-link is-primary" href={item.url} target="_blank" rel="noopener noreferrer">
            {openLabel}
            <span className="action-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function Archive({ searchRef }) {
  const t = useT();
  const lang = useLang();
  const [query, setQuery] = useState2("");
  const [source, setSource] = useState2("ALL");
  const [visible, setVisible] = useState2(8);

  const data = lang === "ml" ? ARCHIVE_ML : ARCHIVE;

  const filtered = useMemo2(() => {
    /* Newest first by `iso` (YYYY-MM-DD lex-sorts as a date).
       Entries without `iso` fall to the end. */
    const sorted = [...data].sort((a, b) => (b.iso || "").localeCompare(a.iso || ""));
    return sorted.filter(item => {
      if (source !== "ALL" && item.platform !== source) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (item.title + item.quote + item.district + item.topic + item.outlet)
        .toLowerCase()
        .includes(q);
    });
  }, [data, query, source]);

  useEffect(() => { setSource("ALL"); }, [lang]);
  useEffect(() => { setVisible(8); }, [query, source, lang]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  return (
    <section className="section container" id="archive">
      <I18nSectionHead tagKey="archive_eyebrow" titleKey="archive_title_html" leadKey="archive_lead" />
      <div className="spacer-lg" />

      <div className="search">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="var(--ink-3)" strokeWidth="1.4"/>
          <path d="M11 11l4 4" stroke="var(--ink-3)" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <input
          ref={searchRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.archive_search_ph}
        />
        <span className="mono-up" style={{ color: "var(--ink-3)" }}>{filtered.length} {t.archive_results}</span>
      </div>

      <div className="search-filters">
        <span className="filter-label mono-up">{t.archive_source_label}</span>
        {SOURCE_FILTERS.map(src => (
          <button
            key={src}
            className={`chip chip-source ${source === src ? "is-active" : ""}`}
            onClick={() => setSource(src)}
          >
            {src !== "ALL" && <PlatformGlyph platform={src} size={11} />}
            <span>{src === "ALL" ? (lang === "ml" ? t.archive_source_all : "ALL") : (lang === "ml" ? platformLabelML(src).toUpperCase() : src)}</span>
          </button>
        ))}
      </div>

      <div className="archive">
        {filtered.length === 0 ? (
          <div className="archive-card is-empty">
            <div className="serif" style={{ fontSize: 24, fontStyle: "italic", color: "var(--ink-2)", padding: "60px 30px", textAlign: "center" }}>
              {t.archive_empty}
            </div>
          </div>
        ) : (
          <>
            {shown.map((a, i) => (
              <ArchiveCard key={i} item={a} lang={lang} t={t} />
            ))}
            {remaining === 0 && shown.length % 2 === 1 && (
              <a className="archive-card is-suggest" href="#join">
                <span className="sg-mark" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <div className="sg-eyebrow">{t.archive_why_label}</div>
                <div className="sg-title">{t.archive_download}</div>
                <div className="sg-cta">→</div>
              </a>
            )}
          </>
        )}
      </div>

      {remaining > 0 && (
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <button className="btn btn-ghost" onClick={() => setVisible(v => v + 8)}>
            {t.archive_show_more} ({remaining} {t.archive_remaining})
          </button>
        </div>
      )}

      <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div className="small" style={{ maxWidth: 600 }}>
          <span className="mono-up" style={{ color: "var(--terra)" }}>{t.archive_why_label}</span>{" "}{t.archive_why}
        </div>
        <a href="#join" className="btn btn-ghost">{t.archive_download}</a>
      </div>
    </section>
  );
}

/* ───── voices ───── */
function Voices() {
  const t = useT();
  const lang = useLang();
  const data = lang === "ml" ? VOICES_ML : VOICES;
  return (
    <section className="section container" id="voices">
      <I18nSectionHead tagKey="voices_eyebrow" titleKey="voices_title_html" />
      <div className="spacer-lg" />
      <div className="voices">
        {data.map((v, i) => (
          <figure key={i} className="voice" style={{ margin: 0 }}>
            <blockquote className="q" style={{ margin: 0 }}>{v.q}</blockquote>
            <figcaption className="attr">— {v.attr}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ───── FAQ ───── */
function FAQList() {
  const t = useT();
  const lang = useLang();
  const data = lang === "ml" ? FAQ_ML : FAQ;
  const [open, setOpen] = useState2(0);
  return (
    <section className="section container" id="faq">
      <div className="split-12">
        <div>
          <Eyebrow>{t.faq_eyebrow}</Eyebrow>
          <h2 className="h-1 has-em" style={{ marginTop: 16 }} dangerouslySetInnerHTML={{ __html: t.faq_title_html }} />
          <p className="lead" style={{ marginTop: 20, maxWidth: 360 }}>{t.faq_lead}</p>
        </div>
        <div className="faq-list">
          {data.map((f, i) => {
            const isOpen = i === open;
            return (
              <div key={i} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="n">Q · {String(i + 1).padStart(2, "0")}</span>
                  <span className="t">{f.q}</span>
                  <span className="x" aria-hidden="true" />
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    <p className="body">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───── get involved · billboard CTA ─────
   The main page section is no longer a form. It explains *why*
   and *how* signup works, then sends the visitor to the standalone
   join.html page (which is also the shareable social link). */
function CoCreator() {
  const t = useT();
  const lang = useLang();
  const [copied, setCopied] = useState2(false);

  const shareUrl = () => {
    /* Builds the absolute URL to the standalone signup page so it can
       be pasted into WhatsApp / Instagram / etc. with full provenance. */
    const url = new URL("join.html", window.location.href);
    return url.toString();
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl());
    } catch (e) {
      /* clipboard API can fail in non-secure contexts — fall back to
         selecting a hidden textarea so the user can still copy manually. */
      const ta = document.createElement("textarea");
      ta.value = shareUrl();
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (_) {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="section container" id="join">
      <I18nSectionHead tagKey="join_eyebrow" titleKey="join_title_html" leadKey="join_lead" />

      <div className="join-billboard">
        {/* left: how-it-works steps */}
        <div className="join-steps">
          <div className="eyebrow" style={{ marginBottom: 20 }}>{t.join_steps_h}</div>
          <ol className="join-steps-list">
            {t.join_steps.map(([h, d], i) => (
              <li key={i}>
                <div className="step-num">0{i + 1}</div>
                <div className="step-body">
                  <strong>{h}</strong>{" "}{d}
                </div>
              </li>
            ))}
          </ol>
          <p className="small join-pilot-note">{t.join_pilot_note}</p>
        </div>

        {/* right: the shareable CTA card */}
        <div className="join-cta-card">
          <div className="join-cta-url" aria-hidden="true">
            <span className="mono">↗</span>
            <span className="mono">{t.join_cta_url_label}</span>
          </div>
          <a href="join.html" className="btn join-cta-btn">
            {t.join_cta_btn}
            <svg className="arrow" width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M1 6h13M10 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <div className="join-cta-sub">{t.join_cta_sub}</div>

          <div className="join-cta-divider" />

          <button type="button" className="join-share-btn" onClick={onCopy}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="2.5" y="2.5" width="8" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="5.5" y="5.5" width="8" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            <span>{copied ? t.join_cta_share_done : t.join_cta_share}</span>
          </button>
        </div>
      </div>

      {/* secondary: coordination guide */}
      <div className="join-guide">
        <div>
          <div className="eyebrow">{t.join_guide_h}</div>
          <p className="body" style={{ marginTop: 12, maxWidth: 640 }}>{t.join_guide_p}</p>
        </div>
        <a className="btn btn-ghost" href="#">{t.join_guide_btn}</a>
      </div>
    </section>
  );
}

/* ───── footer ───── */
function Footer() {
  const t = useT();
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="mono-up" style={{ color: "var(--terra)", marginBottom: 18 }}>P · O · D</div>
          <div className="footer-tag">{t.footer_tag}</div>
          <div className="mono-up" style={{ marginTop: 28, color: "oklch(0.7 0.02 60)" }}>{t.footer_place}</div>
        </div>
        <div>
          <h4>{t.footer_work}</h4>
          {t.footer_links.work.map((lbl, i) => <a key={i} href={["#pillars","#method","#roadmap","#archive"][i]}>{lbl}</a>)}
        </div>
        <div>
          <h4>{t.footer_participate}</h4>
          {t.footer_links.participate.map((lbl, i) => <a key={i} href="#join">{lbl}</a>)}
        </div>
        <div>
          <h4>{t.footer_read}</h4>
          {t.footer_links.read.map((lbl, i) => {
            /* read column: 0 → concept paper PDF · 2 → FAQ on this page · others → #
               keep target="_blank" so the PDF opens in a new tab without losing the site */
            const href = i === 0 ? "uploads/pod-concept-paper.pdf" : i === 2 ? "#faq" : "#";
            const ext = i === 0;
            return <a key={i} href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener" : undefined}>{lbl}</a>;
          })}
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t.footer_rights}</span>
        <span>{t.footer_neutral}</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Roadmap, Archive, Voices, FAQList, CoCreator, Footer });
