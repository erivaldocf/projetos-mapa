import React from "react";

function DetalhesEscola({ projetoSelecionado, onClose }) {
  if (!projetoSelecionado) return null;

  return (
    <div className="w-full md:w-1/3 min-w-[360px] h-screen bg-white shadow-2xl z-[1010] flex flex-col font-sans transition-all duration-300 border-r border-slate-200">
      {/* Cabeçalho */}
      <div className="p-4 px-5 bg-slate-900 text-white flex justify-between items-center">
        <span className="text-base font-bold tracking-wide">
          📋 Detalhes da Escola e Projeto
        </span>
        <button
          onClick={onClose}
          className="bg-transparent border-none text-slate-400 hover:text-white text-2xl font-bold cursor-pointer"
        >
          ×
        </button>
      </div>

      {/* Conteúdo com Scroll */}
      <div className="p-6 overflow-y-auto flex flex-col gap-5">
        {/* BLOCO 1: ESCOLA */}
        <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-3.5">
            🏫 Informações da Instituição
          </span>

          <div className="mb-3.5">
            <label className="text-[12px] text-slate-500 font-bold uppercase">
              Nome da Escola:
            </label>
            <h3 className="m-0 mt-1 text-slate-900 text-lg font-bold leading-snug">
              {projetoSelecionado.nomeEscola}
            </h3>
          </div>

          {projetoSelecionado.municipio && (
            <div className="mb-3.5">
              <label className="text-[12px] text-slate-500 font-bold uppercase">
                Município:
              </label>
              <p className="m-0 mt-0.5 text-slate-700 text-sm font-semibold">
                {projetoSelecionado.municipio}
              </p>
            </div>
          )}

          {Object.entries(projetoSelecionado.dadosCompletosEscola || {}).map(
            ([chave, valor]) => {
              if (
                !valor ||
                [
                  "Nome",
                  "NOME DA ESCOLA",
                  "Escola",
                  "Coordenadas",
                  "Coordenada",
                  "COORDENADAS",
                ].includes(chave)
              )
                return null;
              return (
                <div key={`escola_${chave}`} className="mb-2.5">
                  <label className="text-xs text-slate-500 font-bold">
                    {chave}:
                  </label>
                  <p className="m-0 mt-0.5 text-slate-700 text-sm leading-relaxed">
                    {String(valor)}
                  </p>
                </div>
              );
            },
          )}
        </div>

        {/* BLOCO 2: PROJETO */}
        <div className="bg-emerald-50/60 p-4.5 rounded-xl border border-emerald-200">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-3.5">
            💡 Detalhes da Ação Tecnológica
          </span>

          {projetoSelecionado.etapa && (
            <div className="mb-3.5">
              <label className="text-xs text-emerald-800 font-bold">
                Etapa de Ensino:
              </label>
              <span className="inline-block mt-1 px-2.5 py-1 text-xs rounded-md bg-sky-100 text-sky-800 font-semibold">
                {projetoSelecionado.etapa}
              </span>
            </div>
          )}

          {projetoSelecionado.modalidade && (
            <div className="mb-3.5">
              <label className="text-xs text-emerald-800 font-bold">
                Modalidade:
              </label>
              <span className="inline-block mt-1 px-2.5 py-1 text-xs rounded-md bg-teal-100 text-teal-800 font-semibold">
                {projetoSelecionado.modalidade}
              </span>
            </div>
          )}

          {projetoSelecionado.area && (
            <div className="mb-3.5">
              <label className="text-xs text-emerald-800 font-bold">
                Área do Conhecimento:
              </label>
              <span className="inline-block mt-1 px-2.5 py-1 text-xs rounded-md bg-amber-100 text-amber-900 font-semibold">
                {projetoSelecionado.area}
              </span>
            </div>
          )}

          {projetoSelecionado.componente && (
            <div className="mb-3.5">
              <label className="text-xs text-emerald-800 font-bold">
                Componente Curricular:
              </label>
              <span className="inline-block mt-1 px-2.5 py-1 text-xs rounded-md bg-indigo-100 text-indigo-900 font-semibold">
                {projetoSelecionado.componente}
              </span>
            </div>
          )}

          {Object.entries(projetoSelecionado.dadosCompletosProjeto || {}).map(
            ([chave, valor]) => {
              if (
                !valor ||
                [
                  "INEP da Escola",
                  "INEP",
                  "Etapa de Ensino",
                  "Etapa",
                  "Modalidade de Ensino",
                  "Modalidade",
                  "Área de Conhecimento",
                  "Area de Conhecimento",
                  "Área",
                  "Area",
                  "Componente Curricular",
                  "Componente",
                  "Disciplina",
                ].includes(chave)
              )
                return null;
              return (
                <div key={`proj_${chave}`} className="mb-2.5">
                  <label className="text-xs text-emerald-800 font-bold">
                    {chave}:
                  </label>
                  <p className="m-0 mt-0.5 text-emerald-950 text-sm leading-relaxed">
                    {String(valor)}
                  </p>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalhesEscola;
