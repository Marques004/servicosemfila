# Serviço Sem Fila — site a partir do código enviado

O arquivo enviado já contém um site pronto e em português: um guia de serviços públicos digitais (conta gov.br, RG, CPF, INSS, SUS, Cadastro Único e outros), pensado para pessoas idosas. Vou usá-lo como base do projeto atual.

## O que o site terá

- **Buscar serviço**: campo de busca em linguagem simples (funciona sem acento) e lista de serviços.
- **Passo a passo guiado**: cada serviço com etapas, marcação de progresso e botão para recomeçar.
- **Leitura em voz alta**: ouvir o guia inteiro ou passo por passo.
- **Acessibilidade**: letra ajustável e modo alto contraste, memorizados no navegador.
- **Cidade**: 37 cidades (SP, MG, SC, RJ, PR, MS) + "Outra cidade", com "onde ir" e link para o mapa.
- **Evitar golpes**, **Palavras difíceis** (glossário) e **Sobre o projeto** de extensão (Unoeste).
- Rodapé com atalhos e identidade visual própria (fontes Atkinson Hyperlegible e Outfit, paleta coral/ink/canvas).

## Como vou fazer

1. Trazer para o projeto os arquivos de código do pacote: página inicial, componentes do site (cabeçalho, busca, guia, seções informativas, botão), dados dos serviços e cidades, busca sem acento e os recursos de preferências e voz.
2. Substituir a página inicial de exemplo pelo site real, mantendo o endereço principal `/`.
3. Aplicar as cores, tipografia e o modo alto contraste do pacote no arquivo de estilos, preservando o que o restante do projeto precisa.
4. Ajustar o layout raiz: idioma pt-BR, fontes do Google via `<link>`, páginas de erro e "não encontrado" em português, mantendo a estrutura atual do projeto (provider de dados já existente).
5. Copiar o roadmap do pacote para o projeto, com os itens ainda abertos.
6. Verificar a página no navegador (busca, troca de serviço, progresso, alto contraste) e conferir que não há erros.

## Detalhes técnicos

- As dependências do pacote são idênticas às do projeto atual; nada novo a instalar.
- Rota única em `src/routes/index.tsx` (o site é uma página com âncoras internas), componentes em `src/components/site/`, dados em `src/data/services.ts`, hooks `use-preferences` e `use-speech`.
- O `__root.tsx` do pacote usa `createRootRoute` sem contexto; manterei o `createRootRouteWithContext` + `QueryClientProvider` do projeto atual e aplicarei apenas o conteúdo visual/idioma/fontes.
- Metadados de SEO (title, description, og) já vêm definidos na rota inicial em português.
- Nenhum arquivo de controle de versão do pacote será copiado.

## Em aberto (do roadmap)

- Validar textos e links com a instituição parceira.
- Levantamento das necessidades do público atendido.
- Teste com idosos e ajustes após a palestra.
