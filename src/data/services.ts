/**
 * Conteúdo do site: estados, cidades, serviços e glossário.
 *
 * - Adicionar uma cidade: inclua uma linha em `cities` (nome + sigla do estado).
 *   Se o estado ainda não existir, inclua-o também em `rgByState`.
 * - Adicionar um serviço: inclua um novo item em `serviceList`.
 */
import {
  BriefcaseBusiness,
  FileText,
  HandCoins,
  HeartPulse,
  House,
  IdCard,
  KeyRound,
  Vote,
  type LucideIcon,
} from "lucide-react";

/** Onde o serviço é feito pessoalmente. Vira um link "Ver no mapa". */
export type Place = { name: string; mapQuery: string };

export type Guide = {
  /** Frase curta explicando o serviço. */
  note: string;
  /** O que a pessoa precisa ter em mãos. */
  documents: string[];
  /** Passos, na ordem em que devem ser feitos. */
  steps: string[];
  /** Site oficial. */
  url: string;
  /** Texto do botão do site oficial. */
  site: string;
  place?: Place;
};

/* ------------------------------------------------------------------ */
/* Estados: o RG (Carteira de Identidade Nacional) é feito pelo estado */
/* ------------------------------------------------------------------ */

export type StateId = "SP" | "MG" | "SC" | "RJ" | "PR" | "MS" | "BR";

export const stateNames: Record<StateId, string> = {
  SP: "São Paulo",
  MG: "Minas Gerais",
  SC: "Santa Catarina",
  RJ: "Rio de Janeiro",
  PR: "Paraná",
  MS: "Mato Grosso do Sul",
  BR: "Outros lugares",
};

/** "Em Marília", mas "No Rio de Janeiro". */
const inCity = (city: string) => (city === "Rio de Janeiro" ? "No Rio de Janeiro" : `Em ${city}`);

const RG_DOCUMENTS = ["Certidão de nascimento ou de casamento", "CPF", "RG antigo, se tiver"];

