import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown, CheckCircle2, Folder, PlaySquare, FileText, Video, Users, MonitorPlay, Box, UploadCloud, CheckSquare, Star, Award, Calendar, AlertCircle, RefreshCw, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomFieldsModal } from './CustomFieldsModal';
import { PaymentModal } from './PaymentModal';

export const CourseCatalog: React.FC = () => {
  const [selectedTurmaId, setSelectedTurmaId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('conteudos');
  const [isExpanded, setIsExpanded] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<'default' | 'payment' | 'rejected' | 'pending'>('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const turmas = [
    {
      id: 1,
      title: "ISENTO - INTEGRANTES DO MPSP - MEMBRO E SERVIDOR(A)",
      period: "Indeterminado",
      price: "Gratuito",
      vagas: "Ilimitadas"
    },
    {
      id: 2,
      title: "PAGANTE (parcelado) INTERESSADOS EM GERAL",
      period: "07/04/2026 11:00:00 até 31/04/2026 23:00:00",
      price: "R$ 500,00",
      vagas: "2 vagas"
    },
    {
      id: 3,
      title: "PAGANTE (à vista) INTERESSADOS EM GERAL",
      period: "07/04/2026 11:00:00 até 31/04/2026 23:00:00",
      price: "R$ 450,00",
      vagas: "10 vagas"
    }
  ];

  const conteudosList = [
    { type: 'Tópico', title: 'Módulo 1: Fundamentos', icon: <Folder size={14} /> },
    { type: 'Vídeos', title: 'Introdução ao Pensamento Jurídico Brasileiro', icon: <PlaySquare size={14} /> },
    { type: 'Documentos', title: 'Material de Apoio (PDF)', icon: <FileText size={14} /> },
    { type: 'Gravado', title: 'Aula Magna Gravada', icon: <Video size={14} /> },
    { type: 'Aula presencial', title: 'Encontro Presencial - Polo SP', icon: <Users size={14} /> },
    { type: 'Webconferência', title: 'Tira-dúvidas ao vivo', icon: <MonitorPlay size={14} /> },
    { type: 'Scorm', title: 'Módulo Interativo SCORM', icon: <Box size={14} /> },
    { type: 'Entrega de atividade', title: 'Trabalho de Conclusão de Módulo', icon: <UploadCloud size={14} /> },
    { type: 'Avaliação', title: 'Prova de Conhecimentos', icon: <CheckSquare size={14} /> },
    { type: 'Avaliação de reação/pesquisa', title: 'Pesquisa de Satisfação', icon: <Star size={14} /> },
    { type: 'Certificado', title: 'Emissão do Certificado', icon: <Award size={14} /> }
  ];

  const tabContent: Record<string, React.ReactNode> = {
    conteudos: (
      <div className="flex flex-col">
        {/* Table Header */}
        <div className="flex items-center justify-between pb-2 mb-1 border-b border-gray-200 pr-2">
          <div className="w-[260px] flex-shrink-0 pl-1">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Tipo</span>
          </div>
          <div className="flex-1 text-left pl-4">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Conteúdo</span>
          </div>
        </div>
        
        {/* Table Body */}
        <div className="flex flex-col pb-4">
          {conteudosList.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50/50 group"
            >
              <div className="flex items-center gap-3 w-[260px] flex-shrink-0">
                <div className="w-6 h-6 rounded bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold text-brand uppercase tracking-wide truncate">
                  {item.type}
                </span>
              </div>
              <div className="flex-1 text-left pl-4">
                <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors line-clamp-1">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
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
      className="p-4 font-sans"
    >
      {/* Breadcrumbs */}
      <nav className="text-[10.5px] mb-6 flex items-center gap-2 text-gray-400 uppercase tracking-[0.15em] font-bold">
        <span className="hover:text-gray-600 cursor-pointer transition-colors">Treinamentos</span>
        <span className="text-gray-300">/</span>
        <span className="text-brand">Todos</span>
      </nav>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-6">
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

            <div className="flex flex-col gap-1 pb-4 border-b border-gray-100">
              <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Carga Horária</span>
              <span className="text-xs font-semibold text-[#003366]">36 horas e 00 minuto</span>
            </div>

            {/* Compact Turmas List below photo */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest">
                  {enrollmentStatus === 'default' ? 'Selecionar Turma' : 'Turma Selecionada'}
                </span>
              </div>
              
              <div className="space-y-2">
                {turmas.length === 0 ? (
                  <div className="text-center p-4 border border-dashed border-gray-200 rounded-lg text-gray-400 text-xs font-medium">
                    Nenhuma turma cadastrada
                  </div>
                ) : (
                  turmas
                    .filter(t => enrollmentStatus === 'default' || t.id === selectedTurmaId)
                    .map((turma) => (
                    <button
                      key={turma.id}
                      onClick={() => enrollmentStatus === 'default' && setSelectedTurmaId(turma.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all cursor-pointer ${
                        selectedTurmaId === turma.id 
                          ? 'border-2 border-brand bg-brand/10 shadow-md' 
                          : 'border border-gray-100 hover:border-gray-200 bg-gray-50/30'
                      } ${enrollmentStatus !== 'default' ? 'cursor-default opacity-90' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                          selectedTurmaId === turma.id ? 'border-brand bg-brand' : 'border-gray-300 bg-white'
                        }`}>
                          {selectedTurmaId === turma.id && <div className="w-1 h-1 rounded-full bg-white" />}
                        </div>
                        <div className="flex-1">
                          <div className={`text-[11px] font-bold leading-tight uppercase tracking-tight mb-2.5 ${
                            selectedTurmaId === turma.id ? 'text-brand' : 'text-[#003366]'
                          }`}>
                            {turma.title}
                          </div>
                          
                          <div className="flex items-start gap-1.5 mb-3">
                            <Calendar size={12} className="text-gray-400 mt-0.5 flex-shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">Prazo de inscrição</span>
                              <span className="text-[10px] text-gray-600 font-medium leading-none">{turma.period}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2.5 border-t border-gray-100/80">
                            <span className="text-[9.5px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">{turma.vagas}</span>
                            <span className="text-[11px] font-bold text-gray-700">{turma.price}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="flex flex-col gap-2 mt-2">
                {enrollmentStatus === 'default' && (
                  <>
                    <button 
                      onClick={() => setEnrollmentStatus('payment')}
                      className="w-full bg-brand text-white py-3.5 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Fazer inscrição
                    </button>
                    <button className="w-full bg-white text-brand py-3.5 rounded-xl text-[11.5px] font-bold border border-brand/20 hover:bg-brand/5 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-[0.1em] cursor-pointer">
                      Registrar interesse
                    </button>
                  </>
                )}

                {enrollmentStatus === 'payment' && (
                  <button 
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full bg-brand text-white py-3.5 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard size={14} />
                    Efetuar pagamento
                  </button>
                )}

                <AnimatePresence mode="wait">
                  {enrollmentStatus === 'rejected' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-3 overflow-hidden"
                    >
                      <div className="bg-red-50 border border-red-100 p-3.5 rounded-xl flex items-start gap-3">
                        <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Matrícula Recusada</span>
                          <span className="text-[11px] text-red-600 leading-relaxed font-medium">
                            Sua matrícula não foi aprovada pelo gestor. Verifique os dados e tente novamente.
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-brand text-white py-3.5 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <RefreshCw size={14} />
                        Reenviar campos
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {enrollmentStatus === 'pending' && (
                  <button 
                    disabled
                    className="w-full bg-gray-200 text-gray-400 py-3.5 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 cursor-not-allowed mt-2"
                  >
                    Aguardando aprovação
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-2xl font-bold text-brand uppercase mb-6 leading-tight tracking-tight">
              2º CURSO DE EXTENSÃO EM TEORIA GERAL DO DIREITO: FORMAÇÃO DO PENSAMENTO INTELECTUAL BRASILEIRO
            </h1>

            <div className="relative">
              <motion.div 
                initial={false}
                animate={{ height: isExpanded ? 'auto' : '4.5em' }}
                className="overflow-hidden relative"
              >
                <div className="prose prose-sm text-gray-600 max-w-none">
                  <p className="leading-relaxed text-sm mb-4">
                    Este curso propõe uma análise profunda das bases do pensamento intelectual brasileiro através da Teoria Geral do Direito. 
                    Exploramos as conexões entre a formação jurídica e o desenvolvimento social do país, abordando temas fundamentais 
                    para a compreensão da nossa estrutura institucional contemporânea.
                  </p>
                  <p className="leading-relaxed text-sm mb-4">
                    Durante os encontros, debateremos as obras dos principais juristas e sociólogos que moldaram a compreensão do Estado brasileiro. A metodologia inclui análise de jurisprudência histórica, debates guiados e seminários de pesquisa, exigindo do aluno uma postura ativa e crítica em relação ao material bibliográfico.
                  </p>
                  <img src="https://picsum.photos/seed/law/800/400" alt="Biblioteca jurídica" className="w-full rounded-lg my-6 object-cover max-h-[300px]" referrerPolicy="no-referrer" />
                  <p className="leading-relaxed text-sm">
                    O objetivo central é fornecer um arcabouço teórico robusto que permita aos profissionais do direito não apenas aplicar a norma, mas compreender sua gênese, sua função social e suas limitações dentro do contexto histórico e cultural do Brasil.
                  </p>
                </div>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
              </motion.div>
              
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 flex items-center gap-1 text-[10.5px] font-bold text-brand uppercase tracking-[0.15em] hover:text-brand-dark transition-colors cursor-pointer"
              >
                {isExpanded ? (
                  <>Ver menos <ChevronUp size={14} /></>
                ) : (
                  <>Ver mais <ChevronDown size={14} /></>
                )}
              </button>
            </div>

            {/* Minimalist interactive tabs below description */}
            <div className="relative flex items-center mt-6 mb-4 border-b border-gray-100">
              {[
                { id: 'conteudos', label: 'Conteúdos' },
                { id: 'resumo', label: 'Resumo' },
                { id: 'autor', label: 'Sobre o Autor' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                    activeTab === tab.id ? 'text-brand' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
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
      {/* Custom Fields Modal */}
      <CustomFieldsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={() => {
          setIsModalOpen(false);
          setEnrollmentStatus('pending');
        }} 
      />

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        itemName="TEORIA GERAL DO DIREITO"
        itemPrice={10.00}
        onSuccess={() => {
          setIsPaymentModalOpen(false);
          setEnrollmentStatus('rejected'); // Simulate the error state after payment for testing
        }}
      />
    </motion.div>
  );
};
