import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { FindService } from "@/components/site/find-service";
import { AboutProject, Glossary, SafetyTips } from "@/components/site/info-sections";
import { ServiceGuide } from "@/components/site/service-guide";
import { SiteHeader } from "@/components/site/site-header";
import { DEFAULT_SERVICE, getService, type ServiceId } from "@/data/services";
import { usePreferences } from "@/hooks/use-preferences";
import { useSpeech } from "@/hooks/use-speech";

const TITLE = "Serviço Sem Fila — Guia de serviços públicos digitais";
const DESCRIPTION =
  "Passo a passo simples, com letra grande e leitura em voz alta, para acessar conta gov.br, RG, CPF, INSS, SUS, Cadastro Único e outros serviços públicos.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const navLinks = [
  { href: "#inicio", label: "Serviços" },
  { href: "#palavras", label: "Palavras difíceis" },
  { href: "#seguranca", label: "Evitar golpes" },
  { href: "#sobre", label: "Sobre o projeto" },
];

function Index() {
  const prefs = usePreferences();
  const speech = useSpeech();
  const [serviceId, setServiceId] = useState<ServiceId>(DEFAULT_SERVICE);
  const [progress, setProgress] = useState<Record<string, number[]>>({});
  const guideHeading = useRef<HTMLHeadingElement>(null);

  const service = getService(serviceId, prefs.city);
  const progressKey = service.local ? `${service.id}:${prefs.city}` : service.id;
  const doneSteps = progress[progressKey] ?? [];

  const pickService = (id: ServiceId) => {
    speech.stop();
    setServiceId(id);
    // Espera o React desenhar o novo guia e leva a pessoa até ele.
    requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document
        .getElementById("servico")
        ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      guideHeading.current?.focus({ preventScroll: true });
    });
  };

  const toggleStep = (index: number) =>
    setProgress((all) => {
      const current = all[progressKey] ?? [];
      const next = current.includes(index)
        ? current.filter((step) => step !== index)
        : [...current, index];
      return { ...all, [progressKey]: next };
    });

  const resetSteps = () => setProgress((all) => ({ ...all, [progressKey]: [] }));

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-xl bg-ink px-4 py-3 font-bold text-paper focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>

      <SiteHeader prefs={prefs} />

      <main
        id="conteudo"
        tabIndex={-1}
        className="mx-auto max-w-5xl space-y-14 px-4 py-6 outline-none sm:px-6 sm:py-10"
      >
        <FindService selectedId={service.id} onPick={pickService} />
        <ServiceGuide
          ref={guideHeading}
          service={service}
          city={prefs.city}
          onCityChange={prefs.setCity}
          doneSteps={doneSteps}
          onToggleStep={toggleStep}
          onReset={resetSteps}
          speech={speech}
        />
        <SafetyTips />
        <Glossary />
        <AboutProject />
      </main>

      <footer className="mt-6 bg-ink text-paper">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl font-extrabold">Serviço Sem Fila</p>
            <p className="mt-2 max-w-md text-base text-paper/80">
              Projeto de extensão universitária · Unoeste · Engenharia de Software · 2026. Da
              universidade para a comunidade.
            </p>
          </div>
          <nav aria-label="Atalhos do rodapé">
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-xl px-3 font-bold underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
