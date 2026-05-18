/* === POD — standalone signup page (join.html) ===
   Shared link target: a focused, phone-first co-creator signup.
   The page captures the four fields we actually act on:
     - Full name
     - WhatsApp number (+91, 10-digit)
     - District (all 14 Kerala; pilot rows flagged)
     - Local body (Panchayat / Municipality / Corporation) + name
   Email is optional. Submission is local-only for this prototype —
   real wiring goes wherever the volunteer team prefers (Sheet, form
   backend, etc.). After submit, the page becomes a "share this link"
   surface so neighbours can be invited in one tap. */

const { useState: useStateJP, useMemo: useMemoJP, useEffect: useEffectJP } = React;

/* Google Apps Script Web App — appends each submission as a row in the
   `POD · Co-Creator Signups` Google Sheet under adaytogetherinpanchayat@gmail.com.
   See the doPost() handler in the script for the column order. */
const SIGNUP_ENDPOINT = "https://script.google.com/macros/s/AKfycbyREAlw-h3DhUUMboEUj9OLTjOK2N_-Dx5FbrkhXd8WzGqbhtdT3qmN2xfyKKTdSnxuUQ/exec";

/* ── tiny lang toggle, mirrored from the main site ─────────── */
function JoinLangSwitch({ lang, setLang }) {
  return (
    <div className="lang-switch" role="tablist" aria-label="Language">
      <button className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")} role="tab" aria-selected={lang === "en"}>EN</button>
      <button className={lang === "ml" ? "is-active" : ""} onClick={() => setLang("ml")} role="tab" aria-selected={lang === "ml"}>മ</button>
    </div>
  );
}

/* ── the form itself ──────────────────────────────────────── */
function JoinForm({ onDone }) {
  const t = useT();
  const lang = useLang();

  const [form, setForm] = useStateJP({
    name: "",
    phone: "",
    email: "",
    district: "",
    bodyType: "Panchayat",   /* stays English internally; UI shows localized label */
    bodyName: ""
  });
  const [phoneError, setPhoneError] = useStateJP(false);
  const [submitting, setSubmitting] = useStateJP(false);
  const [submitError, setSubmitError] = useStateJP(false);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  /* simple but real Indian-mobile validation: must be 10 digits, leading 6-9 */
  const validatePhone = (p) => /^[6-9]\d{9}$/.test(p.replace(/\D/g, ""));

  const bodyTypeIndex = ["Panchayat", "Municipality", "Corporation"].indexOf(form.bodyType);

  const bodyNamePlaceholder = ({
    Panchayat:    t.jp_form_body_name_ph_panchayat,
    Municipality: t.jp_form_body_name_ph_municipality,
    Corporation:  t.jp_form_body_name_ph_corporation
  })[form.bodyType];

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhone(form.phone)) { setPhoneError(true); return; }
    setPhoneError(false);
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(false);

    /* POST as form-urlencoded so Apps Script's e.parameter picks the
       fields up directly. The endpoint responds with JSON but we use
       no-cors mode — Apps Script redirects through googleusercontent,
       which the browser can't read; the row still lands in the sheet. */
    try {
      const body = new URLSearchParams({
        name: form.name,
        phone: form.phone,
        email: form.email,
        district: form.district,
        bodyType: form.bodyType,
        bodyName: form.bodyName,
        lang
      });
      await fetch(SIGNUP_ENDPOINT, { method: "POST", body, mode: "no-cors" });
      onDone({ ...form });
    } catch (err) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="jp-form" onSubmit={onSubmit} noValidate>
      {/* row 1: name */}
      <div className="jp-field">
        <label htmlFor="jp-name">{t.jp_form_name}</label>
        <input
          id="jp-name"
          type="text"
          autoComplete="name"
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder={t.jp_form_name_ph}
        />
      </div>

      {/* row 2: phone with locked +91 prefix */}
      <div className="jp-field">
        <label htmlFor="jp-phone">{t.jp_form_phone}</label>
        <div className={`jp-phone-input ${phoneError ? "is-error" : ""}`}>
          <span className="jp-phone-prefix mono">+91</span>
          <input
            id="jp-phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
            autoComplete="tel-national"
            required
            value={form.phone}
            onChange={(e) => { set("phone", e.target.value.replace(/\D/g, "").slice(0, 10)); if (phoneError) setPhoneError(false); }}
            placeholder={t.jp_form_phone_ph}
          />
        </div>
        {phoneError && <div className="jp-error">{t.jp_form_phone_error}</div>}
      </div>

      {/* row 3: email (optional) */}
      <div className="jp-field">
        <label htmlFor="jp-email">
          {t.jp_form_email}
          <span className="jp-optional">{t.jp_form_email_optional}</span>
        </label>
        <input
          id="jp-email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder={t.jp_form_email_ph}
        />
      </div>

      {/* row 4: district select */}
      <div className="jp-field">
        <label htmlFor="jp-district">{t.jp_form_district}</label>
        <div className="jp-select">
          <select
            id="jp-district"
            required
            value={form.district}
            onChange={(e) => set("district", e.target.value)}
          >
            <option value="" disabled>{t.jp_form_district_ph}</option>
            {KERALA_DISTRICTS.map((d, i) => {
              const label = lang === "ml" ? d.ml : d.en;
              const tag = d.pilot ? `  ★ ${t.jp_form_district_pilot_tag}` : "";
              return <option key={i} value={d.en}>{label}{tag}</option>;
            })}
          </select>
          <svg className="jp-select-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* row 5: local body — segmented type + body-name input */}
      <div className="jp-field">
        <label>{t.jp_form_body_type}</label>
        <div className="jp-segmented" role="tablist">
          {t.jp_form_body_types.map((label, i) => {
            const key = ["Panchayat", "Municipality", "Corporation"][i];
            const active = bodyTypeIndex === i;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                className={`jp-seg ${active ? "is-active" : ""}`}
                onClick={() => set("bodyType", key)}
              >{label}</button>
            );
          })}
        </div>
        <input
          className="jp-body-name"
          type="text"
          required
          value={form.bodyName}
          onChange={(e) => set("bodyName", e.target.value)}
          placeholder={bodyNamePlaceholder}
        />
      </div>

      <button type="submit" className="btn jp-submit" disabled={submitting}>
        {submitting ? t.jp_form_submitting : t.jp_form_submit}
        <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {submitError && (
        <div className="jp-error" role="alert" style={{ marginTop: -8 }}>{t.jp_form_submit_error}</div>
      )}

      <div className="jp-privacy">
        <span className="mono-up jp-privacy-label">{t.jp_privacy_label}</span>
        <span>{t.jp_privacy}</span>
      </div>
    </form>
  );
}

