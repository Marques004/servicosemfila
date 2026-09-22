
# Serviço Sem Fila

**Serviços públicos digitais explicados passo a passo, com calma.**

Site educativo do projeto de extensão **"Inclusão Digital no Acesso aos Serviços Públicos"**
(Unoeste · Engenharia de Software · 2026). Ele ajuda **pessoas idosas e famílias de baixa renda**
a entender e usar os canais digitais do governo, como conta gov.br, RG, CPF, INSS, SUS e Cadastro Único.

🔗 **Acesse o site:** https://servicosemfila.lovable.app

> ⚠️ O Serviço Sem Fila é um **guia**. Ele não substitui os canais oficiais e não pede nem guarda
> dados pessoais de ninguém.

---

## Por que este projeto existe

Muita gente deixa de usar um serviço público pela internet por causa de:

- pouca familiaridade com celular e computador;
- não saber **onde** fica o serviço nem **quais documentos** levar;
- linguagem burocrática e etapas confusas;
- medo de golpes.

O site responde a cada uma dessas dificuldades com quatro objetivos:
**Orientar · Organizar · Informar · Direcionar.**

## O que o site faz

| Recurso | Como ajuda |
| --- | --- |
| 🔎 **Busca "do seu jeito"** | A pessoa escreve como fala ("quero me aposentar", "perdi a identidade") e o site encontra o serviço. A busca aceita palavras sem acento. |
| 👣 **Passo a passo guiado** | Mostra os documentos necessários, marca o passo atual com "Você está aqui", tem o botão "Já fiz este passo" e uma barra de progresso. |
| 🔊 **Ouvir em voz alta** | Lê a explicação inteira ou um passo por vez, com a voz do próprio navegador. |
| 📍 **Onde ir pessoalmente** | Abre o mapa com o Poupatempo, CRAS, INSS ou posto de saúde da cidade escolhida. |
| 🏙️ **37 cidades em 6 estados** | SP, MG, SC, RJ, PR e MS, mais a opção "Outra cidade" para o resto do Brasil. |
| 🔠 **Acessibilidade** | 4 tamanhos de letra, modo alto contraste, fonte Atkinson Hyperlegible (feita para baixa visão), botões grandes, uso por teclado e por leitor de tela. |
| 📖 **Palavras difíceis** | Glossário com termos como protocolo, agendamento e 2ª via. |
| 🛡️ **Proteja-se de golpes** | Dicas de segurança digital. |

As preferências (tamanho da letra, contraste e cidade) ficam salvas no navegador de quem usa.

### Serviços disponíveis

Conta gov.br · Carteira de identidade (RG) · CPF · Aposentadoria (INSS) · Cartão do SUS ·
Cadastro Único · Título de eleitor · Carteira de Trabalho Digital

## Tecnologias

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [TanStack Start](https://tanstack.com/start) (rotas e renderização no servidor)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Lucide](https://lucide.dev) (ícones)
- Web Speech API (leitura em voz alta)
- Criado e publicado com [Lovable](https://lovable.dev)

## Como rodar no computador

Você precisa do [Node.js](https://nodejs.org) (versão 20 ou mais nova) ou do [Bun](https://bun.sh).

```sh
git clone https://github.com/julianascimento-alkmin/everyday-access.git
cd everyday-access
npm install
npm run dev
```

Depois, abra no navegador o endereço que aparecer no terminal.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Abre o site em modo de desenvolvimento |
| `npm run build` | Gera a versão final para publicar |
| `npm run lint` | Procura erros no código |
| `npm run format` | Arruma a formatação do código |

## Estrutura do código

```
src/
├── data/services.ts        ← textos: serviços, estados, cidades, glossário e dicas
├── components/site/        ← partes da página (cabeçalho, busca, guia, seções)
├── hooks/
│   ├── use-preferences.ts  ← letra, contraste e cidade (salvos no navegador)
│   └── use-speech.ts       ← leitura em voz alta
├── lib/search.ts           ← busca por linguagem natural
├── routes/index.tsx        ← página principal
└── styles.css              ← cores, fontes e modo alto contraste
```

### Como editar o conteúdo

Quase tudo o que aparece no site está em **`src/data/services.ts`**. Não é preciso mexer nos componentes.

- **Adicionar uma cidade:** inclua uma linha em `cities`, por exemplo:
  `ourinhos: { name: "Ourinhos", state: "SP" }`
- **Adicionar um estado:** inclua-o em `stateNames` e escreva o passo a passo do RG em `rgByState`.
- **Adicionar um serviço:** copie um item de `serviceList` e troque os textos.
- **Fazer a busca entender novas palavras:** acrescente termos em `keywords` do serviço.

## Editar pelo Lovable

O projeto está conectado ao [Lovable](https://lovable.dev/projects/204a37e7-23fb-4742-8142-78d044b4e8f1):

- o que for alterado no editor do Lovable vira um commit neste repositório;
- o que for enviado para a branch `main` aparece no Lovable.

Evite `force push` e reescrever commits que já foram enviados, porque isso apaga o histórico no Lovable.

## Próximos passos

- [ ] Carta de aceite da instituição parceira
- [ ] Levantamento das necessidades específicas do público atendido
- [ ] Validar textos e links com a instituição parceira
- [ ] Palestra interativa: ensinar os idosos a usar o site na prática
- [ ] Ajustes a partir do retorno das pessoas

## Equipe

Projeto de extensão universitária do curso de **Engenharia de Software da Unoeste (2026)**:

Gabriel Rodrigues Santos · Daniel Galvão de Salles Dias · Julia Marques Ribeiro de Oliveira ·
Julia do Nascimento Pereira · Milca Leite Pereira Barreto · Rodrigo da Purificação Muniz · Yuri Trindade
