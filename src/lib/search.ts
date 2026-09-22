import { services, type ServiceId } from "@/data/services";

/** Minúsculas e sem acento: "Aposentadoria" e "aposentadória" viram a mesma coisa. */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // tira os acentos
    .toLowerCase()
    .replace(/[^a-z0-9.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = new Set(
  "de do da dos das meu minha o a e um uma para pra com que quero preciso como".split(" "),
);

/**
 * Encontra o serviço que mais combina com o que a pessoa escreveu,
 * do jeito dela (ex.: "quero me aposentar", "perdi a identidade").
 */
export function findService(query: string): ServiceId | null {
  const text = normalize(query);
  if (!text) return null;
  const words = text.split(" ").filter((word) => word.length > 1 && !STOP_WORDS.has(word));

  let best: { id: ServiceId; score: number } | null = null;

  for (const service of services) {
    const terms = [...service.keywords, normalize(service.title)];
    let score = 0;
    for (const term of terms) {
      if (term.includes(" ") ? text.includes(term) : words.includes(term)) score += 3;
      else if (
        words.some((word) => word.length > 3 && (term.startsWith(word) || word.startsWith(term)))
      )
        score += 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { id: service.id, score };
  }

  return best?.id ?? null;
}
