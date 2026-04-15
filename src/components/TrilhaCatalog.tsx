import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Folder, PlaySquare, FileText, Video, Users, MonitorPlay, Box, UploadCloud, CheckSquare, Star, Award, Layers, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import { CustomFieldsModal } from './CustomFieldsModal';

export const TrilhaCatalog: React.FC = () => {
  const [selectedTurmaId, setSelectedTurmaId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('conteudos');
  const [isExpanded, setIsExpanded] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<'default' | 'rejected' | 'pending'>('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Accordion state: stores the IDs of expanded items (etapas or treinamentos)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'etapa-1': true // Expand the first one by default
  });

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const turmas = [
    {
      id: 1,
      title: "TURMA 1 - TRILHA DE LIDERANÇA",
      period: "Indeterminado",
      price: "Gratuito",
      vagas: "Ilimitadas"
    },
    {
      id: 2,
      title: "TURMA 2 - TRILHA DE LIDERANÇA (VAGAS REMANESCENTES)",
      period: "15/05/2026 08:00:00 até 15/12/2026 23:55:00",
      price: "R$ 1.200,00",
      vagas: "50 vagas"
    }
  ];

  const etapas = [
    {
      id: 'etapa-1',
      title: 'Etapa 1: Fundamentos da Liderança',
      contents: [
        { id: 'c1', type: 'Documento', title: 'Guia da Trilha (PDF)', icon: <FileText size={14} /> },
        { id: 'c2', type: 'Vídeo', title: 'Boas-vindas com a Diretoria', icon: <PlaySquare size={14} /> },
        { 
          id: 't1', 
          type: 'Treinamento', 
          title: 'Treinamento: O Papel do Líder', 
          icon: <Layers size={14} />,
          subContents: [
            { id: 'sc1', type: 'Material de apoio', title: 'Módulo 1: Autoconhecimento', icon: <Folder size={14} /> },
            { id: 'sc2', type: 'Vídeo', title: 'Estilos de Liderança', icon: <PlaySquare size={14} /> },
            { id: 'sc3', type: 'Avaliação', title: 'Teste de Perfil Comportamental', icon: <CheckSquare size={14} /> }
          ]
        },
        { id: 'c3', type: 'Material de apoio', title: 'Artigo Complementar', icon: <Folder size={14} /> }
      ]
    },
    {
      id: 'etapa-2',
      title: 'Etapa 2: Gestão de Equipes',
      contents: [
        { id: 'c4', type: 'Scorm', title: 'Módulo Interativo: Feedback Efetivo', icon: <Box size={14} /> },
        { 
          id: 't2', 
          type: 'Treinamento', 
          title: 'Treinamento: Comunicação Não Violenta', 
          icon: <Layers size={14} />,
          subContents: [
            { id: 'sc4', type: 'Aula presencial', title: 'Workshop de CNV', icon: <Users size={14} /> },
            { id: 'sc5', type: 'Documento', title: 'Material de Apoio', icon: <FileText size={14} /> }
          ]
        },
        { id: 'c5', type: 'Avaliação de reação/pesquisa', title: 'Pesquisa de Clima Simulado', icon: <Star size={14} /> },
        { id: 'c6', type: 'Webconferência', title: 'Mentoria em Grupo', icon: <MonitorPlay size={14} /> }
      ]
    },
    {
      id: 'etapa-3',
      title: 'Etapa 3: Prática e Encerramento',
      contents: [
        { id: 'c7', type: 'Webinar', title: 'Webinar Gravado: Resolução de Conflitos', icon: <Video size={14} /> },
        { id: 'c8', type: 'Entrega de atividade', title: 'Projeto Final: Plano de Ação', icon: <UploadCloud size={14} /> },
        { id: 'c9', type: 'Avaliação', title: 'Avaliação Final da Trilha', icon: <CheckSquare size={14} /> },
        { id: 'c10', type: 'Certificado', title: 'Emissão do Certificado', icon: <Award size={14} /> }
      ]
    }
  ];

  const tabContent: Record<string, React.ReactNode> = {
    conteudos: (
      <div className="flex flex-col gap-3 pb-4">
        {etapas.map(etapa => (
          <div key={etapa.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
            <button 
              onClick={() => toggleItem(etapa.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-100 cursor-pointer z-10"
            >
              <span className="text-xs font-bold text-[#003366] uppercase tracking-wide">{etapa.title}</span>
              <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                {expandedItems[etapa.id] ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {expandedItems[etapa.id] && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col overflow-hidden"
                >
                  {/* Table Header */}
                  <div className="flex items-center px-4 py-2.5 bg-gray-50/50 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[240px]">Tipo</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-4">Conteúdos</span>
                  </div>
                  
                  <div className="flex flex-col divide-y divide-gray-100">
                    {etapa.contents.map(content => (
                      <div key={content.id} className="flex flex-col">
                        {content.type === 'Treinamento' ? (
                          // Treinamento Accordion
                          <div className="flex flex-col bg-brand/5">
                            <button 
                              onClick={() => toggleItem(content.id)}
                              className="w-full flex items-center px-4 py-3 hover:bg-brand/10 transition-colors group cursor-pointer"
                            >
                              <div className="flex items-center gap-3 w-[240px] flex-shrink-0">
                                <div className="w-6 h-6 rounded bg-brand flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                                  {content.icon}
                                </div>
                                <span className="text-[11px] font-bold text-brand uppercase tracking-wide truncate">{content.type}</span>
                              </div>
                              <div className="flex-1 flex items-center justify-between pl-4">
                                <span className="text-xs font-bold text-gray-800 group-hover:text-brand transition-colors text-left line-clamp-1">{content.title}</span>
                                <div className="w-5 h-5 rounded-full bg-white/50 flex items-center justify-center text-brand flex-shrink-0 ml-2">
                                  {expandedItems[content.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </div>
                              </div>
                            </button>
                            
                            <AnimatePresence initial={false}>
                              {expandedItems[content.id] && content.subContents && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: "easeInOut" }}
                                  className="flex flex-col divide-y divide-gray-100/50 bg-white/50 overflow-hidden"
                                >
                                  {content.subContents.map(sub => (
                                    <div key={sub.id} className="flex items-center px-4 py-2.5 hover:bg-white transition-colors group">
                                      <div className="flex items-center gap-3 w-[240px] flex-shrink-0 pl-6">
                                        <div className="w-5 h-5 rounded bg-gray-200/70 flex items-center justify-center text-gray-500 flex-shrink-0">
                                          {sub.icon}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide truncate">{sub.type}</span>
                                      </div>
                                      <div className="flex-1 text-left pl-4">
                                        <span className="text-[11.5px] font-medium text-gray-600 group-hover:text-gray-900 line-clamp-1">{sub.title}</span>
                                      </div>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          // Regular Content
                          <div className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-3 w-[240px] flex-shrink-0">
                              <div className="w-6 h-6 rounded bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                                {content.icon}
                              </div>
                              <span className="text-[11px] font-bold text-brand uppercase tracking-wide truncate">{content.type}</span>
                            </div>
                            <div className="flex-1 text-left pl-4">
                              <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors line-clamp-1">{content.title}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    ),
    resumo: (
      <p className="text-xs text-gray-500 leading-relaxed italic">
        "Uma jornada completa de desenvolvimento para formar os líderes do futuro, combinando teoria, prática e autoconhecimento em uma trilha estruturada e imersiva."
      </p>
    ),
    autor: (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <img src="https://picsum.photos/seed/leader/100/100" alt="Autor" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#003366]">Equipe de Desenvolvimento Humano</h4>
          <p className="text-[10.5px] text-gray-500">Especialistas em Liderança e Gestão de Pessoas.</p>
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
        <span className="hover:text-gray-600 cursor-pointer transition-colors">Trilhas</span>
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
                src="https://picsum.photos/seed/leadership/300/400" 
                alt="Trilha Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-[#003366]/40 to-transparent flex flex-col items-center justify-end p-6 text-center">
                <span className="text-[9.5px] text-white/70 uppercase tracking-[0.2em] mb-1">Trilha de Formação</span>
                <h3 className="text-sm font-bold text-white leading-tight">LIDERANÇA DO FUTURO</h3>
              </div>
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
                      onClick={() => setEnrollmentStatus('rejected')}
                      className="w-full bg-brand text-white py-3.5 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Fazer inscrição
                    </button>
                    <button className="w-full bg-white text-brand py-3.5 rounded-xl text-[11.5px] font-bold border border-brand/20 hover:bg-brand/5 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-[0.1em] cursor-pointer">
                      Registrar interesse
                    </button>
                  </>
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

            <div className="flex flex-col gap-1 pt-4 border-t border-gray-50">
              <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest">Carga Horária</span>
              <span className="text-xs font-semibold text-[#003366]">120 horas e 00 minuto</span>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-2xl font-bold text-brand uppercase mb-6 leading-tight tracking-tight">
              TRILHA DE FORMAÇÃO: LIDERANÇA DO FUTURO
            </h1>

            <div className="relative">
              <motion.div 
                initial={false}
                animate={{ height: isExpanded ? 'auto' : '4.5em' }}
                className="overflow-hidden relative"
              >
                <div className="prose prose-sm text-gray-600 max-w-none">
                  <p className="leading-relaxed text-sm mb-4">
                    Esta trilha foi desenhada para desenvolver as competências essenciais dos líderes da nossa organização. 
                    Através de uma jornada estruturada em etapas, você passará por fundamentos teóricos, práticas de gestão 
                    de equipes e resolução de conflitos, combinando diversos formatos de conteúdo e treinamentos imersivos.
                  </p>
                  <p className="leading-relaxed text-sm mb-4">
                    A liderança contemporânea exige mais do que apenas conhecimento técnico; exige empatia, visão estratégica e a capacidade de inspirar pessoas. Neste programa, mergulharemos profundamente nas metodologias ágeis de gestão de pessoas, explorando casos reais e simulando cenários desafiadores que os gestores enfrentam no dia a dia corporativo.
                  </p>
                  <img src="https://picsum.photos/seed/teamwork/800/400" alt="Equipe colaborando" className="w-full rounded-lg my-6 object-cover max-h-[300px]" referrerPolicy="no-referrer" />
                  <p className="leading-relaxed text-sm">
                    Ao final desta trilha, espera-se que o participante esteja apto a conduzir reuniões de feedback de alto impacto, mediar conflitos complexos e estruturar planos de desenvolvimento individual (PDI) para seus liderados, alinhando os objetivos pessoais aos objetivos estratégicos da empresa.
                  </p>
                </div>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
              </motion.div>
              
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 text-[9.5px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-brand transition-colors cursor-pointer"
              >
                {isExpanded ? 'Ver menos' : 'Ver mais'}
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
                      layoutId="activeTabIndicatorTrilha"
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
    </motion.div>
  );
};
