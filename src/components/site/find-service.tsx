import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { services, type ServiceId } from "@/data/services";
import { findService } from "@/lib/search";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type Props = { selectedId: ServiceId; onPick: (id: ServiceId) => void };

/** Topo da página: busca "do seu jeito", perguntas comuns e a lista de serviços. */
export function FindService({ selectedId, onPick }: Props) {
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    const id = findService(query);
    setNotFound(!id);
    if (id) onPick(id);
  };

  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="scroll-mt-4">
      <div className="rounded-[2rem] bg-ink px-5 py-8 text-paper sm:px-10 sm:py-12">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-sun">
          Guia gratuito e sem cadastro
        </p>
        <h1
          id="inicio-titulo"
          className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl"
        >
          Resolva seus documentos e benefícios pela internet, com calma.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-paper/85">
          Explicamos cada serviço com palavras simples, um passo de cada vez. Você também pode ouvir
          as explicações.
        </p>

        <form
          onSubmit={submit}
          className="mt-8 rounded-3xl bg-paper p-3 text-ink sm:p-4"
          role="search"
        >
          <label htmlFor="busca" className="block px-2 pb-2 font-display text-xl font-bold">
            O que você precisa hoje?
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-6 -translate-y-1/2 text-ink-soft"
                aria-hidden="true"
              />
              <input
                id="busca"
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setNotFound(false);
                }}
                placeholder="Escreva do seu jeito. Ex.: perdi meu RG"
                autoComplete="off"
                aria-describedby="busca-ajuda"
                className="min-h-14 w-full rounded-2xl bg-canvas pl-13 pr-4 text-lg ring-2 ring-ink/15 placeholder:text-ink-soft focus:ring-ink"
              />
            </div>
            <Button type="submit" variant="primary" className="min-h-14 px-8 text-lg">
              Procurar
            </Button>
          </div>
          <p
            id="busca-ajuda"
            role="status"
            className={cn(
              "px-2 pt-3 text-base",
              notFound ? "font-bold text-coral-strong" : "text-ink-soft",
            )}
          >
            {notFound
              ? "Não encontramos. Tente outras palavras ou escolha um dos serviços abaixo."
              : "Você também pode tocar em uma das perguntas abaixo."}
          </p>
        </form>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Perguntas comuns">
          {services.map((service) => (
            <li key={service.id}>
              <button
                type="button"
                onClick={() => onPick(service.id)}
                className="min-h-11 rounded-full bg-paper/10 px-4 py-2 text-left font-semibold text-paper ring-1 ring-paper/25 transition-colors hover:bg-paper/20"
              >
                “{service.question}”
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-3xl font-extrabold">Ou escolha um serviço</h2>
        <p className="mt-1 text-lg text-ink-soft">Toque no cartão para ver o passo a passo.</p>
        <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            const selected = service.id === selectedId;
            return (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => onPick(service.id)}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "flex h-full w-full flex-col items-start gap-2 rounded-3xl p-4 text-left transition-all sm:gap-3 sm:p-5",
                    selected
                      ? "bg-sun ring-4 ring-ink"
                      : "bg-paper ring-1 ring-ink/12 hover:-translate-y-0.5 hover:ring-2 hover:ring-ink/40",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl",
                      selected ? "bg-ink text-sun" : "bg-canvas text-ink",
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-base font-bold leading-tight sm:text-lg">
                    {service.title}
                  </span>
                  <span
                    className={cn(
                      "text-sm leading-snug sm:text-base",
                      selected ? "text-ink" : "text-ink-soft",
                    )}
                  >
                    {service.summary}
                  </span>
                  {service.id === "govbr" && (
                    <span className="mt-auto rounded-full bg-coral px-3 py-1 text-sm font-bold text-paper">
                      Comece por aqui
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
