import React from "react";

export default function Step2({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação opcional: Garante que ano_fim não seja anterior a ano_inicio
    if (
      formData.ano_inicio &&
      formData.ano_fim &&
      Number(formData.ano_fim) < Number(formData.ano_inicio)
    ) {
      alert("O Ano de Fim não pode ser anterior ao Ano de Início.");
      return;
    }

    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-[#122318] border-b-2 border-[#8fb99f] pb-2">
        Detalhes do Projeto
      </h2>

      {/* Nome do Projeto */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Nome do Projeto / Atividade Científica / Evento Científico
        </label>
        <input
          type="text"
          value={formData.nome_projeto || ""}
          onChange={(e) => updateFormData({ nome_projeto: e.target.value })}
          placeholder="Digite o nome do projeto"
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
        />
      </div>

      {/* Responsável pelo Projeto*/}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Responsável pelo Projeto
        </label>
        <input
          type="text"
          value={formData.responsavel || ""}
          onChange={(e) => updateFormData({ responsavel: e.target.value })}
          placeholder="Nome do(a) professor(a) responsável"
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
        />
      </div>

      {/* Quantitativo de Estudantes Envolvidos */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Quantitativo de Estudantes Envolvidos
        </label>
        <input
          type="number"
          min="1"
          value={formData.qtd_estudantes || ""}
          onChange={(e) => updateFormData({ qtd_estudantes: e.target.value })}
          placeholder="Ex: 25"
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
        />
      </div>

      {/* Quantitativo de Professores Envolvidos */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Quantitativo de Professores Envolvidos
        </label>
        <input
          type="number"
          min="1"
          value={formData.qtd_professores || ""}
          onChange={(e) => updateFormData({ qtd_professores: e.target.value })}
          placeholder="Ex: 25"
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
        />
      </div>

      {/* Descrição do Projeto */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Descrição do Projeto
        </label>
        <textarea
          rows={4}
          value={formData.descricao_projeto || ""}
          onChange={(e) =>
            updateFormData({ descricao_projeto: e.target.value })
          }
          placeholder="Descreva de forma clara a proposta do projeto..."
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
        />
      </div>

      {/* Objetivo */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Objetivo do Projeto
        </label>
        <textarea
          rows={3}
          value={formData.objetivo || ""}
          onChange={(e) => updateFormData({ objetivo: e.target.value })}
          placeholder="Descreva o objetivo principal do projeto..."
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
        />
      </div>

      {/* Metodologia */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Metodologia
        </label>
        <textarea
          rows={3}
          value={formData.metodologia || ""}
          onChange={(e) => updateFormData({ metodologia: e.target.value })}
          placeholder="Ex: Aulas práticas, oficinas, pesquisa de campo, uso de kits de robótica..."
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
        />
      </div>

      {/* Metodologia Híbrida */}
      <div className="flex items-center bg-[#a8cbb4] p-3 rounded-lg border-2 border-[#315740] shadow-sm">
        <input
          type="checkbox"
          id="metodologia_hibrida"
          checked={formData.metodologia_hibrida || false}
          onChange={(e) =>
            updateFormData({ metodologia_hibrida: e.target.checked })
          }
          className="w-4 h-4 text-[#244231] bg-white border-2 border-[#315740] rounded focus:ring-[#244231] cursor-pointer"
        />
        <label
          htmlFor="metodologia_hibrida"
          className="ml-2.5 text-sm font-bold text-[#143021] cursor-pointer select-none"
        >
          Utiliza metodologia híbrida (presencial e online)
        </label>
      </div>

      {/* Resultados Alcançados */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Resultados alcançados pelo projeto
        </label>
        <textarea
          rows={4}
          value={formData.resultados || ""}
          onChange={(e) => updateFormData({ resultados: e.target.value })}
          placeholder="Descreva os principais impactos e conquistas observados nos estudantes..."
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
        />
      </div>

      {/* Datas e Periodicidade em Grid de 3 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ano de Início */}
        <div>
          <label className="block text-sm font-bold text-[#143021] mb-1.5">
            Ano de Início
          </label>
          <input
            type="number"
            min="2000"
            max="2030"
            value={formData.ano_inicio || ""}
            onChange={(e) => updateFormData({ ano_inicio: e.target.value })}
            placeholder="Ex: 2024"
            required
            className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
          />
        </div>

        {/* Ano de Fim */}
        <div>
          <label className="block text-sm font-bold text-[#143021] mb-1.5">
            Ano de Fim{" "}
            <span className="text-gray-700 font-normal text-xs">(Opcional)</span>
          </label>
          <input
            type="number"
            min="2000"
            max="2030"
            value={formData.ano_fim || ""}
            onChange={(e) => updateFormData({ ano_fim: e.target.value })}
            placeholder="Ex: 2025"
            className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
          />
        </div>

        {/* Periodicidade */}
        <div>
          <label className="block text-sm font-bold text-[#143021] mb-1.5">
            Periodicidade das Atividades
          </label>
          <input
            type="text"
            value={formData.periodicidade || ""}
            onChange={(e) => updateFormData({ periodicidade: e.target.value })}
            placeholder="Ex: Semanal, Quinzenal, Mensal"
            required
            className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm text-sm"
          />
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 border-2 border-[#315740] bg-[#eef5f1] text-[#143021] font-bold rounded-lg hover:bg-[#dcefe4] transition-all cursor-pointer shadow-sm"
        >
          ← Voltar
        </button>
        <button
          type="submit"
          className="px-7 py-2.5 bg-[#244231] text-white font-bold rounded-lg hover:bg-[#162e21] focus:ring-4 focus:ring-[#97bfa7] transition-all shadow-md cursor-pointer"
        >
          Próximo →
        </button>
      </div>
    </form>
  );
}