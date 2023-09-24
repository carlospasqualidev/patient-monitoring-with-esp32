import { cn } from "../../../lib";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <a
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Início
      </a>
      <a
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Receitas
      </a>
      <a
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Informações de pacientes
      </a>
      <a
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Configurações
      </a>
    </nav>
  );
}
