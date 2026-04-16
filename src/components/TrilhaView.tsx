import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PerformanceDashboard } from './PerformanceDashboard';
import { 
  Menu, X, ChevronLeft, ChevronRight, Play, FileText, Video, 
  HelpCircle, MonitorPlay, MessageSquare, ChevronDown, Check,
  Target, Layers, BookOpen, Star, ArrowLeft, CheckCircle2, Circle,
  Info, BarChart3, Paperclip, User
} from 'lucide-react';
import { SidebarContentIndicator, ContentTypeLabel } from './SidebarContentIndicator';

// --- Types for our nested structure ---
type ContentType = ContentTypeLabel;

interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  completed: boolean;
}

type EtapaItem = ContentItem;

interface Etapa {
  id: string;
  number: number;
  title: string;
  progress: number; // 0-100
  items: EtapaItem[];
}

const mockTrilha: Etapa[] = [
  {
    id: 'e1',
    number: 1,
    title: 'INTRODUÇÃO',
    progress: 100,
    items: [
      { id: 'c1', type: 'Vídeos', title: 'Vídeo de Boas-vindas', completed: true },
      { id: 'c2', type: 'Documentos', title: 'Guia do Aluno', completed: true },
    ]
  },
  {
    id: 'e2',
    number: 2,
    title: 'APROVAÇÃO DE TICKETS',
    progress: 85,
    items: [
      { id: 'c3', type: 'Scorm', title: 'Módulo Interativo', completed: true },
      { id: 't1', type: 'Treinamento', title: 'Treinamento de Fluxos', completed: false },
      { id: 'c4', type: 'Avaliação', title: 'Teste de Conhecimento', completed: false },
    ]
  },
  {
    id: 'e3',
    number: 3,
    title: 'BASE DE CONHECIMENTO',
    progress: 90,
    items: [
      { id: 'c5', type: 'Vídeos', title: 'Como pesquisar artigos', completed: true },
      { id: 'c6', type: 'Tópico', title: 'Fórum de Discussão', completed: true },
    ]
  },
  {
    id: 'e4',
    number: 4,
    title: 'CONTRATO DE HORAS',
    progress: 21,
    items: [
      { id: 'c7', type: 'Documentos', title: 'Leitura Obrigatória', completed: false },
      { id: 'c8', type: 'Vídeos', title: 'Aula Prática', completed: false },
    ]
  }
];

const MiniCircularProgress = ({ percentage, label, color = "var(--brand-color)" }: { percentage: number, label: string, color?: string }) => {
  const size = 18;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  return (
    <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-brand/70">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-brand/10"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[7.5px] font-black uppercase">{label}</span>
        </div>
      </div>
      <span className="tabular-nums">{percentage}%</span>
    </div>
  );
};

