import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import Step1 from "../components/forms/Step1";
import Step2 from "../components/forms/Step2";
import Step3 from "../components/forms/Step3";
import Step4 from "../components/forms/Step4";

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enviadoComSucesso, setEnviadoComSucesso] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    direc: "",
    municipio: "",
    inep_escola: "",
    nome_escola: "",
    telefone: "",
    email_institucional: "",
    nome_gestor: "",
    // Step 2
    nome_projeto: "",
    docente_responsavel: "",
    etapa_ensino: [],
    modalidade_ensino: [],
    ano_serie: [],
    qtd_estudantes: "",
    disciplinas: [],
    areas_conhecimento: [],
    habilidades_bncc: [],
    habilidades_bncc_computacao: [],
    link_projeto: "",
    // Step 3
    tipo_projeto: "",
    descricao_projeto: "",
    metodologia: "",
    ano_inicio: "",
    ano_fim: "",
    periodicidade: "",
    // Step 4
    resultados: "",
    concorda_lgpd: false,
    fotos_arquivos: [],
    descricao_fotos: "",
  });

  useEffect(() => {
    async function fetchEscolas() {
      try {
        const { data, error } = await supabase
          .from("escolas")
          .select("inep, escola, direc, municipio");

        if (error) throw error;
        setEscolas(data || []);
      } catch (err) {
        console.error("Erro ao carregar escolas:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEscolas();
  }, []);

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full bg-gray-50">
        <p className="text-gray-600 font-medium">Carregando formulário...</p>
      </div>
    );
  }

  // Tela exibida após o salvamento no Supabase
  if (enviadoComSucesso) {
    return (
      <div className="h-full bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Formulário Enviado!
          </h2>
          <p className="text-gray-600 text-sm">
            O projeto foi registrado com sucesso no banco de dados.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
          >
            Cadastrar Novo Projeto
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-100 p-4 md:p-6 flex items-center justify-center overflow-hidden">
      {/* Card do Formulário com Limite de Altura */}
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md flex flex-col max-h-full">
        {/* Barra de Progresso (Fixa no topo do card) */}
        <div className="p-6 pb-4 border-b border-gray-100 flex-none bg-white rounded-t-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
              Etapa {currentStep} de 4
            </span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
            <div
              style={{ width: `${(currentStep / 4) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-300"
            ></div>
          </div>
        </div>

        {/* ÁREA DO PASSO COM BARRA DE ROLAGEM */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {currentStep === 1 && (
            <Step1
              formData={formData}
              updateFormData={updateFormData}
              escolas={escolas}
              nextStep={nextStep}
            />
          )}

          {currentStep === 2 && (
            <Step2
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {currentStep === 3 && (
            <Step3
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {currentStep === 4 && (
            <Step4
              formData={formData}
              updateFormData={updateFormData}
              prevStep={prevStep}
              onSuccess={() => setEnviadoComSucesso(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
