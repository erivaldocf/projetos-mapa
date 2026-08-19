import React, { useState } from "react";
import Select from "react-select";

import {
  ETAPAS_ENSINO,
  MODALIDADES_ENSINO,
  ANOS_SERIES,
  ANOS_POR_ETAPA,
  COMPONENTES_CURRICULARES,
  AREAS_CONHECIMENTO,
  OFERTAS_ENSINO,
} from "../../constants/formOptions";

// Importando os arquivos JSON gerados pelo script
import bnccGeral from "../../data/bnccGeral.json";
import bnccComputacao from "../../data/bnccComputacao.json";

// Mapeia os dados para o formato aceito pelo react-select { value, label }
const opcoesGeral = bnccGeral.map((item) => ({
  value: item.codigo,
  label: `${item.codigo} - ${item.descricao}`,
}));

const opcoesComputacao = bnccComputacao.map((item) => ({
  value: item.codigo,
  label: `${item.codigo} - ${item.descricao}`,
}));

export default function Step3({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) {
  const [outroComponente, setOutroComponente] = useState("");
  const [outraArea, setOutraArea] = useState("");

  // Função genérica para alternar seleção em listas (Arrays)
  const handleCheckboxToggle = (campo, valor) => {
    const listaAtual = Array.isArray(formData[campo]) ? formData[campo] : [];
    let novaLista;

    if (listaAtual.includes(valor)) {
      novaLista = listaAtual.filter((item) => item !== valor);
    } else {
      novaLista = [...listaAtual, valor];
    }

    updateFormData({ [campo]: novaLista });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações de seleção mínima
    if (!formData.etapa_ensino || formData.etapa_ensino.length === 0) {
      alert("Por favor, selecione pelo menos uma Etapa de Ensino.");
      return;
    }

    if (!formData.oferta_ensino || formData.oferta_ensino.length === 0) {
      alert("Por favor, selecione pelo menos uma Oferta de Ensino.");
      return;
    }

    if (!formData.ano_serie || formData.ano_serie.length === 0) {
      alert("Por favor, selecione pelo menos um Ano / Série.");
      return;
    }

    if (
      !formData.modalidade_ensino ||
      formData.modalidade_ensino.length === 0
    ) {
      alert("Por favor, selecione pelo menos uma Modalidade de Ensino.");
      return;
    }

    // Inclui opções informadas nos campos de texto "Outro"
    let componentesFinais = [...(formData.disciplinas || [])];
    if (
      outroComponente.trim() &&
      !componentesFinais.includes(`Outro: ${outroComponente}`)
    ) {
      componentesFinais.push(`Outro: ${outroComponente}`);
    }

    let areasFinais = [...(formData.areas_conhecimento || [])];
    if (outraArea.trim() && !areasFinais.includes(`Outro: ${outraArea}`)) {
      areasFinais.push(`Outro: ${outraArea}`);
    }

    updateFormData({
      disciplinas: componentesFinais,
      areas_conhecimento: areasFinais,
    });

    nextStep();
  };

  // Prepara os valores selecionados de BNCC para o formato do React-Select
  const valoresGeralSelecionados = opcoesGeral.filter((op) =>
    (Array.isArray(formData.habilidades_bncc)
      ? formData.habilidades_bncc
      : []
    ).includes(op.value),
  );

  const valoresComputacaoSelecionados = opcoesComputacao.filter((op) =>
    (Array.isArray(formData.habilidades_bncc_computacao)
      ? formData.habilidades_bncc_computacao
      : []
    ).includes(op.value),
  );

  const anosPermitidos = (formData.etapa_ensino || []).flatMap(
    (etapa) => ANOS_POR_ETAPA[etapa] || [],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
        Informações do Projeto
      </h2>

      {/* Etapa de Ensino */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Etapa de Ensino (Selecione quantas forem aplicáveis)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border p-3 rounded-lg bg-gray-50">
          {ETAPAS_ENSINO.map((etapa) => (
            <label
              key={etapa}
              className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(formData.etapa_ensino || []).includes(etapa)}
                onChange={() => handleCheckboxToggle("etapa_ensino", etapa)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{etapa}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ano / Série */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ano / Série (Selecione quantos forem aplicáveis)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border p-3 rounded-lg bg-gray-50 max-h-40 overflow-y-auto">
          {ANOS_SERIES.map((ano) => {
            const habilitado = anosPermitidos.includes(ano);

            return (
              <label
                key={ano}
                className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(formData.ano_serie || []).includes(ano)}
                  disabled={!habilitado}
                  onChange={() => handleCheckboxToggle("ano_serie", ano)}
                  className="rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                />

                <span className={!habilitado ? "text-gray-400" : ""}>
                  {ano}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Oferta de Ensino */}

      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Oferta de Ensino (Selecione quantas forem aplicáveis)
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-3 rounded-lg bg-gray-50">
          {OFERTAS_ENSINO.map((oferta) => (
            <label
              key={oferta}
              className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(formData.oferta_ensino || []).includes(oferta)}
                onChange={() => handleCheckboxToggle("oferta_ensino", oferta)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{oferta}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Modalidade de Ensino */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Modalidade de Ensino (Selecione quantas forem aplicáveis)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-3 rounded-lg bg-gray-50">
          {MODALIDADES_ENSINO.map((modalidade) => (
            <label
              key={modalidade}
              className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(formData.modalidade_ensino || []).includes(
                  modalidade,
                )}
                onChange={() =>
                  handleCheckboxToggle("modalidade_ensino", modalidade)
                }
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{modalidade}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Componentes Curriculares Envolvidos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Componente Curricular Envolvido (Marque quantos desejar)
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 border p-3 rounded-lg bg-gray-50 max-h-96 overflow-y-auto">
          {Object.entries(COMPONENTES_CURRICULARES).flatMap(([, componentes]) =>
            componentes.map((comp) => (
              <label
                key={comp}
                className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(formData.disciplinas || []).includes(comp)}
                  onChange={() => handleCheckboxToggle("disciplinas", comp)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />

                <span>{comp}</span>
              </label>
            )),
          )}
        </div>

        <div className="mt-2">
          <input
            type="text"
            value={outroComponente}
            onChange={(e) => setOutroComponente(e.target.value)}
            placeholder="Outro componente curricular (opcional)"
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Áreas de Conhecimento */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Áreas de Conhecimento Envolvidas
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-3 rounded-lg bg-gray-50">
          {AREAS_CONHECIMENTO.map((area) => (
            <label
              key={area}
              className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(formData.areas_conhecimento || []).includes(area)}
                onChange={() =>
                  handleCheckboxToggle("areas_conhecimento", area)
                }
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{area}</span>
            </label>
          ))}
        </div>
        <div className="mt-2">
          <input
            type="text"
            value={outraArea}
            onChange={(e) => setOutraArea(e.target.value)}
            placeholder="Outra área (opcional)"
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* SELEÇÃO BNCC GERAL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Códigos e Habilidades da BNCC Geral
        </label>
        <Select
          isMulti
          options={opcoesGeral}
          value={valoresGeralSelecionados}
          onChange={(selecionados) => {
            const codigos = selecionados
              ? selecionados.map((s) => s.value)
              : [];
            updateFormData({ habilidades_bncc: codigos });
          }}
          placeholder="Digite para buscar (ex: EF01MA01, Geografia...)"
          noOptionsMessage={() => "Nenhuma habilidade encontrada"}
          className="text-sm"
        />
      </div>

      {/* SELEÇÃO BNCC COMPUTAÇÃO */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Códigos e Habilidades da BNCC Computação
        </label>
        <Select
          isMulti
          options={opcoesComputacao}
          value={valoresComputacaoSelecionados}
          onChange={(selecionados) => {
            const codigos = selecionados
              ? selecionados.map((s) => s.value)
              : [];
            updateFormData({ habilidades_bncc_computacao: codigos });
          }}
          placeholder="Digite para buscar (ex: EF01CO01, Algoritmo...)"
          noOptionsMessage={() => "Nenhuma habilidade encontrada"}
          className="text-sm"
        />
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