/** Passo a passo do RG em cada estado. `city` é o nome da cidade escolhida. */
const rgByState: Record<StateId, (city: string) => Guide> = {
  SP: (city) => ({
    note: `${inCity(city)}, a carteira de identidade é feita pelo Poupatempo. A primeira via é gratuita.`,
    documents: RG_DOCUMENTS,
    steps: [
      "Entre no site do Poupatempo ou abra o aplicativo Poupatempo Digital.",
      `Escolha “Carteira de Identidade” e marque um horário no posto mais perto de ${city}.`,
      "No dia marcado, vá ao posto com seus documentos originais.",
    ],
    url: "https://www.poupatempo.sp.gov.br",
    site: "Abrir o Poupatempo",
    place: { name: "Poupatempo", mapQuery: "Poupatempo" },
  }),
  MG: (city) => ({
    note: `${inCity(city)}, a Carteira de Identidade Nacional é feita pela Polícia Civil, nas unidades UAI. A primeira via é gratuita.`,
    documents: RG_DOCUMENTS,
    steps: [
      "Entre no Portal MG com sua conta gov.br.",
      "Procure “Obter Carteira de Identidade Nacional” e marque um horário na UAI mais perto.",
      "No dia marcado, vá à UAI com seus documentos originais.",
    ],
    url: "https://www.mg.gov.br/servico/obter-carteira-de-identidade-nacional",
    site: "Abrir o Portal MG",
    place: { name: "UAI (Unidade de Atendimento Integrado)", mapQuery: "UAI" },
  }),
  SC: (city) => ({
    note: `${inCity(city)}, a identidade é feita pela Polícia Científica de Santa Catarina. A primeira via é gratuita.`,
    documents: RG_DOCUMENTS,
    steps: [
      "Entre no site da Polícia Científica de Santa Catarina.",
      "Toque em “Carteira de Identidade” e depois em “Agendamento”.",
      `Escolha ${city}, marque o horário e vá no dia com seus documentos.`,
    ],
    url: "https://www.policiacientifica.sc.gov.br/carteira-de-identidade/",
    site: "Abrir a Polícia Científica",
    place: { name: "Posto de identificação", mapQuery: "Polícia Científica identificação" },
  }),
  RJ: (city) => ({
    note: `${inCity(city)}, a carteira de identidade é feita pelo Detran-RJ, com agendamento. A primeira via é gratuita.`,
    documents: RG_DOCUMENTS,
    steps: [
      "Entre no site do Detran-RJ e procure “Carteira de Identidade”.",
      "Toque em “Agendamento” e escolha o posto mais perto de você.",
      "No dia marcado, vá ao posto com seus documentos originais.",
    ],
    url: "https://www.detran.rj.gov.br/todos-os-agendamentos/agendamento-dic/carteira-de-identidade-civil.html",
    site: "Abrir o Detran-RJ",
    place: { name: "Posto de identificação do Detran", mapQuery: "Detran identificação civil" },
  }),
  PR: (city) => ({
    note: `${inCity(city)}, a carteira de identidade é feita pela Polícia Civil do Paraná (Instituto de Identificação). A primeira via é gratuita.`,
    documents: RG_DOCUMENTS,
    steps: [
      "Entre no site da Polícia Civil do Paraná e procure “Carteira de Identidade Nacional”.",
      `Faça o pedido e marque um horário no posto mais perto de ${city}.`,
      "No dia marcado, vá ao posto com seus documentos originais.",
    ],
    url: "https://www.policiacivil.pr.gov.br/Pagina/SOLICITAR-CARTEIRA-DE-IDENTIDADE-NACIONAL",
    site: "Abrir a Polícia Civil do PR",
    place: { name: "Posto de identificação", mapQuery: "Instituto de Identificação" },
  }),
  MS: (city) => ({
    note: `${inCity(city)}, a carteira de identidade é feita pelo Instituto de Identificação do estado, com agendamento. A primeira via é gratuita.`,
    documents: RG_DOCUMENTS,
    steps: [
      "Entre no site da Secretaria de Segurança (Sejusp) e procure “Carteira de Identidade”.",
      `Marque um horário no posto mais perto de ${city}.`,
      "No dia marcado, vá ao posto com seus documentos originais.",
    ],
    url: "https://www.sejusp.ms.gov.br/carteira-de-identidade/",
    site: "Abrir o site da Sejusp",
    place: { name: "Posto de identificação", mapQuery: "Instituto de Identificação" },
  }),
  BR: () => ({
    note: "Cada estado tem o seu órgão que faz a carteira de identidade. A primeira via é gratuita em todo o Brasil.",
    documents: RG_DOCUMENTS,
    steps: [
      "Abra o site do governo e veja qual órgão faz a identidade no seu estado.",
      "No site desse órgão, marque um horário no posto mais perto de você.",
      "No dia marcado, vá ao posto com seus documentos originais.",
    ],
    url: "https://www.gov.br/governodigital/pt-br/identidade/identificacao-do-cidadao-e-carteira-de-identidade-nacional",
    site: "Abrir o site do governo",
    place: {
      name: "Posto de identificação",
      mapQuery: "posto de identificação carteira de identidade",
    },
  }),
};

/* ------------------------------------------------------------------ */
/* Cidades                                                             */
/* ------------------------------------------------------------------ */

export const cities = {
  // São Paulo (região da Unoeste primeiro)
  prudente: { name: "Presidente Prudente", state: "SP" },
  "alvares-machado": { name: "Álvares Machado", state: "SP" },
  "presidente-epitacio": { name: "Presidente Epitácio", state: "SP" },
  "presidente-venceslau": { name: "Presidente Venceslau", state: "SP" },
  assis: { name: "Assis", state: "SP" },
  marilia: { name: "Marília", state: "SP" },
  aracatuba: { name: "Araçatuba", state: "SP" },
  bauru: { name: "Bauru", state: "SP" },
  "rio-preto": { name: "São José do Rio Preto", state: "SP" },
  "ribeirao-preto": { name: "Ribeirão Preto", state: "SP" },
  campinas: { name: "Campinas", state: "SP" },
  sorocaba: { name: "Sorocaba", state: "SP" },
  "sao-paulo": { name: "São Paulo", state: "SP" },
  "sao-jose-dos-campos": { name: "São José dos Campos", state: "SP" },
  santos: { name: "Santos", state: "SP" },
  guaruja: { name: "Guarujá", state: "SP" },
  // Minas Gerais
  bh: { name: "Belo Horizonte", state: "MG" },
  contagem: { name: "Contagem", state: "MG" },
  uberlandia: { name: "Uberlândia", state: "MG" },
  "juiz-de-fora": { name: "Juiz de Fora", state: "MG" },
  "montes-claros": { name: "Montes Claros", state: "MG" },
  // Santa Catarina
  bc: { name: "Balneário Camboriú", state: "SC" },
  florianopolis: { name: "Florianópolis", state: "SC" },
  joinville: { name: "Joinville", state: "SC" },
  blumenau: { name: "Blumenau", state: "SC" },
  itajai: { name: "Itajaí", state: "SC" },
  // Rio de Janeiro
  rio: { name: "Rio de Janeiro", state: "RJ" },
  niteroi: { name: "Niterói", state: "RJ" },
  "duque-de-caxias": { name: "Duque de Caxias", state: "RJ" },
  "nova-iguacu": { name: "Nova Iguaçu", state: "RJ" },
  // Paraná
  curitiba: { name: "Curitiba", state: "PR" },
  londrina: { name: "Londrina", state: "PR" },
  maringa: { name: "Maringá", state: "PR" },
  "foz-do-iguacu": { name: "Foz do Iguaçu", state: "PR" },
  // Mato Grosso do Sul
  "campo-grande": { name: "Campo Grande", state: "MS" },
  dourados: { name: "Dourados", state: "MS" },
  "tres-lagoas": { name: "Três Lagoas", state: "MS" },
  // Qualquer outro lugar
  outra: { name: "Outra cidade", state: "BR" },
} as const satisfies Record<string, { name: string; state: StateId }>;

