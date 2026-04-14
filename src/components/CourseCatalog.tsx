import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown, Settings, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const CourseCatalog: React.FC = () => {
  const [selectedTurmaId, setSelectedTurmaId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('conteudos');

  const turmas = [
    {
      id: 1,
      title: "ISENTO - INTEGRANTES DO MPSP - MEMBRO E SERVIDOR(A)",
      period: "07/04/2026 11:00 até 31/08/2026 23:55"
    },
    {
      id: 2,
      title: "PAGANTE (parcelado) INTERESSADOS EM GERAL",
      period: "07/04/2026 11:00 até 31/08/2026 23:55"
    },
    {
      id: 3,
      title: "PAGANTE (à vista) INTERESSADOS EM GERAL",
      period: "07/04/2026 11:00 até 31/08/2026 23:55"
    }
  ];

  const tabContent: Record<string, React.ReactNode> = {
    conteudos: (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="w-6 h-6 rounded bg-brand/10 flex items-center justify-center text-brand font-bold text-[10.5px]">01</div>
          <span className="text-xs font-medium text-gray-700">Introdução ao Pensamento Jurídico Brasileiro</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="w-6 h-6 rounded bg-brand/10 flex items-center justify-center text-brand font-bold text-[10.5px]">02</div>
          <span className="text-xs font-medium text-gray-700">A Formação do Estado e o Direito</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="w-6 h-6 rounded bg-brand/10 flex items-center justify-center text-brand font-bold text-[10.5px]">03</div>
          <span className="text-xs font-medium text-gray-700">Estruturas Institucionais Contemporâneas</span>
        </div>
      </div>
    ),
    resumo: (
      <p className="text-xs text-gray-500 leading-relaxed italic">
        "Uma jornada intelectual que conecta o passado jurídico do Brasil com os desafios do presente, focando na construção de uma consciência crítica sobre nossas instituições."
      </p>
    ),
    autor: (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <img src="https://picsum.photos/seed/professor/100/100" alt="Autor" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#003366]">Dr. Roberto Silva</h4>
          <p className="text-[10.5px] text-gray-500">Doutor em Teoria do Direito e Pesquisador Sênior.</p>
        </div>
      </div>
    )
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#F3F4F6] p-4 font-sans"
    >
      {/* Breadcrumbs */}
      <nav className="text-[10.5px] mb-6 flex items-center gap-2 text-gray-400 uppercase tracking-[0.15em] font-bold">
        <span className="hover:text-gray-600 cursor-pointer transition-colors">Treinamentos</span>
        <span className="text-gray-300">/</span>
        <span className="text-brand">Todos</span>
      </nav>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg p-8 border border-gray-100 mb-6">
        <div className="flex flex-row flex-nowrap gap-12">
          {/* Left Sidebar Info */}
          <div className="flex-none w-64 flex flex-col gap-6">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm group">
              <img 
                src="https://picsum.photos/seed/law/300/400" 
                alt="Course Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-[#003366]/40 to-transparent flex flex-col items-center justify-end p-6 text-center">
                <span className="text-[9.5px] text-white/70 uppercase tracking-[0.2em] mb-1">Curso de Extensão</span>
                <h3 className="text-sm font-bold text-white leading-tight">TEORIA GERAL DO DIREITO</h3>
              </div>
            </div>

            {/* Compact Turmas List below photo */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest">Selecionar Turma</span>
                <Settings size={14} className="text-gray-300" />
              </div>
              
              <div className="space-y-2">
                {turmas.map((turma) => (
                  <button
                    key={turma.id}
                    onClick={() => setSelectedTurmaId(turma.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedTurmaId === turma.id 
                        ? 'border-brand bg-brand/5 shadow-sm' 
                        : 'border-gray-100 hover:border-gray-200 bg-gray-50/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                        selectedTurmaId === turma.id ? 'border-brand bg-brand' : 'border-gray-300 bg-white'
                      }`}>
                        {selectedTurmaId === turma.id && <div className="w-1 h-1 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1">
                        <div className={`text-[11.5px] font-bold leading-tight uppercase tracking-tight ${
                          selectedTurmaId === turma.id ? 'text-brand' : 'text-[#003366]'
                        }`}>
                          {turma.title}
                        </div>
                        <div className="text-[9.5px] text-gray-400 mt-1 font-medium tracking-wide">
                          {turma.period.split(' até ')[0]}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button className="w-full bg-brand text-white py-3.5 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95 flex items-center justify-center gap-2">
                  Fazer inscrição
                </button>
                <button className="w-full bg-white text-brand py-3.5 rounded-xl text-[11.5px] font-bold border border-brand/20 hover:bg-brand/5 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-[0.1em]">
                  Registrar interesse
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-4 border-t border-gray-50">
              <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Carga Horária</span>
              <span className="text-xs font-semibold text-[#003366]">36 horas e 00 minuto</span>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-2xl font-bold text-brand uppercase mb-6 leading-tight tracking-tight">
              2º CURSO DE EXTENSÃO EM TEORIA GERAL DO DIREITO: FORMAÇÃO DO PENSAMENTO INTELECTUAL BRASILEIRO
            </h1>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="leading-relaxed text-sm">
                Este curso propõe uma análise profunda das bases do pensamento intelectual brasileiro através da Teoria Geral do Direito. 
                Exploramos as conexões entre a formação jurídica e o desenvolvimento social do país, abordando temas fundamentais 
                para a compreensão da nossa estrutura institucional contemporânea.
              </p>
            </div>

            {/* Minimalist interactive tabs below description */}
            <div className="flex items-center gap-6 mt-6 mb-6 text-[10.5px] font-bold uppercase tracking-[0.1em]">
              <button 
                onClick={() => setActiveTab('conteudos')}
                className={`transition-all cursor-pointer ${activeTab === 'conteudos' ? 'text-brand' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Conteúdos
              </button>
              <span className="text-gray-200 font-light">|</span>
              <button 
                onClick={() => setActiveTab('resumo')}
                className={`transition-all cursor-pointer ${activeTab === 'resumo' ? 'text-brand' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Resumo
              </button>
              <span className="text-gray-200 font-light">|</span>
              <button 
                onClick={() => setActiveTab('autor')}
                className={`transition-all cursor-pointer ${activeTab === 'autor' ? 'text-brand' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Sobre o Autor
              </button>
            </div>

            {/* Tab Content Area */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="min-h-[120px]"
            >
              {tabContent[activeTab]}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
