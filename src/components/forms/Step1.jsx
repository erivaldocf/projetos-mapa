import React, { useState } from "react";
import Select from "react-select";

import { DIRECS } from "../../constants/formOptions";

export default function Step1({ formData, updateFormData, escolas, nextStep }) {
  const [erroEscola, setErroEscola] = useState(false);
  // 1. Filtra as escolas pertencentes à DIREC selecionada
  const escolasDaDirec = formData.direc
    ? escolas.filter((item) => item.direc === formData.direc)
    : [];

  // 2. Extrai a lista de municípios únicos disponíveis dentro da DIREC selecionada
  const municipiosDisponiveis = Array.from(
    new Set(escolasDaDirec.map((item) => item.municipio)),
  )
    .filter(Boolean)
    .sort();
  // 3. Filtra as escolas pertencentes ao Município selecionado
  const escolasFiltradas = formData.municipio
    ? escolasDaDirec.filter((item) => item.municipio === formData.municipio)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.inep_escola) {
      setErroEscola(true);
      return;
    }

    setErroEscola(false);
    nextStep();
  };

  // Trata a alteração da DIREC (limpa Município e Escola)
  const handleDirecChange = (e) => {
    updateFormData({
      direc: e.target.value,
      municipio: "",
      inep_escola: "",
      nome_escola: "",
    });
  };

  // Trata a alteração do Município (limpa Escola)
  const handleMunicipioChange = (e) => {
    updateFormData({
      municipio: e.target.value,
      inep_escola: "",
      nome_escola: "",
    });
  };

  // Trata a seleção da Escola (guarda o INEP e o Nome internamente)
  const handleEscolaChange = (option) => {
    if (!option) {
      setErroEscola(true);
      updateFormData({
        inep_escola: "",
        nome_escola: "",
      });
      return;
    }

    setErroEscola(false);

    const escola = escolas.find(
      (item) => String(item.inep) === String(option.value),
    );

    updateFormData({
      inep_escola: option.value,
      nome_escola: escola?.escola || "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-[#122318] border-b-2 border-[#8fb99f] pb-2">
        Identificação da Escola e da Gestão
      </h2>

      {/* 1. SELEÇÃO DE DIREC */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          DIREC
        </label>
        <select
          value={formData.direc || ""}
          onChange={handleDirecChange}
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 font-semibold shadow-sm"
        >
          <option value="">Selecione a DIREC...</option>
          {DIRECS.map((direc) => (
            <option key={direc} value={direc}>
              {direc}
            </option>
          ))}
        </select>
      </div>

      {/* 2. SELEÇÃO DE MUNICÍPIO */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Município
        </label>
        <select
          value={formData.municipio || ""}
          onChange={handleMunicipioChange}
          disabled={!formData.direc}
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 font-semibold shadow-sm disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          <option value="">
            {formData.direc
              ? "Selecione o município..."
              : "Selecione uma DIREC primeiro"}
          </option>
          {municipiosDisponiveis.map((mun) => (
            <option key={mun} value={mun}>
              {mun}
            </option>
          ))}
        </select>
      </div>

      {/* 3. SELEÇÃO DE ESCOLA */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Escola
        </label>

        <Select
          isDisabled={!formData.municipio}
          placeholder={
            formData.municipio
              ? "Digite o nome da escola..."
              : "Selecione um município primeiro"
          }
          options={escolasFiltradas.map((item) => ({
            value: item.inep,
            label: item.escola,
          }))}
          value={
            formData.inep_escola
              ? escolasFiltradas
                  .map((item) => ({
                    value: item.inep,
                    label: item.escola,
                  }))
                  .find(
                    (op) => String(op.value) === String(formData.inep_escola),
                  )
              : null
          }
          onChange={handleEscolaChange}
          isSearchable
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: state.isDisabled ? "#e5e7eb" : "#ffffff",
              borderWidth: "2px",
              borderColor: erroEscola ? "#dc2626" : state.isFocused ? "#244231" : "#315740",
              borderRadius: "0.5rem",
              padding: "2px",
              boxShadow: state.isFocused ? "0 0 0 2px rgba(36, 66, 49, 0.3)" : "none",
              "&:hover": {
                borderColor: erroEscola ? "#dc2626" : "#244231",
              },
            }),
            singleValue: (base) => ({
              ...base,
              color: "#111827",
              fontWeight: 600,
            }),
            placeholder: (base) => ({
              ...base,
              color: "#4b5563",
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
          }}
        />
        {erroEscola && (
          <p className="mt-1 text-sm font-bold text-red-700">Selecione uma escola.</p>
        )}
      </div>

      {/* Telefone */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Telefone (de preferência WhatsApp)
        </label>
        <input
          type="tel"
          value={formData.telefone || ""}
          onChange={(e) => updateFormData({ telefone: e.target.value })}
          placeholder="(84) 99999-9999"
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm"
        />
      </div>

      {/* E-mail Institucional */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          E-mail Institucional (@educar.rn.gov.br)
        </label>
        <input
          type="email"
          value={formData.email_institucional || ""}
          onChange={(e) =>
            updateFormData({ email_institucional: e.target.value })
          }
          placeholder="exemplo@educar.rn.gov.br"
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm"
        />
      </div>

      {/* Nome do Gestor */}
      <div>
        <label className="block text-sm font-bold text-[#143021] mb-1.5">
          Nome do Gestor da Escola
        </label>
        <input
          type="text"
          value={formData.nome_gestor || ""}
          onChange={(e) => updateFormData({ nome_gestor: e.target.value })}
          placeholder="Nome completo do gestor"
          required
          className="w-full p-2.5 border-2 border-[#315740] rounded-lg focus:ring-2 focus:ring-[#244231] focus:border-[#244231] bg-white text-gray-900 placeholder-gray-500 font-semibold shadow-sm"
        />
      </div>

      {/* Botão Próximo */}
      <div className="flex justify-end pt-4">
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