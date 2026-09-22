import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const actionClass =
  "inline-flex min-h-12 items-center justify-center rounded-2xl px-6 font-display font-bold transition-colors";

function MessagePage({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-extrabold">{title}</h1>
        <p className="mt-3 text-lg text-ink-soft">{text}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <MessagePage title="Página não encontrada" text="Este endereço não existe ou mudou de lugar.">
      <Link to="/" className={`${actionClass} bg-coral text-paper hover:bg-coral-strong`}>
        Voltar para o início
      </Link>
    </MessagePage>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <MessagePage
      title="A página não carregou"
      text="Algo deu errado. Tente de novo ou volte para o início."
    >
      <button
        type="button"
        onClick={() => {
          void router.invalidate();
          reset();
        }}
        className={`${actionClass} bg-coral text-paper hover:bg-coral-strong`}
      >
        Tentar de novo
      </button>
      <a href="/" className={`${actionClass} bg-paper text-ink ring-2 ring-ink/20`}>
        Voltar para o início
      </a>
    </MessagePage>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#123f41" },
      { title: "Serviço Sem Fila" },
      { name: "description", content: "Guia simples para acessar serviços públicos digitais." },
      { name: "author", content: "Projeto de extensão Unoeste — Engenharia de Software" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Outfit:wght@600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
