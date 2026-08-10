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
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
        Identificação da Escola e da Gestão
      </h2>

      {/* 1. SELEÇÃO DE DIREC */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          DIREC
        </label>
        <select
          value={formData.direc || ""}
          onChange={handleDirecChange}
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Município
        </label>
        <select
          value={formData.municipio || ""}
          onChange={handleMunicipioChange}
          disabled={!formData.direc}
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
            control: (base) => ({
              ...base,
              borderColor: erroEscola ? "#dc2626" : base.borderColor,
              boxShadow: erroEscola ? "0 0 0 1px #dc2626" : base.boxShadow,
              "&:hover": {
                borderColor: erroEscola ? "#dc2626" : base.borderColor,
              },
            }),
          }}
        />
        {erroEscola && (
          <p className="mt-1 text-sm text-red-600">Selecione uma escola.</p>
        )}
      </div>

      {/* Telefone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone (de preferência WhatsApp)
        </label>
        <input
          type="tel"
          value={formData.telefone || ""}
          onChange={(e) => updateFormData({ telefone: e.target.value })}
          placeholder="(84) 99999-9999"
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* E-mail Institucional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Nome do Gestor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Gestor da Escola
        </label>
        <input
          type="text"
          value={formData.nome_gestor || ""}
          onChange={(e) => updateFormData({ nome_gestor: e.target.value })}
          placeholder="Nome completo do gestor"
          required
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Botão Próximo */}
      <div className="flex justify-end pt-4">
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
