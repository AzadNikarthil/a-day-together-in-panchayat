/* === POD — content & data === */

const PILLARS = [
  {
    num: "01",
    mal: "പൗര സഹായ കേന്ദ്രം",
    en:  "Poura-Sahaya Kendram",
    sub: "Citizen Support Center",
    replaces: "Police Station",
    becomes:  "Support Infrastructure",
    intro: "Moving from coercion to care. The state currently meets every dispute with the same instrument — what the proposal calls “the gun.” The Kendram replaces it with dialogue, mediation, and community-backed support.",
    points: [
      "Conflict de-escalation as a first point of contact, before grievances become criminal cases.",
      "Physical and psychological accessibility, integrated into daily ward life.",
      "Preventive — not punitive — intervention in neighbourly friction.",
      "Non-coercive resolution: removing the gun from the equation."
    ]
  },
  {
    num: "02",
    mal: "തർക്ക പരിഹാര കേന്ദ്രം",
    en:  "Tharkka Parihara Kendram",
    sub: "Dispute Resolution Center",
    replaces: "Court System",
    becomes:  "Restorative Justice",
    intro: "From litigation to reconciliation. A community-led mediation hub designed to resolve roughly 90% of local disputes without the financial and psychological trauma of formal courts.",
    points: [
      "Preventive mediation that intervenes early, before disagreements harden into legal cases.",
      "Community-led arbitration by respected, locally-elected individuals.",
      "Reconciliation over verdicts — no winners, no losers, both parties coexist.",
      "Non-permanent panels rotated by case to prevent accumulation of bias."
    ]
  },
  {
    num: "03",
    mal: "പൗരനിർമാണം",
    en:  "Pauranirmanam",
    sub: "Citizen-Building Education",
    replaces: "Colonial Schooling",
    becomes:  "Civic Practice",
    intro: "From job-seekers to active citizens. An educational model that teaches constitutional literacy, public behaviour, and real-world civic responsibility — the community, not the four-walled classroom, as the textbook.",
    points: [
      "Community-centric learning: local ecology and infrastructure as primary textbooks.",
      "Constitutional literacy and non-violent communication as core subjects.",
      "Critical inquiry over rote — observation, project-based, locally rooted.",
      "Democratising the home and school so children participate in shaping society."
    ]
  }
];

const ROADMAP = [
  {
    key: "01",
    year: "Year 1–2",
    title: "Foundation & Civic Literacy",
    items: [
      ["Establish presence.", " Open gatherings within the 9 AM – 9 PM window — in libraries, verandas, and bus stops."],
      ["Build the common knowledge base.", " Every interaction recorded, transcribed, and archived for replay."],
      ["Bridge the working citizen.", " Make governance approachable at any hour, on any schedule."]
    ],
    stat: "9 AM",
    statSub: "to 9 PM — when public life happens, in public space",
    side: "We are not asking the public to come to our office. We are bringing the practice of democracy to their doorstep."
  },
  {
    key: "02",
    year: "Year 2–3",
    title: "Institution Prototyping",
    items: [
      ["Active testing.", " The three institutions transition from theory to functional units in select wards."],
      ["Local governance audits.", " Move past the 10% quorum check-box toward meaningful community consensus."],
      ["Address colonial residue.", " Mediation, support, and dialogue prioritised over punishment in every case."]
    ],
    stat: "3",
    statSub: "live prototypes across pilot panchayats",
    side: "Each panchayat is treated as a lab. Failure is data — every setback recalibrates the model rather than ending it."
  },
  {
    key: "03",
    year: "Year 3–5",
    title: "Scaling & Network Integration",
    items: [
      ["Inter-district networking.", " Functional model expanded across Wayanad, Idukki, and Kasaragod."],
      ["Concept paper, validated.", " Accumulated data and mediation records compiled into a community-validated alternative."],
      ["Transition to self-sustenance.", " Initial organisers step back; trained local volunteers carry the model forward."]
    ],
    stat: "Pradeshiya",
    statSub: "Sarkar — local government, replacing top-down rule",
    side: "By the end of Year 5, a documented, validated system capable of reforming the traditional Panchayat Raj structure from below."
  }
];

/* ──────────────────────────────────────────────────────────────
   ARCHIVE — POD curates, doesn't store.
   Every entry is an index card pointing at content hosted on
   YouTube, Instagram, a news outlet, or a podcast feed.

   Schema:
     platform : "YOUTUBE" | "INSTAGRAM" | "PRESS" | "PODCAST"
     topic    : enum tag (see TOPIC_FILTERS)
     district : optional locale
     date     : human-readable
     title    : headline
     outlet   : where it lives (channel, handle, paper, show)
     duration : "1h 42m" · "REEL · 58s" · "5 min read"  (free-form)
     url      : canonical link to the source
     videoId  : YouTube id only — enables inline lite-embed
     quote    : optional editorial pull, omit when absent
   ────────────────────────────────────────────────────────────── */
/* `iso` is the canonical sort key — ISO date string. The displayed
   `date` stays a human-readable, localizable label. When iso is omitted
   the entry sorts to the end. */