export const TrilhaView: React.FC<{ completedTrainings?: string[], onNavigateToTraining?: () => void }> = ({ completedTrainings = [], onNavigateToTraining }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('descricao');
  
  const [expandedEtapas, setExpandedEtapas] = useState<Record<string, boolean>>({
    'e1': false,
    'e2': true,
  });

  const [activeContentId, setActiveContentId] = useState('t1');

  const toggleEtapa = (id: string) => {
    setExpandedEtapas(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getActiveContent = () => {
    for (const etapa of mockTrilha) {
      for (const item of etapa.items) {
        if (item.id === activeContentId) return item;
      }
    }
    return { title: 'Conteúdo', completed: false };
  };

  const activeLesson = getActiveContent();

  const tabs = [
    { id: 'descricao', label: 'Descrição', icon: <Info size={14} /> },
    { id: 'desempenho', label: 'Desempenho', icon: <BarChart3 size={14} /> },
    { id: 'resumo', label: 'Resumo', icon: <BookOpen size={14} /> },
    { id: 'material', label: 'Material Complementar', icon: <Paperclip size={14} /> },
    { id: 'autor', label: 'Autor', icon: <User size={14} /> },
  ];

  const renderContentItem = (lesson: ContentItem, isNested: boolean) => {
    const isActive = activeContentId === lesson.id;
    // Also consider it completed if its ID is in completedTrainings
    const isCompleted = lesson.completed || completedTrainings.includes(lesson.id);
    
    const handleContentClick = () => {
      setActiveContentId(lesson.id);
      if (lesson.type === 'Treinamento' && onNavigateToTraining) {
        onNavigateToTraining();
      }
    };

    return (
      <div
        key={lesson.id}
        onClick={handleContentClick}
        className={`w-full text-left p-4 border-b border-gray-100/50 transition-all relative group cursor-pointer ${
          isActive ? 'bg-brand/5' : isCompleted ? 'bg-green-50/50' : 'hover:bg-gray-100/50'
        } ${isNested ? 'pl-8 bg-gray-50/50 shadow-inner' : ''}`}
      >
        {isActive && (
          <motion.div 
            layoutId="activeLessonIndicatorTrilha"
            className="absolute left-0 top-0 bottom-0 w-1 bg-brand" 
          />
        )}
        
        <div className="flex items-start gap-3">
          <button 
            className={`mt-1 flex-none transition-all hover:scale-110 active:scale-90 cursor-pointer ${
              isCompleted ? 'text-green-500' : isActive ? 'text-brand' : 'text-gray-400'
            }`}
            title="Status do conteúdo"
          >
            {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
          </button>
          
          <div className="flex-1 min-w-0 relative h-full flex flex-col justify-between">
            <div className="flex justify-between items-start gap-2 mb-1">
              <h3 className={`text-[11.5px] font-bold leading-tight break-words line-clamp-2 ${
                isActive ? 'text-brand' : 'text-[#003366]'
              }`}>
                {lesson.title}
              </h3>
              <ChevronDown 
                size={14} 
                strokeWidth={3}
                className={`flex-none mt-0.5 transition-transform duration-300 ${isActive ? 'rotate-180 text-brand' : 'text-gray-500'}`} 
              />
            </div>

            <div className="flex items-end justify-between gap-2 mt-1">
              <div className="flex items-center gap-1 opacity-60">
                <SidebarContentIndicator type={lesson.type} />
              </div>
              
              <span className={`text-[8.5px] font-black uppercase tracking-tight ${
                isCompleted ? 'text-green-600' : 
                isActive ? 'text-brand' : 
                'text-gray-400'
              }`}>
                {isCompleted ? 'Concluído' : isActive ? 'Em andamento' : 'Não visualizado'}
              </span>
            </div>
            
            <AnimatePresence>
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-4">
                    <MiniCircularProgress percentage={isCompleted ? 100 : 0} label="P" />
                    <MiniCircularProgress percentage={isCompleted ? 100 : 0} label="A" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[100dvh] bg-ice overflow-hidden font-sans relative">
      
      {/* Sidebar - Matches TrainingView Setup */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-none flex flex-col border-r border-gray-100 bg-gray-50/30 overflow-hidden z-20"
          >
            {/* Sidebar Header */}
            <div className="p-5 bg-brand text-white relative border-b border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer text-white"
                >
                  <X size={18} />
                </button>
                <h2 className="text-[11.5px] font-bold uppercase tracking-tight leading-tight">Trilha de Formação Avançada</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[9.5px] font-bold uppercase mb-1.5 text-white/70">
                    <span>Progresso</span>
                    <span className="text-white tracking-wider">21.43%</span>
                  </div>
                  <div className="h-1.5 bg-black/10 rounded-full overflow-hidden relative border border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]">
                    <div 
                      className="h-full bg-gradient-to-r from-white/90 via-white to-white/90 rounded-full transition-all duration-1000" 
                      style={{ width: '21.43%' }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-[9.5px] font-bold uppercase mb-1.5 text-white/70">
                    <span>Aproveitamento</span>
                    <span className="text-white tracking-wider">100%</span>
                  </div>
                  <div className="h-1.5 bg-black/10 rounded-full overflow-hidden relative border border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]">
                    <div 
                      className="h-full bg-gradient-to-r from-white/90 via-white to-white/90 rounded-full transition-all duration-1000" 
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Etapas List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {mockTrilha.map((etapa) => (
                <div key={etapa.id} className="border-b border-gray-200/50 last:border-b-0 bg-white">
                  {/* Etapa Header (Level 1) */}
                  <button 
                    onClick={() => toggleEtapa(etapa.id)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-100/80 transition-colors cursor-pointer border-b border-gray-100/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-[10px] font-black text-gray-500 bg-white shadow-sm flex-shrink-0">
                        {etapa.number}
                      </div>
                      <span className="text-[10.5px] font-black text-[#003366] uppercase tracking-widest text-left leading-tight">
                        {etapa.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-brand">{etapa.progress}%</span>
                      <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${expandedEtapas[etapa.id] ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Etapa Content (Items inside Etapa) */}
                  <AnimatePresence initial={false}>
                    {expandedEtapas[etapa.id] && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-white"
                      >
                        {etapa.items.map((item) => renderContentItem(item, false))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content matching TrainingView */}
      <div className="flex-1 flex flex-col relative bg-ice">
        {/* Top Navigation */}
        <div className="px-8 py-4 flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm cursor-pointer"
                >
                  <Menu size={20} />
                </button>
                <button className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 cursor-pointer">
                  <ArrowLeft size={20} />
                </button>
              </div>
            )}
            
            {isSidebarOpen && (
              <button className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 cursor-pointer">
                <ArrowLeft size={16} />
              </button>
            )}
            
            <nav className="text-[10.5px] flex flex-wrap items-center gap-2 text-gray-400 uppercase tracking-widest font-bold">
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Início</span>
              <span className="text-gray-200">/</span>
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Sala de Aula</span>
              <span className="text-gray-200">/</span>
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Liderança do Futuro</span>
              <span className="text-gray-200">/</span>
              <span className="text-brand">{activeLesson.title}</span>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col p-4 lg:p-6 pb-32">
            
            {/* Video Player Container */}
            <div className="relative mb-4 flex-1 flex items-center justify-center min-h-0">
              {/* Navigation Arrows - Outside the video container */}
              <AnimatePresence>
                {!isSidebarOpen && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="absolute left-[-60px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                    >
                      <button className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transition-all active:scale-95 bg-brand text-white shadow-brand/20 hover:scale-110 cursor-pointer">
                        <ChevronLeft size={24} />
                      </button>
                      <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter">Anterior</span>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="absolute right-[-60px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                    >
                      <button className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transition-all active:scale-95 bg-brand text-white shadow-brand/20 hover:scale-110 cursor-pointer">
                        <ChevronRight size={24} />
                      </button>
                      <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-tighter">Próximo</span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Video Placeholder */}
              <div className="w-full max-h-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative flex items-center justify-center">
                <img 
                  src="https://picsum.photos/seed/training-trilha/1920/1080" 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-brand/90 text-white flex items-center justify-center hover:scale-110 transition-all shadow-2xl shadow-brand/40 cursor-pointer">
                    <Play size={28} fill="currentColor" />
                  </button>
                </div>
                
                {/* Video Controls Mockup */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4">
                  <div className="text-white text-[9.5px] font-mono">0:00 / 45:00</div>
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-brand w-[30%]" />
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-1 h-3 bg-white/40 rounded-full" />
                    <div className="w-1 h-4 bg-white/40 rounded-full" />
                    <div className="w-1 h-2 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Info */}
            <div className="flex-none">
              <h1 className="text-xl font-bold text-[#003366] mb-4 uppercase tracking-tighter">TRILHA: {activeLesson?.title || 'Vídeo da Aula'}</h1>
              
              {/* Tabs */}
              <div className="flex items-center border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id 
                        ? 'text-brand' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab.icon}
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

              {/* Tab Content */}
              <div className="min-h-[400px] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'descricao' && (
                      <div className="prose prose-sm max-w-none text-gray-600 italic text-xs">
                        <p>Nesta etapa importante da Trilha, você aprenderá o conceito aprofundado por trás de cada fluxo de aprovação da nossa matriz.</p>
                      </div>
                    )}
                    {activeTab === 'desempenho' && (
                      <PerformanceDashboard 
                        type="trilha" 
                        status="andamento"
                        data={[
                          { name: 'Módulo 1', value: 100 },
                          { name: 'Módulo 2', value: 85 },
                          { name: 'Módulo 3', value: 90 },
                          { name: 'Módulo 4', value: 21, isAlt: true },
                          { name: 'Módulo 5', value: 0 },
                        ]}
                      />
                    )}
                    {activeTab === 'resumo' && (
                      <div className="prose prose-sm max-w-none text-gray-600 italic text-xs">
                        <p>Os 3 pilares da trilha: Liderança, Empatia e Gerenciamento Ágil.</p>
                      </div>
                    )}
                    {activeTab === 'material' && (
                      <div className="prose prose-sm max-w-none text-gray-600 italic text-xs">
                        <p>Acesse aqui a biblioteca digital para materiais adicionais da Etapa 2.</p>
                      </div>
                    )}
                    {activeTab === 'autor' && (
                      <div className="prose prose-sm max-w-none text-gray-600 italic text-xs">
                        <p>Instrutora Sênior: Mariana Lemos — Especialista em Gestão de Pessoas.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
