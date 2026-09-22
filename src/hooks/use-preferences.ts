import { useEffect, useState } from "react";
import { DEFAULT_CITY, isCityId, type CityId } from "@/data/services";

/** Tamanhos de letra, em % do tamanho padrão do navegador. */
export const FONT_STEPS = [
  { value: 100, label: "Normal" },
  { value: 112.5, label: "Grande" },
  { value: 125, label: "Maior" },
  { value: 140, label: "Muito grande" },
] as const;

const DEFAULT_FONT_STEP = 1;
const fontStep = (index: number) => FONT_STEPS[index] ?? FONT_STEPS[DEFAULT_FONT_STEP];
const STORAGE_KEY = "servico-sem-fila:preferencias";

type Preferences = { fontStep: number; contrast: boolean; city: CityId };

function load(): Partial<Preferences> {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Partial<Preferences>;
  } catch {
    return {};
  }
}

/**
 * Preferências da pessoa (tamanho da letra, alto contraste e cidade).
 * Ficam salvas no navegador para a próxima visita.
 */
export function usePreferences() {
  const [prefs, setPrefs] = useState<Preferences>({
    fontStep: DEFAULT_FONT_STEP,
    contrast: false,
    city: DEFAULT_CITY,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = load();
    setPrefs((current) => ({
      fontStep:
        typeof saved.fontStep === "number" && FONT_STEPS[saved.fontStep]
          ? saved.fontStep
          : current.fontStep,
      contrast: saved.contrast === true,
      city: isCityId(saved.city) ? saved.city : current.city,
    }));
    setLoaded(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontStep(prefs.fontStep).value}%`;
    root.classList.toggle("contrast", prefs.contrast);
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* navegador sem armazenamento: as preferências valem só nesta visita */
    }
  }, [prefs, loaded]);

  return {
    ...prefs,
    fontLabel: fontStep(prefs.fontStep).label,
    canShrink: prefs.fontStep > 0,
    canGrow: prefs.fontStep < FONT_STEPS.length - 1,
    shrink: () => setPrefs((p) => ({ ...p, fontStep: Math.max(0, p.fontStep - 1) })),
    grow: () =>
      setPrefs((p) => ({ ...p, fontStep: Math.min(FONT_STEPS.length - 1, p.fontStep + 1) })),
    toggleContrast: () => setPrefs((p) => ({ ...p, contrast: !p.contrast })),
    setCity: (city: CityId) => setPrefs((p) => ({ ...p, city })),
  };
}
