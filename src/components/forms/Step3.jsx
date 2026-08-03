import React from "react";

export default function Step3({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
        Detalhes do Projeto
      </h2>

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
          placeholder="Descreva de forma clara os objetivos e a proposta do projeto..."
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
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
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Ano de Início e Periodicidade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Periodicidade das Atividades
          </label>
          <input
            type="text"
            value={formData.periodicidade || ""}
            onChange={(e) => updateFormData({ periodicidade: e.target.value })}
            placeholder="Ex: Semanal, Quinzenal, Mensal, Contínuo"
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all"
        >
          ← Voltar
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all"
        >
          Próximo →
        </button>
      </div>
    </form>
  );
}
