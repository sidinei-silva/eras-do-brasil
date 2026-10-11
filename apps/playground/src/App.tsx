import { Outlet } from "react-router";
import { Navbar } from "./components/navbar";

export function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto py-6">
        <Outlet />
      </main>

      <footer>Rodapé padrão</footer>
    </div>
  );
}
