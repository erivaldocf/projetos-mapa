import React, { useState } from "react";
import FormPage from "./pages/FormPage";
import MapPage from "./pages/MapPage";

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState("mapa"); // "mapa" ou "formulario"

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Barra de Navegação Superior */}
      <header className="bg-slate-900 text-white px-6 py-3 flex justify-between items-center z-[1100] shadow-md border-b border-slate-800">
        <h1 className="text-lg font-bold tracking-wide">
          📍 Sistema de Mapeamento de Projetos
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setPaginaAtiva("mapa")}
            className={`px-4 py-1.5 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
              paginaAtiva === "mapa"
                ? "bg-sky-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            🗺️ Ver Mapa
          </button>
          <button
            onClick={() => setPaginaAtiva("formulario")}
            className={`px-4 py-1.5 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
              paginaAtiva === "formulario"
                ? "bg-emerald-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            📝 Novo Formulário
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 relative overflow-hidden">
        {paginaAtiva === "mapa" && <MapPage />}
        {paginaAtiva === "formulario" && <FormPage />}
      </main>
    </div>
  );
}

export default App;
