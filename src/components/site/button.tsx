import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-coral text-paper hover:bg-coral-strong",
  dark: "bg-ink text-paper hover:bg-ink/90",
  light: "bg-paper text-ink ring-2 ring-ink/15 hover:bg-sun/30 hover:ring-ink/30",
  ghost: "bg-paper/10 text-paper hover:bg-paper/20",
  success: "bg-success text-paper hover:bg-success/90",
} as const;

type Variant = keyof typeof variants;

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-2 text-center font-display font-bold leading-tight transition-colors disabled:cursor-not-allowed disabled:opacity-40 [&_svg]:size-5 [&_svg]:shrink-0";

export function Button({
  variant = "dark",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type={type} className={cn(base, variants[variant], className)} {...props} />;
}

/** Link que abre em outra aba (site oficial, mapa). */
export function ExternalButton({
  variant = "primary",
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
      <span className="sr-only"> (abre em outra aba)</span>
    </a>
  );
}
