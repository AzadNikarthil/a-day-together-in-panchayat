/* === POD — section components === */

const { useState, useMemo, useEffect, useRef } = React;

/* ───── nav ───── */
function Nav({ lang, setLang, onSearch }) {
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["#pillars", t.nav_pillars],
    ["#method",  t.nav_method],
    ["#roadmap", t.nav_roadmap],
    ["#archive", t.nav_archive],
    ["#faq",     t.nav_faq],
    ["#join",    t.nav_join],
  ];
  const close = () => setMenuOpen(false);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top" onClick={close}>
          <span className="brand-mark">
            <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
              <circle cx="14" cy="14" r="13" fill="none" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="14" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="14" cy="14" r="1.6" fill="var(--terra)"/>
              <line x1="14" y1="1" x2="14" y2="6" stroke="currentColor" strokeWidth="1"/>
              <line x1="14" y1="22" x2="14" y2="27" stroke="currentColor" strokeWidth="1"/>
              <line x1="1" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="1"/>
              <line x1="22" y1="14" x2="27" y2="14" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </span>
          <span>
            POD <span className="mono-up" style={{ marginLeft: 8, color: "var(--ink-3)" }}>/ പ്രാദേശിക സർക്കാർ</span>
          </span>
        </a>

        <div className="nav-links">
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </div>

        <div className="nav-actions">
          <button
            className="chip"
            onClick={() => { close(); onSearch(); }}
            aria-label="Search archive"
            style={{ padding: "6px 12px" }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ marginRight: 2 }}>
              <circle cx="5" cy="5" r="3.5" stroke="currentColor"/>
              <path d="M8 8L11 11" stroke="currentColor" strokeLinecap="round"/>
            </svg>
            {t.nav_search}
          </button>
          <div className="lang-switch">
            <button className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "ml" ? "is-active" : ""} onClick={() => setLang("ml")}>മല</button>
          </div>
          <button
            className={`nav-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={t.nav_menu || "Menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile"
          >
            <span className="nav-toggle-bars" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </div>

      <div id="nav-mobile" className={`nav-mobile ${menuOpen ? "is-open" : ""}`} hidden={!menuOpen}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={close}>{label}</a>
        ))}
      </div>
    </nav>
  );
}

/* ───── hero ───── */
function Hero() {
  const t = useT();
  const lang = useLang();
  return (
    <section className="hero container" id="top">
      <div className="hero-grid">
        <div>
          <Eyebrow>{t.hero_eyebrow}</Eyebrow>
          <h1 className="h-display" style={{ margin: "28px 0 0" }}>
            {t.hero_h_pre}{" "}
            <span style={{ color: "var(--terra)", fontStyle: lang === "ml" ? "normal" : "italic", fontFamily: lang === "ml" ? "var(--mal)" : "var(--serif)" }}>{t.hero_h_em}</span>{" "}
            {t.hero_h_post}
          </h1>
          <p className="lead" style={{ marginTop: 32, maxWidth: 640 }} dangerouslySetInnerHTML={{ __html: t.hero_lead_html }} />
          <div className="hero-cta">
            <a className="btn" href="#roadmap">
              {t.hero_cta_1}
              <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a className="btn btn-ghost" href="uploads/pod-concept-paper.pdf" target="_blank" rel="noopener">{t.hero_cta_2}</a>
          </div>
        </div>

        <aside className="hero-meta">
          {t.hero_meta.map(([k, v], i) => (
            <div key={i} className="hero-meta-row">
              <div className="mono-up">{k}</div>
              <div className="body">{v}</div>
            </div>
          ))}
        </aside>
      </div>

      <div className="hero-image">
        <img
          src="uploads/hero.jpg"
          alt=""
          loading="lazy"
        />
      </div>
    </section>
  );
}

/* ───── the shift ───── */
function Shift() {
  const t = useT();
  return (
    <section className="section container" id="shift">
      <div className="split-12">
        <div>
          <Eyebrow>{t.shift_eyebrow}</Eyebrow>
        </div>
        <div>
          <h2 className="h-2" style={{ margin: 0 }}>
            {t.shift_h_pre}
            <span className="serif-it" style={{ color: "var(--terra)" }}> {t.shift_h_em} </span>
            {t.shift_h_post}
          </h2>

          <div className="spacer-lg" />

          <div className="shift-cols">
            <div className="shift-col">
              <Eyebrow>{t.shift_old_h}</Eyebrow>
              {t.shift_old.map(([h, d]) => (
                <p key={h} className="body shift-item">
                  <strong className="ink" style={{ fontWeight: 500 }}>{h}</strong> {d}
                </p>
              ))}
            </div>
            <div className="shift-col">
              <Eyebrow>{t.shift_new_h}</Eyebrow>
              {t.shift_new.map(([h, d]) => (
                <p key={h} className="body shift-item">
                  <strong style={{ color: "var(--terra)", fontWeight: 500 }}>{h}</strong> <span className="ink">{d}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── pillars ───── */
function Pillars() {
  const t = useT();
  const lang = useLang();
  return (
    <section className="section container" id="pillars">
      <I18nSectionHead tagKey="pillars_eyebrow" titleKey="pillars_title_html" leadKey="pillars_lead" />
      <div className="spacer-lg" />
      <div className="pillars">
        {PILLARS.map((p, i) => {
          const ml = PILLAR_ML[i];
          const intro = lang === "ml" ? ml.intro : p.intro;
          const points = lang === "ml" ? ml.points : p.points;
          const replaces = lang === "ml" ? ml.replaces : p.replaces;
          const becomes  = lang === "ml" ? ml.becomes  : p.becomes;
          return (
            <article key={p.num} className="pillar">
              <div className="num">{t.pillar_label} {p.num}</div>
              <div className="mal-name mal">{p.mal}</div>
              <div className="en-name">{p.en}</div>
              <div className="vs">
                <span className="strike">{replaces}</span>
                <span className="arrow">→</span>
                <span className="new">{becomes}</span>
              </div>
              <p>{intro}</p>
              <ul>
                {points.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
              <div style={{ marginTop: 28 }}>
                <span className="mono-up">{p.sub}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ───── methodology + clock ───── */
function MethodologyClock() {
  const t = useT();
  const R = 200, cx = 240, cy = 240;
  const ticks = [];
  for (let h = 0; h < 24; h++) {
    const ang = (h / 24) * Math.PI * 2 - Math.PI / 2;
    const inR = (h % 3 === 0) ? R - 18 : R - 10;
    const x1 = cx + Math.cos(ang) * inR;
    const y1 = cy + Math.sin(ang) * inR;
    const x2 = cx + Math.cos(ang) * R;
    const y2 = cy + Math.sin(ang) * R;
    ticks.push(
      <line key={h} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="var(--ink)" strokeWidth={h % 3 === 0 ? 1.4 : 0.6} opacity={h % 3 === 0 ? 0.9 : 0.45}/>
    );
    if (h % 3 === 0) {
      const tx = cx + Math.cos(ang) * (R - 36);
      const ty = cy + Math.sin(ang) * (R - 36);
      ticks.push(
        <text key={`l${h}`} x={tx} y={ty + 3} textAnchor="middle"
          fontFamily="var(--mono)" fontSize="10"
          fill={h >= 9 && h <= 21 ? "var(--ink)" : "var(--ink-3)"}
          letterSpacing="1">
          {h.toString().padStart(2, "0")}
        </text>
      );
    }
  }

  /* Daytime-hours arc — sits as a halo just outside the main clock face
     so it doesn't crowd the centered "9 AM — 9 PM" text inside. */
  const a1 = (9 / 24) * Math.PI * 2 - Math.PI / 2;
  const a2 = (21 / 24) * Math.PI * 2 - Math.PI / 2;
  const arcR = R + 18;
  const ax1 = cx + Math.cos(a1) * arcR;
  const ay1 = cy + Math.sin(a1) * arcR;
  const ax2 = cx + Math.cos(a2) * arcR;
  const ay2 = cy + Math.sin(a2) * arcR;
  const arcPath = `M ${ax1} ${ay1} A ${arcR} ${arcR} 0 1 1 ${ax2} ${ay2}`;

  const points = [
    [t.method_1_eye, t.method_1_h, t.method_1_p],
    [t.method_2_eye, t.method_2_h, t.method_2_p],
    [t.method_3_eye, t.method_3_h, t.method_3_p]
  ];

  return (
    <section className="section container" id="method">
      <I18nSectionHead tagKey="method_eyebrow" titleKey="method_title_html" leadKey="method_lead" />
      <div className="spacer-lg" />

      <div className="method-grid">
        <div className="clock-wrap">
          <svg viewBox="0 0 480 480">
            <circle cx={cx} cy={cy} r={R + 32} fill="none" stroke="var(--line)" strokeDasharray="2 4"/>
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--line-strong)"/>
            <path d={arcPath} fill="none" stroke="var(--terra)" strokeWidth="12" strokeLinecap="round" opacity="0.92"/>
            {ticks}
            <circle cx={ax1} cy={ay1} r="5" fill="var(--terra)"/>
            <circle cx={ax2} cy={ay2} r="5" fill="var(--terra)"/>
            <text x={cx} y={cy - 30} textAnchor="middle"
              fontFamily="var(--mono)" fontSize="10" fill="var(--ink-3)" letterSpacing="2">
              {t.method_daily}
            </text>
          </svg>
          <div className="clock-center">
            <div>
              <div className="big">9 AM <span style={{ color: "var(--terra)", fontStyle: "italic" }}>—</span> 9 PM</div>
              <div className="mono-up small" style={{ marginTop: 12 }}>{t.method_clock_sub}</div>
            </div>
          </div>
        </div>

        <div className="stack-lg">
          {points.map(([eye, h, p], i) => (
            <div key={i}>
              <div className="row" style={{ gap: 14, marginBottom: 12 }}>
                <span className="mono-up" style={{ color: "var(--terra)" }}>{eye}</span>
                <span className="rule" style={{ flex: 1 }} />
              </div>
              <h3 className="h-3" style={{ margin: 0 }}>{h}</h3>
              <p className="body" style={{ marginTop: 12 }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Shift, Pillars, MethodologyClock });