const ARCHIVE = [
  {
    platform: "INSTAGRAM",
    topic: "GOVERNANCE",
    iso: "2026-05-21",
    date: "MAY 21, 2026",
    title: "A Day Together in Panchayat",
    outlet: "@a_day_together_in_panchayat",
    duration: "REEL",
    url: "https://www.instagram.com/reel/DYkgYC2v_5n/",
    quote: "#maitreyan #democracy #localgovernment #panchayat"
  },
  {
    platform: "YOUTUBE",
    topic: "GOVERNANCE",
    iso: "2026-05-20",
    date: "MAY 20, 2026",
    title: "സുപ്രീം കോടതിയല്ല, ജനങ്ങളാണ് സുപ്രീം | Maitreyan",
    outlet: "Kerala Freethinkers Forum (kftf)",
    duration: "5m 44s",
    url: "https://www.youtube.com/watch?v=UBO-8fkuzOA",
    videoId: "UBO-8fkuzOA"
  },
  {
    platform: "YOUTUBE",
    topic: "GOVERNANCE",
    iso: "2026-05-18",
    date: "MAY 18, 2026",
    title: "ജീവിതം, കുടുംബം, ജനാധിപത്യം. മൈത്രേയൻ പഞ്ചായത്തിൽ PART-2",
    outlet: "thaddesam",
    duration: "16m 50s",
    url: "https://www.youtube.com/watch?v=thkL8v_b-9s",
    videoId: "thkL8v_b-9s"
  },
  {
    platform: "YOUTUBE",
    topic: "GOVERNANCE",
    iso: "2026-05-15",
    date: "MAY 15, 2026",
    title: "Panchayat Discussions with Maitreyan — Part 2 (Thrissur · Laurie Baker Hall)",
    outlet: "A Day Together in Panchayat",
    duration: "28m 21s",
    url: "https://www.youtube.com/watch?v=DkAyvWZmJqI",
    videoId: "DkAyvWZmJqI"
  },
  {
    platform: "YOUTUBE",
    topic: "GOVERNANCE",
    iso: "2026-05-14",
    date: "MAY 14, 2026",
    title: "ജീവിതം, കുടുംബം, ജനാധിപത്യം — മൈത്രേയൻ പഞ്ചായത്തിൽ",
    outlet: "thaddesam",
    duration: "16m 41s",
    url: "https://www.youtube.com/watch?v=peaccHyTOxM",
    videoId: "peaccHyTOxM"
  },
  {
    platform: "YOUTUBE",
    topic: "GOVERNANCE",
    iso: "2026-05-13",
    date: "MAY 13, 2026",
    title: "മൈത്രേയൻ ജനങ്ങൾക്കടുത്തേക്ക്! എന്തിന്? — MaitreyanTalks 307",
    outlet: "L Bug Media",
    duration: "52m 39s",
    url: "https://www.youtube.com/watch?v=uokGoVk1Mh0",
    videoId: "uokGoVk1Mh0"
  },
  {
    platform: "YOUTUBE",
    topic: "GOVERNANCE",
    iso: "2026-05-12",
    date: "MAY 12, 2026",
    title: "യഥാർത്ഥ ജനകീയ പഞ്ചായത്ത് എങ്ങനെയാണിരിക്കണം? ഒരു പുതിയ ജനാധിപത്യ ആശയം",
    outlet: "A Day Together in Panchayat · Maitreyan",
    duration: "11m 16s",
    url: "https://www.youtube.com/watch?v=C34SnD3fqsY",
    videoId: "C34SnD3fqsY"
  },
  {
    platform: "FACEBOOK",
    topic: "GOVERNANCE",
    iso: "2026-05-08",
    date: "MAY 2026",
    title: "A Day Together in Panchayat",
    outlet: "Maitreyan",
    duration: "Video",
    url: "https://www.facebook.com/share/v/1B3wSL5DUk/",
    quote: "യഥാർത്ഥ ജനകീയ പഞ്ചായത്ത് എങ്ങനെയായിരിക്കണം?"
  }
];

const SOURCE_FILTERS = ["ALL", "YOUTUBE", "FACEBOOK", "INSTAGRAM", "PRESS", "PODCAST"];

const VOICES = [
  {
    q: "Students don’t even know what a Panchayat is. We need to teach basic civic sense long before they turn 18.",
    attr: "Teacher / Psychologist — Kasaragod"
  },
  {
    q: "If every problem is met with the same instrument, you only have one outcome. The work is to build new instruments.",
    attr: "Retired Officer — Idukki"
  },
  {
    q: "I came thinking this was a meeting. I left realising it was a practice — something I would have to do tomorrow, and the day after.",
    attr: "Coordinator — Wayanad"
  }
];

