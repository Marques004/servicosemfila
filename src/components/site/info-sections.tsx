import {
  BookOpen,
  ChevronDown,
  Compass,
  GraduationCap,
  Info,
  Megaphone,
  ShieldAlert,
  Signpost,
  Waypoints,
} from "lucide-react";
import type { ReactNode } from "react";
import { glossary, safetyTips } from "@/data/services";

/** "Palavras difíceis": explica os termos que aparecem nos sites do governo. */
export function Glossary() {
  return (
    <section id="palavras" aria-labelledby="palavras-titulo" className="scroll-mt-4">
      <SectionTitle
        id="palavras-titulo"
        icon={<BookOpen aria-hidden="true" />}
        title="Palavras difíceis, explicadas"
      >
        Viu uma palavra que não conhece? Toque nela para ver o que significa.
      </SectionTitle>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {glossary.map((item) => (
          <details
            key={item.term}
            className="group rounded-2xl bg-paper ring-1 ring-ink/12 open:ring-2 open:ring-ink"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-3 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
              {item.term}
              <ChevronDown
                className="size-6 shrink-0 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="px-5 pb-5 text-lg">{item.meaning}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Dicas contra golpes: uma das maiores inseguranças do público do projeto. */
export function SafetyTips() {
  return (
    <section
      id="seguranca"
      aria-labelledby="seguranca-titulo"
      className="scroll-mt-4 rounded-[2rem] bg-sun p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-sun">
          <ShieldAlert className="size-7" aria-hidden="true" />
        </span>
        <h2 id="seguranca-titulo" className="font-display text-3xl font-extrabold leading-tight">
          Proteja-se de golpes
        </h2>
      </div>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {safetyTips.map((tip) => (
          <li key={tip} className="rounded-2xl bg-paper/80 p-4 text-lg font-semibold">
            {tip}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-lg">
        Ficou em dúvida? <strong>Peça ajuda a alguém de confiança</strong> ou vá pessoalmente ao
        atendimento oficial.
      </p>
    </section>
  );
}

const pillars = [
  { icon: Compass, title: "Orientar", text: "Mostrar o caminho certo para cada serviço." },
  { icon: Waypoints, title: "Organizar", text: "Separar documentos e passos em ordem." },
  { icon: Megaphone, title: "Informar", text: "Explicar com palavras simples e em áudio." },
  { icon: Signpost, title: "Direcionar", text: "Levar ao site ou ao local oficial." },
];

/** Sobre o projeto de extensão (Unoeste). */
export function AboutProject() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="scroll-mt-4">
      <SectionTitle
        id="sobre-titulo"
        icon={<GraduationCap aria-hidden="true" />}
        title="Sobre este projeto"
      >
        O Serviço Sem Fila é um projeto de extensão de alunos de Engenharia de Software da Unoeste.
        Ele foi feito para ajudar pessoas idosas e famílias de baixa renda a usar os serviços
        públicos pela internet.
      </SectionTitle>
      <ul className="mt-5 grid gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ icon: Icon, title, text }) => (
          <li key={title} className="rounded-3xl bg-paper p-5 ring-1 ring-ink/12">
            <Icon className="size-8 text-coral" aria-hidden="true" />
            <p className="mt-3 font-display text-xl font-bold">{title}</p>
            <p className="mt-1 text-base text-ink-soft">{text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 flex items-start gap-3 rounded-2xl bg-paper p-5 text-lg ring-2 ring-ink">
        <Info className="mt-1 size-6 shrink-0" aria-hidden="true" />
        <span>
          <strong>Importante:</strong> este site é um guia e{" "}
          <strong>não substitui os canais oficiais</strong>. Nós não pedimos seus dados. As
          informações podem mudar, então confira sempre no site oficial do governo.
        </span>
      </p>
    </section>
  );
}

function SectionTitle({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-sun [&_svg]:size-7">
          {icon}
        </span>
        <h2 id={id} className="font-display text-3xl font-extrabold leading-tight">
          {title}
        </h2>
      </div>
      <p className="mt-3 max-w-3xl text-lg text-ink-soft">{children}</p>
    </div>
  );
}
