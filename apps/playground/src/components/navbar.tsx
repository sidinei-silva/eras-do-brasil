import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-zinc-950 text-zinc-50">
      <div className="flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          {/* Tipografia grossa e de alto contraste conforme a direção de arte */}
          <span className="font-bold text-xl tracking-tight">
            Playground do Jogo
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Button variant="ghost" className="rounded-lg">
            <Link to="/">Início</Link>
          </Button>

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