const FAQ = [
  {
    q: "Is this initiative trying to fix existing Panchayats, or build something new?",
    a: "The goal is not to repair a colonial-era structure designed for control. We are proposing a structural redesign — a parallel, citizen-centric system where community cooperation replaces bureaucratic control. We use the existing administrative unit to house genuinely democratic institutions, making the old, ineffective processes irrelevant by creating superior, community-managed alternatives."
  },
  {
    q: "How do you handle existing Panchayat laws?",
    a: "We practice pragmatic navigation. We do not aim for direct legislative confrontation. Instead, we let the new institutions — support centers, dispute resolution hubs, citizen-building education — accumulate enough proven results that they become the obvious choice. Legislative and administrative influence follows practice, not the other way around."
  },
  {
    q: "Will this actually work? Isn’t it too idealistic?",
    a: "Success is not measured by immediate government replacement, but by conviction. When neighbours begin resolving disputes locally, and when children develop Paurabodham (civic sense) as a practiced skill, the model proves its own practicality. The five-year prototype is the answer to the practicality question — we are demonstrating, ward by ward."
  },
  {
    q: "Who funds this? Is it tied to a political party?",
    a: "This is explicitly non-partisan. The work is done in public spaces by volunteers committing time rather than money. Documentation is shared as common knowledge, not branded content. Local units actively guard against political capture — if an idea cannot be replicated by a non-aligned citizen in another district, it does not belong in this framework."
  },
  {
    q: "How can I participate if I am not in Wayanad, Idukki, or Kasaragod?",
    a: "Two ways. First, use the archive — every recorded session is a manual for starting a similar conversation in your own ward. Second, register as a Co-Creator below; we will connect you with anyone in your district already organising, or help you become the first."
  }
];

const TOPIC_FILTERS = ["ALL", "GOVERNANCE", "EDUCATION", "POLICE", "CONFLICT"];

/* ──────────────────────────────────────────────────────────────
   Kerala districts (north → south numbering matches Govt. order).
   Pilot panchayats run in Wayanad, Idukki, Kasaragod — those rows
   carry pilot:true so the signup form can flag them visually.
   ────────────────────────────────────────────────────────────── */
const KERALA_DISTRICTS = [
  { en: "Thiruvananthapuram", ml: "തിരുവനന്തപുരം" },
  { en: "Kollam",             ml: "കൊല്ലം" },
  { en: "Pathanamthitta",     ml: "പത്തനംതിട്ട" },
  { en: "Alappuzha",          ml: "ആലപ്പുഴ" },
  { en: "Kottayam",           ml: "കോട്ടയം" },
  { en: "Idukki",             ml: "ഇടുക്കി",   pilot: true },
  { en: "Ernakulam",          ml: "എറണാകുളം" },
  { en: "Thrissur",           ml: "തൃശ്ശൂർ" },
  { en: "Palakkad",           ml: "പാലക്കാട്" },
  { en: "Malappuram",         ml: "മലപ്പുറം" },
  { en: "Kozhikode",          ml: "കോഴിക്കോട്" },
  { en: "Wayanad",            ml: "വയനാട്",    pilot: true },
  { en: "Kannur",             ml: "കണ്ണൂർ" },
  { en: "Kasaragod",          ml: "കാസർഗോഡ്",  pilot: true }
];

/* small reusable components */
const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>;

const SectionHead = ({ tag, title, lead, align = "left" }) => (
  <div style={{ maxWidth: align === "center" ? 820 : 760, margin: align === "center" ? "0 auto" : undefined, textAlign: align }}>
    <Eyebrow>{tag}</Eyebrow>
    <h2 className="h-1" style={{ margin: "14px 0 0" }}>{title}</h2>
    {lead && <p className="lead" style={{ margin: "20px 0 0", maxWidth: 640 }}>{lead}</p>}
  </div>
);

const Placeholder = ({ label, dim }) => (
  <div className="placeholder">
    {dim && <div className="dim">{dim}</div>}
    <div className="label">{label}</div>
  </div>
);

/* lang context + hooks */
const LangContext = React.createContext("en");
const useLang = () => React.useContext(LangContext);
const useT = () => STRINGS[useLang()] || STRINGS.en;

/* helper: a heading whose <em> spans get the terra-italic accent automatically */
const I18nSectionHead = ({ tagKey, titleKey, leadKey, align }) => {
  const t = useT();
  return (
    <div style={{ maxWidth: align === "center" ? 820 : 760, margin: align === "center" ? "0 auto" : undefined, textAlign: align }}>
      <Eyebrow>{t[tagKey]}</Eyebrow>
      <h2 className="h-1 has-em" style={{ margin: "14px 0 0" }} dangerouslySetInnerHTML={{ __html: t[titleKey] }} />
      {leadKey && t[leadKey] && <p className="lead" style={{ margin: "20px 0 0", maxWidth: 640 }}>{t[leadKey]}</p>}
    </div>
  );
};

Object.assign(window, {
  PILLARS, ROADMAP, ARCHIVE, VOICES, FAQ, TOPIC_FILTERS, SOURCE_FILTERS, KERALA_DISTRICTS,
  Eyebrow, SectionHead, Placeholder,
  LangContext, useLang, useT, I18nSectionHead
});