/* ── post-submit "share this" state ──────────────────────── */
function JoinDone({ payload }) {
  const t = useT();
  const [copied, setCopied] = useStateJP(false);

  const shareUrl = () => {
    const url = new URL(window.location.pathname, window.location.origin);
    return url.toString();
  };

  const onCopy = async () => {
    try { await navigator.clipboard.writeText(shareUrl()); }
    catch (e) {
      const ta = document.createElement("textarea");
      ta.value = shareUrl();
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (_) {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const greeting = payload && payload.name ? payload.name.split(/\s+/)[0] : null;

  return (
    <div className="jp-done">
      <div className="jp-done-eyebrow mono-up">{t.jp_done_eyebrow}</div>
      <h1 className="h-1 has-em jp-done-title" dangerouslySetInnerHTML={{ __html: t.jp_done_title_html }} />
      {greeting && <div className="jp-done-greeting serif-it">— {greeting}</div>}
      <p className="lead jp-done-lead">{t.jp_done_lead}</p>

      <div className="jp-done-share">
        <div className="eyebrow" style={{ marginBottom: 12 }}>{t.jp_done_share_h}</div>
        <div className="jp-done-url">{(typeof window !== "undefined") && shareUrl().replace(/^https?:\/\//, "")}</div>
        <button type="button" className="btn" onClick={onCopy}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2.5" y="2.5" width="8" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
          <span>{copied ? t.jp_done_share_done : t.jp_done_share_btn}</span>
        </button>
      </div>

      <a className="jp-done-back" href="index.html">{t.jp_done_back}</a>
    </div>
  );
}

/* ── page shell ───────────────────────────────────────────── */
function JoinPage() {
  const [lang, setLang] = useStateJP("en");
  const [done, setDone] = useStateJP(null);

  useEffectJP(() => {
    document.documentElement.classList.toggle("lang-ml", lang === "ml");
    document.documentElement.lang = lang;
  }, [lang]);

  /* Persist the EN accent (terra). The standalone page intentionally has no
     tweaks panel — we want the share target to look the same for everyone. */

  return (
    <LangContext.Provider value={lang}>
      <div className="jp-page">
        <header className="jp-topbar">
          <a className="jp-brand" href="index.html" aria-label="POD home">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="3.4" fill="currentColor"/>
            </svg>
            <span className="jp-brand-name serif">POD</span>
          </a>
          <span className="jp-topbar-label small">{(STRINGS[lang] || STRINGS.en).jp_back_label}</span>
          <JoinLangSwitch lang={lang} setLang={setLang} />
        </header>

        <main className="jp-main">
          {done ? (
            <JoinDone payload={done} />
          ) : (
            <JoinHero />
          )}
          {!done && <JoinForm onDone={setDone} />}
        </main>

        <footer className="jp-footer small">
          <a href="index.html">{(STRINGS[lang] || STRINGS.en).jp_back_btn}</a>
          <span>© 2026 POD</span>
        </footer>
      </div>
    </LangContext.Provider>
  );
}

function JoinHero() {
  const t = useT();
  return (
    <div className="jp-hero">
      <div className="eyebrow">{t.jp_eyebrow}</div>
      <h1 className="h-display has-em jp-hero-title" dangerouslySetInnerHTML={{ __html: t.jp_title_html }} />
      <p className="lead jp-hero-lead">{t.jp_lead}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<JoinPage />);