export type CityId = keyof typeof cities;
export const DEFAULT_CITY: CityId = "prudente";

export function isCityId(value: unknown): value is CityId {
  return typeof value === "string" && value in cities;
}

/** Cidades agrupadas por estado, na ordem de `stateNames` (para a lista de escolha). */
export const citiesByState = (Object.keys(stateNames) as StateId[]).map((state) => ({
  state,
  label: stateNames[state],
  cities: (Object.keys(cities) as CityId[])
    .filter((id) => cities[id].state === state)
    .map((id) => ({ id, name: cities[id].name })),
}));

/** Texto usado na busca do mapa, ex.: "CRAS Marília SP". Em "Outra cidade", busca perto da pessoa. */
export function cityForMap(city: CityId): string {
  const { name, state } = cities[city];
  return state === "BR" ? "perto de mim" : `${name} ${state}`;
}

/** Nome para mostrar em frases, ex.: "Em Marília (SP)". */
export function cityLabel(city: CityId): string {
  const { name, state } = cities[city];
  return state === "BR" ? "Perto de você" : `${inCity(name)} (${state})`;
}

export type Service = Guide & {
  id: string;
  title: string;
  /** Explicação de uma linha mostrada no cartão do serviço. */
  summary: string;
  /** Pergunta do jeito que as pessoas falam. Aparece como atalho na busca. */
  question: string;
  category: "Documento" | "Benefício" | "Saúde" | "Trabalho" | "Primeiro passo";
  icon: LucideIcon;
  /** Palavras que a busca reconhece (sem acento, minúsculas). */
  keywords: string[];
  /** true quando o passo a passo muda de acordo com o estado. */
  local?: boolean;
};

type ServiceTemplate = Omit<Service, keyof Guide> & Partial<Guide>;

