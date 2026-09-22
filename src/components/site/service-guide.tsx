import {
  ArrowUp,
  Check,
  CircleCheck,
  ExternalLink,
  FolderOpen,
  Footprints,
  MapPin,
  RotateCcw,
  Square,
  Volume2,
} from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { cityForMap, cityLabel, type CityId, type Service } from "@/data/services";
import type { useSpeech } from "@/hooks/use-speech";
import { cn } from "@/lib/utils";
import { Button, ExternalButton } from "./button";
import { CitySelect } from "./site-header";

type Props = {
  service: Service;
  city: CityId;
  onCityChange: (city: CityId) => void;
  doneSteps: number[];
  onToggleStep: (index: number) => void;
  onReset: () => void;
  speech: ReturnType<typeof useSpeech>;
};

function fullText(service: Service) {
  return [
    service.title,
    service.note,
    `Tenha em mãos: ${service.documents.join(", ")}.`,
    ...service.steps.map((step, index) => `Passo ${index + 1}: ${step}`),
  ].join(" ");
}

function mapUrl(service: Service, city: CityId) {
  const place = `${service.place?.mapQuery ?? ""} ${cityForMap(city)}`.trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
}

/** O guia do serviço escolhido: documentos, passos, onde ir e site oficial. */
export const ServiceGuide = forwardRef<HTMLHeadingElement, Props>(function ServiceGuide(
  { service, city, onCityChange, doneSteps, onToggleStep, onReset, speech },
  headingRef,
) {
  const Icon = service.icon;
  const total = service.steps.length;
  const doneCount = doneSteps.length;
  const finished = doneCount === total;
  const currentStep = service.steps.findIndex((_, index) => !doneSteps.includes(index));
  const readingAll = speech.speakingId === `${service.id}:tudo`;

  return (
    <section id="servico" aria-labelledby="servico-titulo" className="scroll-mt-4 space-y-5">
      {/* Cabeçalho do guia */}
      <div className="rounded-[2rem] bg-paper p-6 ring-1 ring-ink/12 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sun px-3 py-1 font-display text-sm font-bold text-ink">
            {service.category}
          </span>
          {service.local ? (
            <label className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink-soft">
              <span>Regras de</span>
              <CitySelect value={city} onChange={onCityChange} className="min-h-9 text-sm" />
            </label>
          ) : (
            <span className="rounded-full bg-canvas px-3 py-1 text-sm font-bold text-ink-soft">
              Vale para todo o Brasil
            </span>
          )}
        </div>

        <div className="mt-5 flex items-start gap-4">
          <span
            className="hidden size-16 shrink-0 place-items-center rounded-3xl bg-ink text-sun sm:grid"
            aria-hidden="true"
          >
            <Icon className="size-8" />
          </span>
          <div className="min-w-0">
            <h2
              id="servico-titulo"
              ref={headingRef}
              tabIndex={-1}
              className="outline-none font-display text-3xl font-extrabold leading-tight sm:text-4xl"
            >
              {service.title}
            </h2>
            <p className="mt-2 max-w-2xl text-lg">{service.note}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-base font-bold">
            Seu progresso: {doneCount} de {total} passos feitos
          </p>
          <div
            className="mt-2 h-4 overflow-hidden rounded-full bg-canvas ring-1 ring-ink/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={doneCount}
            aria-label="Passos feitos"
          >
            <div
              className="h-full rounded-full bg-success transition-[width] duration-500"
              style={{ width: `${(doneCount / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {speech.supported && (
            <Button
              variant="dark"
              onClick={() => speech.speak(`${service.id}:tudo`, fullText(service))}
              aria-pressed={readingAll}
            >
              {readingAll ? <Square aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
              {readingAll ? "Parar a leitura" : "Ouvir a explicação"}
            </Button>
          )}
          <ExternalButton href={service.url} variant="light">
            {service.site}
            <ExternalLink aria-hidden="true" />
          </ExternalButton>
        </div>
      </div>

      {/* 1. Documentos */}
      <Block
        number={1}
        icon={<FolderOpen aria-hidden="true" />}
        title="Antes de começar, tenha em mãos"
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {service.documents.map((document) => (
            <li
              key={document}
              className="flex items-center gap-3 rounded-2xl bg-canvas px-4 py-4 text-lg font-semibold"
            >
              <Check className="size-6 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
              {document}
            </li>
          ))}
        </ul>
      </Block>

      {/* 2. Passos */}
      <Block number={2} icon={<Footprints aria-hidden="true" />} title="Faça um passo de cada vez">
        <p className="-mt-2 mb-4 text-base text-ink-soft">
          Quando terminar um passo, toque em “Já fiz este passo”.
        </p>
        <ol className="space-y-4">
          {service.steps.map((step, index) => {
            const done = doneSteps.includes(index);
            const current = index === currentStep;
            const speechId = `${service.id}:passo-${index}`;
            const reading = speech.speakingId === speechId;
            return (
              <li
                key={step}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "rounded-3xl p-4 transition-colors sm:p-5",
                  done && "bg-success/10 ring-2 ring-success",
                  current && "bg-sun/25 ring-4 ring-sun",
                  !done && !current && "bg-canvas",
                )}
              >
                {current && (
                  <p className="mb-3 inline-block rounded-full bg-ink px-3 py-1 text-sm font-bold text-paper">
                    Você está aqui
                  </p>
                )}
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-2xl font-display text-2xl font-extrabold sm:size-14 sm:text-3xl",
                      done ? "bg-success text-paper" : "bg-ink text-paper",
                    )}
                    aria-hidden="true"
                  >
                    {done ? <Check className="size-7" strokeWidth={3} /> : index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-semibold">
                      <span className="sr-only">
                        Passo {index + 1}
                        {done ? ", feito" : ""}:{" "}
                      </span>
                      {step}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        variant={done ? "success" : "light"}
                        onClick={() => onToggleStep(index)}
                        aria-pressed={done}
                        className="min-h-11 px-4 text-base"
                      >
                        {done ? <CircleCheck aria-hidden="true" /> : <Check aria-hidden="true" />}
                        {done ? "Feito! (desfazer)" : "Já fiz este passo"}
                      </Button>
                      {speech.supported && (
                        <Button
                          variant="light"
                          onClick={() => speech.speak(speechId, `Passo ${index + 1}. ${step}`)}
                          aria-pressed={reading}
                          className="min-h-11 px-4 text-base"
                        >
                          {reading ? <Square aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
                          {reading ? "Parar" : "Ouvir"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {finished && (
          <div
            className="mt-5 flex flex-col gap-4 rounded-3xl bg-success p-5 text-paper sm:flex-row sm:items-center"
            role="status"
          >
            <CircleCheck className="size-10 shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <p className="font-display text-2xl font-bold">Muito bem! Você terminou.</p>
              <p className="text-lg">
                Guarde o número do protocolo ou o comprovante, se aparecer algum.
              </p>
            </div>
            <Button variant="ghost" onClick={onReset} className="bg-paper/15">
              <RotateCcw aria-hidden="true" />
              Recomeçar
            </Button>
          </div>
        )}
      </Block>

      {/* 3. Onde fazer */}
      <Block number={3} icon={<MapPin aria-hidden="true" />} title="Precisa ir pessoalmente?">
        {service.place ? (
          <div className="flex flex-col gap-4 rounded-2xl bg-canvas p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg">
              Procure: <strong>{service.place.name}</strong>
              <span className="block text-base text-ink-soft">
                {cityLabel(city)}. O mapa mostra o endereço e como chegar.
              </span>
            </p>
            <ExternalButton href={mapUrl(service, city)} variant="dark">
              <MapPin aria-hidden="true" />
              Ver no mapa
            </ExternalButton>
          </div>
        ) : (
          <p className="rounded-2xl bg-canvas p-4 text-lg">
            Não. Este serviço pode ser feito todo pelo celular ou computador.
          </p>
        )}
        <p className="mt-4 text-base text-ink-soft">
          O botão “{service.site}” leva você ao site oficial do governo. Confira se o endereço
          termina em <strong>.gov.br</strong>.
        </p>
      </Block>

      <a
        href="#inicio"
        className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-paper font-display text-lg font-bold ring-2 ring-ink/20 hover:bg-sun/30"
      >
        <ArrowUp className="size-5" aria-hidden="true" />
        Escolher outro serviço
      </a>
    </section>
  );
});

function Block({
  number,
  icon,
  title,
  children,
}: {
  number: number;
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const id = `bloco-${number}`;
  return (
    <section aria-labelledby={id} className="rounded-[2rem] bg-paper p-6 ring-1 ring-ink/12 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sun text-ink [&_svg]:size-6">
          {icon}
        </span>
        <h3 id={id} className="font-display text-2xl font-bold leading-tight">
          <span className="text-ink-soft">{number}.</span> {title}
        </h3>
      </div>
      {children}
    </section>
  );
}
