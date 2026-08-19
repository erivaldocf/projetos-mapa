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
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
        Detalhes do Projeto
      </h2>

      {/* Nome do Projeto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Projeto / Atividade Científica / Evento Científico
        </label>
        <input
          type="text"
          value={formData.nome_projeto || ""}
          onChange={(e) => updateFormData({ nome_projeto: e.target.value })}
          placeholder="Digite o nome do projeto"
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Responsável pelo Projeto*/}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Responsável pelo Projeto
        </label>
        <input
          type="text"
          value={formData.responsavel || ""}
          onChange={(e) => updateFormData({ responsavel: e.target.value })}
          placeholder="Nome do(a) professor(a) responsável"
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Quantitativo de Estudantes Envolvidos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantitativo de Estudantes Envolvidos
        </label>
        <input
          type="number"
          min="1"
          value={formData.qtd_estudantes || ""}
          onChange={(e) => updateFormData({ qtd_estudantes: e.target.value })}
          placeholder="Ex: 25"
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Quantitativo de Professores Envolvidos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantitativo de Professores Envolvidos
        </label>
        <input
          type="number"
          min="1"
          value={formData.qtd_professores || ""}
          onChange={(e) => updateFormData({ qtd_professores: e.target.value })}
          placeholder="Ex: 25"
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Descrição do Projeto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Objetivo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Objetivo do Projeto
        </label>
        <textarea
          rows={3}
          value={formData.objetivo || ""}
          onChange={(e) => updateFormData({ objetivo: e.target.value })}
          placeholder="Descreva o objetivo principal do projeto..."
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Metodologia */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Metodologia
        </label>
        <textarea
          rows={3}
          value={formData.metodologia || ""}
          onChange={(e) => updateFormData({ metodologia: e.target.value })}
          placeholder="Ex: Aulas práticas, oficinas, pesquisa de campo, uso de kits de robótica..."
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Metodologia Híbrida */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="metodologia_hibrida"
          checked={formData.metodologia_hibrida || false}
          onChange={(e) =>
            updateFormData({ metodologia_hibrida: e.target.checked })
          }
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="metodologia_hibrida"
          className="ml-2 text-sm font-medium text-gray-700"
        >
          Utiliza metodologia híbrida (presencial e online)
        </label>
      </div>

      {/* Resultados Alcançados */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Resultados alcançados pelo projeto
        </label>
        <textarea
          rows={4}
          value={formData.resultados || ""}
          onChange={(e) => updateFormData({ resultados: e.target.value })}
          placeholder="Descreva os principais impactos e conquistas observados nos estudantes..."
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Datas e Periodicidade em Grid de 3 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ano de Início */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Ano de Fim */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ano de Fim{" "}
            <span className="text-gray-400 font-normal">(Opcional)</span>
          </label>
          <input
            type="number"
            min="2000"
            max="2030"
            value={formData.ano_fim || ""}
            onChange={(e) => updateFormData({ ano_fim: e.target.value })}
            placeholder="Ex: 2025"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Periodicidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Periodicidade das Atividades
          </label>
          <input
            type="text"
            value={formData.periodicidade || ""}
            onChange={(e) => updateFormData({ periodicidade: e.target.value })}
            placeholder="Ex: Semanal, Quinzenal, Mensal"
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
        >
          ← Voltar
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all cursor-pointer"
        >
          Próximo →
        </button>
      </div>
    </form>
  );
}