const serviceList: ServiceTemplate[] = [
  {
    id: "govbr",
    title: "Criar a conta gov.br",
    summary: "A “chave” para entrar em quase todos os serviços.",
    question: "Não tenho conta gov.br",
    category: "Primeiro passo",
    icon: KeyRound,
    keywords: ["gov.br", "govbr", "conta", "senha", "login", "entrar", "cadastro", "acesso"],
    note: "A conta gov.br é gratuita e serve para entrar no INSS, SUS, Carteira de Trabalho e muitos outros serviços. Faça esta primeiro.",
    documents: [
      "Seu CPF",
      "Um celular com internet",
      "Um e-mail ou número de celular para receber códigos",
    ],
    steps: [
      "Baixe o aplicativo gov.br na loja do seu celular (o ícone é azul e branco).",
      "Abra o aplicativo, toque em “Entrar com gov.br” e digite o seu CPF.",
      "Aceite os termos de uso e confirme que você não é um robô.",
      "Responda às perguntas ou faça o reconhecimento facial (tirar uma foto do rosto).",
      "Crie uma senha que só você saiba e anote em um lugar seguro.",
    ],
    url: "https://www.gov.br/governodigital/pt-br/identidade/conta-gov-br",
    site: "Abrir o site da conta gov.br",
  },
  {
    id: "rg",
    title: "Tirar a carteira de identidade (RG)",
    summary: "Primeira via ou nova via do RG.",
    question: "Perdi meu RG",
    category: "Documento",
    icon: IdCard,
    local: true,
    keywords: [
      "rg",
      "identidade",
      "cin",
      "carteira de identidade",
      "perdi",
      "documento com foto",
      "roubaram",
    ],
  },
  {
    id: "cpf",
    title: "Consultar ou imprimir o CPF",
    summary: "Ver se o CPF está regular e salvar o comprovante.",
    question: "Preciso do meu CPF",
    category: "Documento",
    icon: FileText,
    keywords: ["cpf", "receita", "comprovante", "situacao cadastral", "segunda via", "2 via"],
    note: "O CPF é do governo federal. O passo a passo é igual em qualquer cidade do Brasil.",
    documents: ["Número do CPF", "Data de nascimento"],
    steps: [
      "Entre no site da Receita Federal e procure “Consultar CPF”.",
      "Digite o número do CPF e a data de nascimento.",
      "Confira se aparece “Regular” e salve ou imprima o comprovante.",
    ],
    url: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-cpf",
    site: "Abrir a Receita Federal",
  },
  {
    id: "inss",
    title: "Pedir aposentadoria",
    summary: "Fazer o pedido e acompanhar pelo Meu INSS.",
    question: "Quero me aposentar",
    category: "Benefício",
    icon: HandCoins,
    keywords: [
      "inss",
      "aposentadoria",
      "aposentar",
      "aposento",
      "beneficio",
      "pensao",
      "meu inss",
      "idade",
    ],
    note: "Você pode fazer o pedido e acompanhar tudo pelo Meu INSS, sem sair de casa. Também dá para ligar no telefone 135.",
    documents: ["CPF", "Senha da conta gov.br", "Carteira de trabalho, se tiver"],
    steps: [
      "Entre no aplicativo ou no site Meu INSS com sua conta gov.br.",
      "Toque em “Pedir aposentadoria” e escolha o tipo que combina com você.",
      "Confira seus dados, envie o pedido e anote o número do protocolo.",
    ],
    url: "https://meu.inss.gov.br",
    site: "Abrir o Meu INSS",
    place: { name: "Agência do INSS", mapQuery: "agência INSS" },
  },
  {
    id: "sus",
    title: "Ver o cartão do SUS",
    summary: "Encontrar o número do seu cartão pelo celular.",
    question: "Preciso do cartão do SUS",
    category: "Saúde",
    icon: HeartPulse,
    keywords: ["sus", "saude", "cartao sus", "cartao do sus", "cns", "posto", "medico", "vacina"],
    note: "O número do seu cartão do SUS aparece no aplicativo Meu SUS Digital.",
    documents: ["CPF", "Senha da conta gov.br"],
    steps: [
      "Baixe o aplicativo Meu SUS Digital na loja do seu celular.",
      "Entre com sua conta gov.br.",
      "Na tela inicial, procure o número do seu cartão e tire uma foto da tela (print).",
    ],
    url: "https://www.gov.br/saude/pt-br/composicao/seidigi/meususdigital",
    site: "Abrir o Meu SUS Digital",
    place: {
      name: "Unidade Básica de Saúde (posto de saúde)",
      mapQuery: "Unidade Básica de Saúde",
    },
  },
  {
    id: "cadunico",
    title: "Fazer o Cadastro Único",
    summary: "Porta de entrada para Bolsa Família e outros benefícios.",
    question: "Quero um benefício social",
    category: "Benefício",
    icon: House,
    keywords: [
      "cadunico",
      "cadastro unico",
      "bolsa familia",
      "beneficio",
      "cras",
      "auxilio",
      "baixa renda",
      "tarifa social",
    ],
    note: "A primeira inscrição é feita pessoalmente no CRAS. Depois, você acompanha tudo pelo celular. É gratuito.",
    documents: ["Documento de todas as pessoas da casa (CPF ou título)", "Comprovante de endereço"],
    steps: [
      "Procure o CRAS mais perto da sua casa (veja no mapa abaixo).",
      "Faça a entrevista e o cadastro com o atendente.",
      "Depois, acompanhe seus dados pelo aplicativo Cadastro Único.",
    ],
    url: "https://www.gov.br/mds/pt-br/acoes-e-programas/cadastro-unico",
    site: "Abrir o site do Cadastro Único",
    place: { name: "CRAS mais perto de você", mapQuery: "CRAS" },
  },
  {
    id: "titulo",
    title: "Consultar o título de eleitor",
    summary: "Ver se está tudo certo para votar.",
    question: "Meu título está regular?",
    category: "Documento",
    icon: Vote,
    keywords: ["titulo", "eleitor", "votar", "voto", "eleicao", "tse", "e-titulo"],
    note: "A situação do título pode ser consultada pela internet ou pelo aplicativo e-Título.",
    documents: ["CPF ou número do título", "Data de nascimento", "Nome da mãe"],
    steps: [
      "Baixe o aplicativo e-Título ou entre no site do TSE.",
      "Consulte sua situação eleitoral usando o CPF.",
      "Se aparecer alguma pendência, siga as orientações mostradas na tela.",
    ],
    url: "https://www.tse.jus.br/eleitor/titulo-de-eleitor",
    site: "Abrir o site do TSE",
    place: { name: "Cartório Eleitoral", mapQuery: "cartório eleitoral" },
  },
  {
    id: "ctps",
    title: "Ver a Carteira de Trabalho Digital",
    summary: "Seus empregos e contratos no celular.",
    question: "Fui contratado. E a carteira?",
    category: "Trabalho",
    icon: BriefcaseBusiness,
    keywords: [
      "carteira de trabalho",
      "ctps",
      "trabalho",
      "emprego",
      "contratado",
      "registro",
      "seguro desemprego",
    ],
    note: "A carteira de trabalho agora é digital. Quando for contratado, basta informar seu CPF ao empregador.",
    documents: ["CPF", "Senha da conta gov.br"],
    steps: [
      "Baixe o aplicativo Carteira de Trabalho Digital.",
      "Entre usando sua conta gov.br.",
      "Toque em “Contratos” para ver seus empregos.",
    ],
    url: "https://www.gov.br/trabalho-e-emprego/pt-br/servicos/trabalhador/carteira-de-trabalho",
    site: "Abrir o site oficial",
  },
];

