import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, Map, Swords } from "lucide-react";
import { Link } from "react-router";

export function HomePage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-zinc-50 mb-2">
          Mecânicas do Core
        </h1>
        <p className="text-zinc-400">
          Selecione um módulo para rodar os testes de regra puros no navegador.
        </p>
      </div>

      {/* Grid responsivo: 1 coluna no celular, 2 no tablet, 3 no PC */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Combate */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-50 rounded-xl">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
              <Swords className="w-6 h-6 text-zinc-100" />
            </div>
            <CardTitle className="font-bold text-xl">
              Combate por Turnos
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Teste de fila, bloqueio, skills de movimento e cálculo de dano.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-zinc-500 list-disc list-inside">
              <li>Luta ativa vs NPCs</li>
              <li>Sistema de filas (+1 de distância oposta)</li>
              <li>Mecânica de fuga e anti-fuga</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-300 font-bold rounded-lg">
              <Link to="/combate">Abrir Depurador</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Card 2: Automação (AFK) */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-50 rounded-xl">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-zinc-100" />
            </div>
            <CardTitle className="font-bold text-xl">Automação (AFK)</CardTitle>
            <CardDescription className="text-zinc-400">
              Simulação de caçada automatizada e prioridade de skills.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-zinc-500 list-disc list-inside">
              <li>Teste de presets por tipo de mob</li>
              <li>Limiar de fuga automático</li>
              <li>Uso de itens de cura</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg"
            >
              Em breve
            </Button>
          </CardFooter>
        </Card>

        {/* Card 3: Mundo */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-50 rounded-xl">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
              <Map className="w-6 h-6 text-zinc-100" />
            </div>
            <CardTitle className="font-bold text-xl">
              Navegação e Mundo
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Spawn de inimigos, zonas de risco e pontos de interesse.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-zinc-500 list-disc list-inside">
              <li>Encontros do mapa</li>
              <li>Preço da morte (Risco)</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg"
            >
              Em breve
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
