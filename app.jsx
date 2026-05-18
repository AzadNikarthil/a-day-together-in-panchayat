/* === POD — main app === */

const { useState: useStateApp, useRef: useRefApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c46b3c",
  "density": "comfortable"
}/*EDITMODE-END*/;

const ACCENT_TO_DEEP = {
  "#c46b3c": "#9b4f24", // terra
  "#3f7a55": "#2b5c3e", // forest
  "#4d4eb0": "#363884", // indigo
  "#c79a3a": "#9b7320", // ochre
};

function applyAccent(hex) {
  const root = document.documentElement;
  root.style.setProperty("--terra", hex);
  root.style.setProperty("--terra-deep", ACCENT_TO_DEEP[hex] || hex);
}

function applyDensity(d) {
  const root = document.documentElement;
  if (d === "compact")       root.style.setProperty("--section-y", "clamp(60px, 6vw, 96px)");
  else if (d === "spacious") root.style.setProperty("--section-y", "clamp(110px, 13vw, 200px)");
  else                       root.style.setProperty("--section-y", "clamp(80px, 9vw, 144px)");
}

function App() {
  const [lang, setLang] = useStateApp("en");
  const searchRef = useRefApp(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectApp(() => { applyAccent(t.accent); }, [t.accent]);
  useEffectApp(() => { applyDensity(t.density); }, [t.density]);
  useEffectApp(() => {
    document.documentElement.classList.toggle("lang-ml", lang === "ml");
    document.documentElement.lang = lang;
  }, [lang]);

  const focusSearch = () => {
    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => searchRef.current?.focus(), 700);
  };

  return (
    <LangContext.Provider value={lang}>
      <Nav lang={lang} setLang={setLang} onSearch={focusSearch} />
      <main>
        <Hero />
        <div className="rule-strong" />
        <Shift />
        <Pillars />
        <MethodologyClock />
        <Roadmap />
        <Archive searchRef={searchRef} />
        <Voices />
        <FAQList />
        <CoCreator />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent">
          <TweakColor
            label="Color"
            value={t.accent}
            options={["#c46b3c", "#3f7a55", "#4d4eb0", "#c79a3a"]}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={t.density}
            options={["compact", "comfortable", "spacious"]}
            onChange={(v) => setTweak("density", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