export const services: readonly ServiceTemplate[] = serviceList;
export type ServiceId = string;
export const DEFAULT_SERVICE: ServiceId = "govbr";

/** Monta o guia completo de um serviço, já adaptado à cidade escolhida. */
export function getService(id: ServiceId, city: CityId): Service {
  const template =
    serviceList.find((item) => item.id === id) ??
    serviceList.find((item) => item.id === DEFAULT_SERVICE)!;
  const { name, state } = cities[city];
  const guide = template.local ? rgByState[state](name) : template;
  return { ...template, ...guide } as Service;
}

export const glossary: { term: string; meaning: string }[] = [
  {
    term: "Conta gov.br",
    meaning:
      "Um cadastro gratuito, com CPF e senha, que serve para entrar nos sites e aplicativos do governo.",
  },
  {
    term: "Aplicativo (app)",
    meaning:
      "Um programa que você baixa no celular, pela Play Store (Android) ou App Store (iPhone).",
  },
  {
    term: "Agendamento",
    meaning: "Marcar dia e horário para ser atendido. Assim você não precisa pegar fila.",
  },
  {
    term: "Protocolo",
    meaning: "Um número que comprova que você fez um pedido. Anote ou tire foto dele.",
  },
  {
    term: "Segunda via (2ª via)",
    meaning: "Uma nova cópia de um documento que você perdeu ou que estragou.",
  },
  {
    term: "Comprovante",
    meaning: "Um papel ou arquivo que prova alguma coisa, como o endereço onde você mora.",
  },
  {
    term: "CRAS",
    meaning:
      "Centro de Referência de Assistência Social. É onde se faz o Cadastro Único e se pede ajuda social.",
  },
  {
    term: "PDF",
    meaning: "Um tipo de arquivo usado para documentos. Dá para guardar no celular e imprimir.",
  },
  {
    term: "Print (captura de tela)",
    meaning: "Uma foto do que está aparecendo na tela do celular.",
  },
];

export const safetyTips: string[] = [
  "Os serviços do governo são gratuitos. Desconfie de quem cobra para “adiantar” o seu pedido.",
  "Nunca conte sua senha do gov.br para ninguém, nem para parentes ou atendentes.",
  "O governo não pede senha nem código por WhatsApp, SMS ou ligação.",
  "Os sites oficiais terminam com .gov.br. Confira antes de digitar seus dados.",
];
