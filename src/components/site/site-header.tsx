import { Contrast, MapPin, Minus, Plus } from "lucide-react";
import { citiesByState, type CityId } from "@/data/services";
import type { usePreferences } from "@/hooks/use-preferences";
import { cn } from "@/lib/utils";

type Props = { prefs: ReturnType<typeof usePreferences> };

const toolClass =
  "flex min-h-12 items-center justify-between gap-2 rounded-2xl bg-paper px-2 ring-1 ring-ink/15 sm:justify-start";
const toolLabel = "pl-1 text-sm font-bold text-ink-soft";
const iconButton =
  "grid size-10 place-items-center rounded-xl bg-canvas text-ink transition-colors hover:bg-sun/40 disabled:cursor-not-allowed disabled:opacity-35 [&_svg]:size-5";

export function SiteHeader({ prefs }: Props) {
  return (
    <header className="border-b border-ink/10 bg-paper/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <a
          href="#inicio"
          className="flex items-center gap-3 rounded-2xl"
          aria-label="Serviço Sem Fila, voltar ao início"
        >
          <span
            className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink font-display text-2xl font-extrabold text-sun"
            aria-hidden="true"
          >
            S
          </span>
          <span>
            <span className="block font-display text-2xl font-extrabold leading-none">
              Serviço Sem Fila
            </span>
            <span className="mt-1 block text-sm text-ink-soft">
              Serviços públicos explicados passo a passo
            </span>
          </span>
        </a>

        <div
          className="grid gap-2 sm:flex sm:flex-wrap sm:items-center lg:justify-end"
          aria-label="Ajustes de leitura"
          role="group"
        >
          <div className={toolClass} role="group" aria-label="Tamanho da letra">
            <span className={toolLabel} aria-hidden="true">
              Letra
            </span>
            <button
              type="button"
              className={iconButton}
              onClick={prefs.shrink}
              disabled={!prefs.canShrink}
              aria-label="Diminuir a letra"
            >
              <Minus aria-hidden="true" />
            </button>
            <span
              className="min-w-[5.5rem] flex-1 text-center text-sm font-bold sm:flex-none"
              aria-live="polite"
            >
              {prefs.fontLabel}
            </span>
            <button
              type="button"
              className={iconButton}
              onClick={prefs.grow}
              disabled={!prefs.canGrow}
              aria-label="Aumentar a letra"
            >
              <Plus aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={prefs.toggleContrast}
            aria-pressed={prefs.contrast}
            className={cn(
              toolClass,
              "justify-center px-4 font-bold transition-colors sm:justify-start",
              prefs.contrast ? "bg-ink text-paper" : "hover:bg-sun/30",
            )}
          >
            <Contrast className="size-5" aria-hidden="true" />
            <span className="text-sm">Alto contraste</span>
          </button>

          <label className={cn(toolClass, "pr-1")}>
            <MapPin className="ml-1 size-5 text-coral" aria-hidden="true" />
            <span className={cn(toolLabel, "pl-0")}>Cidade</span>
            <CitySelect
              value={prefs.city}
              onChange={prefs.setCity}
              className="min-w-0 flex-1 sm:flex-none"
            />
          </label>
        </div>
      </div>
    </header>
  );
}

export function CitySelect({
  value,
  onChange,
  className,
}: {
  value: CityId;
  onChange: (city: CityId) => void;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as CityId)}
      className={cn(
        "min-h-10 cursor-pointer rounded-xl bg-sun/35 px-3 font-display font-bold text-ink",
        className,
      )}
    >
      {citiesByState.map((group) => (
        <optgroup key={group.state} label={group.label}>
          {group.cities.map((city) => (
            <option key={city.id} value={city.id}>
              {group.state === "BR" ? city.name : `${city.name} (${group.state})`}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
