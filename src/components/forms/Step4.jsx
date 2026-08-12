import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";

export default function Step4({
  formData,
  updateFormData,
  prevStep,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [erroMsg, setErroMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.concorda_lgpd) {
      alert(
        "Você precisa declarar o consentimento da LGPD e ECA Digital para enviar.",
      );
      return;
    }

    setLoading(true);
    setErroMsg("");

    try {
      // Monta o objeto com os nomes exatos das colunas do Supabase
      const payload = {
        inep_escola: Number(formData.inep_escola),
        nome_gestor: formData.nome_gestor,
        email_institucional: formData.email_institucional,
        telefone: formData.telefone,

        nome_projeto: formData.nome_projeto,
        responsavel: formData.responsavel,
        link_projeto: formData.link_projeto || "",
        etapa_ensino: Array.isArray(formData.etapa_ensino)
          ? formData.etapa_ensino.join(", ")
          : formData.etapa_ensino || "",

        oferta_ensino: Array.isArray(formData.oferta_ensino)
          ? formData.oferta_ensino.join(", ")
          : formData.oferta_ensino || "",

        modalidade_ensino: Array.isArray(formData.modalidade_ensino)
          ? formData.modalidade_ensino.join(", ")
          : formData.modalidade_ensino || "",

        ano_serie: Array.isArray(formData.ano_serie)
          ? formData.ano_serie.join(", ")
          : formData.ano_serie || "",
        qtd_estudantes: Number(formData.qtd_estudantes) || 0,
        qtd_professores: Number(formData.qtd_professores) || 0,

        // Converte os arrays de disciplinas e áreas em texto (separados por vírgula)
        disciplinas: Array.isArray(formData.disciplinas)
          ? formData.disciplinas.join(", ")
          : formData.disciplinas || "",
        areas_conhecimento: Array.isArray(formData.areas_conhecimento)
          ? formData.areas_conhecimento.join(", ")
          : formData.areas_conhecimento || "",

        habilidades_bncc: Array.isArray(formData.habilidades_bncc)
          ? formData.habilidades_bncc.join(", ")
          : formData.habilidades_bncc || "",

        habilidades_bncc_computacao: Array.isArray(
          formData.habilidades_bncc_computacao,
        )
          ? formData.habilidades_bncc_computacao.join(", ")
          : formData.habilidades_bncc_computacao || "",
        descricao_projeto: formData.descricao_projeto,
        metodologia: formData.metodologia,
        objetivo: formData.objetivo,
        ano_inicio: Number(formData.ano_inicio) || new Date().getFullYear(),
        ano_fim: formData.ano_fim ? Number(formData.ano_fim) : null,
        periodicidade: formData.periodicidade,

        resultados: formData.resultados || "",
        // Nome correto da coluna conforme criado no Supabase:
        concorda_lgpd: Boolean(formData.concorda_lgpd),
      };

      // Envia os dados para a tabela 'projetos'
      const { error } = await supabase.from("projetos").insert([payload]);

      if (error) throw error;

      onSuccess();
    } catch (err) {
      console.error("Erro ao salvar projeto:", err);
      setErroMsg(err.message || "Ocorreu um erro ao enviar os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
        Link do Projeto
      </h2>

      {erroMsg && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-lg">
          {erroMsg}
        </div>
      )}

      {/* Aviso LGPD / ECA Digital */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-bold text-amber-900 flex items-center gap-1">
          ⚠️ Aviso Importante sobre Uso de Imagens (LGPD e ECA Digital)
        </h3>
        <p className="text-xs text-amber-800 leading-relaxed">
          Certifique-se de que todas as fotos enviadas possuem os devidos Termos
          de Autorização de Uso de Imagem assinados pelos pais ou responsáveis
          legais (no caso de menores de idade), em conformidade com a Lei Geral
          de Proteção de Dados (LGPD - Lei nº 13.709/2018) e as diretrizes do
          ECA Digital. Não publique fotos que exponham os estudantes de forma
          indevida ou vexatória.
        </p>

        <label className="flex items-start space-x-2 pt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.concorda_lgpd || false}
            onChange={(e) =>
              updateFormData({ concorda_lgpd: e.target.checked })
            }
            required
            className="mt-1 rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs font-semibold text-gray-800">
            Declaro que as fotografias enviadas possuem autorização de uso de
            imagem e estão de acordo com as normas da LGPD e do ECA Digital.
          </span>
        </label>
      </div>

      {/* Link do Projeto */}
      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link do Projeto{" "}
          <span className="text-gray-400 font-normal">(Opcional)</span>
        </label>

        <input
          type="url"
          value={formData.link_projeto || ""}
          onChange={(e) => updateFormData({ link_projeto: e.target.value })}
          placeholder="Ex: https://drive.google.com/..."
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />

        <p className="text-xs text-gray-500 mt-1">
          Informe o link para acessar materiais, documentos, vídeos ou outras
          informações relacionadas ao projeto.
        </p>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={loading}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50"
        >
          ← Voltar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? "Enviando..." : "Finalizar e Enviar ✓"}
        </button>
      </div>
    </form>
  );
}
