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
    // Inclui opções informadas nos campos de texto "Outro"
    let componentesFinais = [...(formData.disciplinas || [])];
    if (
      outroComponente.trim() &&
      !componentesFinais.includes(outroComponente.trim())
    ) {
      componentesFinais.push(outroComponente.trim());
    }

    let areasFinais = [...(formData.areas_conhecimento || [])];
    if (outraArea.trim() && !areasFinais.includes(outraArea.trim())) {
      areasFinais.push(outraArea.trim());
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

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
      borderWidth: "2px",
      borderColor: state.isFocused ? "#244231" : "#315740",
      borderRadius: "0.5rem",
      padding: "2px",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(36, 66, 49, 0.3)" : "none",
      "&:hover": {
        borderColor: "#244231",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#4b5563",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#244231",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#ffffff",
      fontWeight: 600,
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#d9eadf",
      "&:hover": {
        backgroundColor: "#162e21",
        color: "#ffffff",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#244231"
        : state.isFocused
          ? "#d9eadf"
          : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#111827",
      fontWeight: 500,
      cursor: "pointer",
    }),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-[#122318] border-b-2 border-[#8fb99f] pb-2">
        Informações do Projeto
      </h2>

      {/* Etapa de Ensino */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-2">
          Etapa de Ensino (Selecione quantas forem aplicáveis)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-2 border-[#315740] p-3 rounded-lg bg-[#a8cbb4] shadow-sm">
          {ETAPAS_ENSINO.map((etapa) => (
            <label
              key={etapa}
              className="flex items-center space-x-2.5 text-sm text-[#143021] font-bold cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(formData.etapa_ensino || []).includes(etapa)}
                onChange={() => handleCheckboxToggle("etapa_ensino", etapa)}
                className="w-4 h-4 rounded text-[#244231] bg-white border-2 border-[#315740] focus:ring-[#244231] cursor-pointer"
              />
              <span>{etapa}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ano / Série */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-2">
          Ano / Série (Selecione quantos forem aplicáveis)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-2 border-[#315740] p-3 rounded-lg bg-[#a8cbb4] max-h-40 overflow-y-auto shadow-sm">
          {ANOS_SERIES.map((ano) => {
            const habilitado = anosPermitidos.includes(ano);

            return (
              <label
                key={ano}
                className={`flex items-center space-x-2.5 text-sm font-bold ${
                  habilitado
                    ? "text-[#143021] cursor-pointer"
                    : "text-[#587363] cursor-not-allowed"
                }`}
              >
                <input
                  type="checkbox"
                  checked={(formData.ano_serie || []).includes(ano)}
                  disabled={!habilitado}
                  onChange={() => handleCheckboxToggle("ano_serie", ano)}
                  className="w-4 h-4 rounded text-[#244231] bg-white border-2 border-[#315740] focus:ring-[#244231] disabled:opacity-40"
                />
                <span>{ano}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Oferta de Ensino */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-2">
          Oferta de Ensino (Selecione quantas forem aplicáveis)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-2 border-[#315740] p-3 rounded-lg bg-[#a8cbb4] shadow-sm">
          {OFERTAS_ENSINO.map((oferta) => (
            <label
              key={oferta}
              className="flex items-center space-x-2.5 text-sm text-[#143021] font-bold cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(formData.oferta_ensino || []).includes(oferta)}
                onChange={() => handleCheckboxToggle("oferta_ensino", oferta)}
                className="w-4 h-4 rounded text-[#244231] bg-white border-2 border-[#315740] focus:ring-[#244231] cursor-pointer"
              />
              <span>{oferta}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Modalidade de Ensino */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-2">
          Modalidade de Ensino (Selecione quantas forem aplicáveis)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-2 border-[#315740] p-3 rounded-lg bg-[#a8cbb4] shadow-sm">
          {MODALIDADES_ENSINO.map((modalidade) => (
            <label
              key={modalidade}
              className="flex items-center space-x-2.5 text-sm text-[#143021] font-bold cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(formData.modalidade_ensino || []).includes(
                  modalidade,
                )}
                onChange={() =>
                  handleCheckboxToggle("modalidade_ensino", modalidade)
                }
                className="w-4 h-4 rounded text-[#244231] bg-white border-2 border-[#315740] focus:ring-[#244231] cursor-pointer"
              />
              <span>{modalidade}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Componentes Curriculares Envolvidos */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-2">
          Componente Curricular Envolvido (Marque quantos desejar)
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 border-2 border-[#315740] p-3 rounded-lg bg-[#a8cbb4] max-h-96 overflow-y-auto shadow-sm">
          {Object.entries(COMPONENTES_CURRICULARES).flatMap(([, componentes]) =>
            componentes.map((comp) => (
              <label
                key={comp}
                className="flex items-center space-x-2.5 text-sm text-[#143021] font-bold cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(formData.disciplinas || []).includes(comp)}
                  onChange={() => handleCheckboxToggle("disciplinas", comp)}
                  className="w-4 h-4 rounded text-[#244231] bg-white border-2 border-[#315740] focus:ring-[#244231] cursor-pointer"
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
            className="w-full p-2.5 text-sm border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm"
          />
        </div>
      </div>

      {/* Áreas de Conhecimento */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-2">
          Áreas de Conhecimento Envolvidas
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-2 border-[#315740] p-3 rounded-lg bg-[#a8cbb4] shadow-sm">
          {AREAS_CONHECIMENTO.map((area) => (
            <label
              key={area}
              className="flex items-center space-x-2.5 text-sm text-[#143021] font-bold cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(formData.areas_conhecimento || []).includes(area)}
                onChange={() =>
                  handleCheckboxToggle("areas_conhecimento", area)
                }
                className="w-4 h-4 rounded text-[#244231] bg-white border-2 border-[#315740] focus:ring-[#244231] cursor-pointer"
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
            className="w-full p-2.5 text-sm border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm"
          />
        </div>
      </div>

      {/* SELEÇÃO BNCC GERAL */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
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
          styles={customSelectStyles}
        />
      </div>

      {/* SELEÇÃO BNCC COMPUTAÇÃO */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
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
          styles={customSelectStyles}
        />
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
