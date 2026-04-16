import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ArrowLeft,
  FileText,
  BarChart3,
  BookOpen,
  Paperclip,
  User,
  Info,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lesson {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'locked';
  type: string;
  duration: string;
}

const lessons: Lesson[] = [
  { id: 1, title: 'Boas-vindas', status: 'completed', type: 'Vídeo', duration: '02:30' },
  { id: 2, title: 'Visão Geral', status: 'current', type: 'Vídeo', duration: '12:00' },
  { id: 3, title: 'Manual de Trilhas', status: 'locked', type: 'Documento', duration: '15 min' },
  { id: 4, title: 'Treinamento de Fluxos', status: 'locked', type: 'Vídeo', duration: '45:00' },
  { id: 5, title: 'Criando Artigos', status: 'locked', type: 'Scorm', duration: '20:00' },
  { id: 6, title: 'Contrato Presencial', status: 'locked', type: 'Aula presencial', duration: '01:30h' },
  { id: 7, title: 'Avaliação de Desempenho', status: 'locked', type: 'Avaliação', duration: '30:00' },
  { id: 8, title: 'Gravação da Mentoria', status: 'locked', type: 'Vídeo', duration: '02:00h' },
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

export default function TrainingView() {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(2);
  const [activeTab, setActiveTab] = useState('descricao');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lessonList, setLessonList] = useState(lessons);

  const handleToggleLesson = (id: number) => {
    setActiveLessonId(prev => prev === id ? null : id);
  };

  const handleToggleComplete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLessonList(prev => prev.map(lesson => {
      if (lesson.id === id) {
        const newStatus = lesson.status === 'completed' ? 'current' : 'completed';
        return { ...lesson, status: newStatus };
      }
      return lesson;
    }));
  };

  const activeLesson = lessonList.find(l => l.id === activeLessonId) || lessonList[0];

  const tabs = [
    { id: 'descricao', label: 'Descrição', icon: <Info size={14} /> },
    { id: 'desempenho', label: 'Desempenho', icon: <BarChart3 size={14} /> },
    { id: 'resumo', label: 'Resumo', icon: <BookOpen size={14} /> },
    { id: 'material', label: 'Material Complementar', icon: <Paperclip size={14} /> },
    { id: 'autor', label: 'Autor', icon: <User size={14} /> },
  ];

  return (
    <div className="flex h-full bg-ice overflow-hidden font-sans relative">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-none flex flex-col border-r border-gray-100 bg-gray-50/30 overflow-hidden"
          >
            {/* Sidebar Header */}
            <div className="p-5 bg-white border-b border-gray-100 text-[#003366] relative">
              <div className="flex items-center gap-3 mb-4">
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer text-gray-400"
                >
                  <X size={18} />
                </button>
                <h2 className="text-[11.5px] font-bold uppercase tracking-tight">Configurando o seu Movidesk</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[9.5px] font-bold uppercase mb-1 text-gray-400">
                    <span>Progresso</span>
                    <span className="text-[#003366]">21.43%</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand w-[21.43%] transition-all duration-500" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-[9.5px] font-bold uppercase mb-1 text-gray-400">
                    <span>Aproveitamento</span>
                    <span className="text-[#003366]">100%</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand w-full transition-all duration-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson List */}
            <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
              {lessonList.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                const isCompleted = lesson.status === 'completed';
                
                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleToggleLesson(lesson.id)}
                    className={`w-full text-left p-4 border-b border-gray-100/50 transition-all relative group cursor-pointer ${
                      isActive ? 'bg-brand/5' : 'hover:bg-gray-100/50'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeLessonIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-brand" 
                      />
                    )}
                    
                    <div className="flex items-start gap-3">
                      <button 
                        onClick={(e) => handleToggleComplete(e, lesson.id)}
                        className={`mt-1 flex-none transition-all hover:scale-110 active:scale-90 cursor-pointer ${
                          isCompleted ? 'text-green-500' : isActive ? 'text-brand' : 'text-gray-400'
                        }`}
                        title="Marcar como visualizado"
                      >
                        {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-tighter ${
                            isCompleted ? 'bg-green-50 text-green-600' : 
                            isActive ? 'bg-brand/10 text-brand' : 
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {isCompleted ? 'Concluído' : isActive ? 'Em andamento' : 'Não visualizado'}
                          </span>
                          <ChevronDown 
                            size={14} 
                            strokeWidth={3}
                            className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-brand' : 'text-gray-500'}`} 
                          />
                        </div>
                        <h3 className={`text-[11.5px] font-bold leading-tight break-words ${
                          isActive ? 'text-brand' : 'text-[#003366]'
                        }`}>
                          {lesson.title}
                        </h3>
                        
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
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
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
            
            <nav className="text-[10.5px] flex items-center gap-2 text-gray-400 uppercase tracking-widest font-bold">
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Início</span>
              <span className="text-gray-200">/</span>
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Sala de Aula</span>
              <span className="text-gray-200">/</span>
              <span className="hover:text-gray-600 cursor-pointer transition-colors">Configurando o seu Movidesk</span>
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
                      <button 
                        onClick={() => activeLessonId && activeLessonId > 1 && setActiveLessonId(activeLessonId - 1)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transition-all active:scale-95 ${
                          activeLessonId && activeLessonId > 1 
                            ? 'bg-brand text-white shadow-brand/20 hover:scale-110 cursor-pointer' 
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                      >
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
                      <button 
                        onClick={() => activeLessonId && activeLessonId < lessons.length && setActiveLessonId(activeLessonId + 1)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transition-all active:scale-95 ${
                          activeLessonId && activeLessonId < lessons.length 
                            ? 'bg-brand text-white shadow-brand/20 hover:scale-110 cursor-pointer' 
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                      >
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
                  src="https://picsum.photos/seed/training/1920/1080" 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-brand/90 text-white flex items-center justify-center hover:scale-110 transition-all shadow-2xl shadow-brand/40">
                    <Play size={28} fill="currentColor" />
                  </button>
                </div>
                
                {/* Video Controls Mockup */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4">
                  <div className="text-white text-[9.5px] font-mono">0:00 / 0:12</div>
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
              <h1 className="text-xl font-bold text-[#003366] mb-4">{activeLesson.title}</h1>
              
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
                        layoutId="activeTabIndicatorTraining"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="h-12 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="prose prose-sm max-w-none text-gray-600 italic text-xs"
                  >
                    {activeTab === 'descricao' && (
                      <p>Uma visão geral de todas as funcionalidades que vamos cobrir.</p>
                    )}
                    {activeTab === 'desempenho' && (
                      <p>Seu desempenho nesta aula foi excelente. Continue assim!</p>
                    )}
                    {activeTab === 'resumo' && (
                      <p>Resumo dos pontos principais abordados nesta lição.</p>
                    )}
                    {activeTab === 'material' && (
                      <p>Arquivos e links úteis para aprofundar seu conhecimento.</p>
                    )}
                    {activeTab === 'autor' && (
                      <p>Informações sobre o instrutor responsável por este conteúdo.</p>
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
}
