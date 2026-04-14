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
  X,
  Layout,
  GraduationCap,
  Search,
  Settings,
  Maximize2,
  Video,
  ClipboardCheck,
  Award,
  List,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgress } from './CircularProgress';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-16">
    <h2 className="text-[10.5px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
      <span className="flex-none">{title}</span>
      <div className="h-px bg-gray-100 flex-1" />
    </h2>
    {children}
  </section>
);

const ColorSwatch: React.FC<{ color: string; name: string; hex: string; usage: string }> = ({ color, name, hex, usage }) => (
  <div className="flex flex-col gap-3">
    <div className={`w-full aspect-video rounded-xl shadow-sm border border-gray-100 ${color}`} />
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11.5px] font-bold text-[#003366] uppercase tracking-tight">{name}</span>
        <span className="text-[9.5px] font-mono text-gray-400">{hex}</span>
      </div>
      <p className="text-[10.5px] text-gray-500 leading-tight">{usage}</p>
    </div>
  </div>
);

const ComponentBox: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-6">
      <h3 className="text-xs font-bold text-[#003366] uppercase tracking-widest mb-1">{title}</h3>
      <p className="text-[10.5px] text-gray-400">{description}</p>
    </div>
    <div className="flex flex-wrap gap-6 items-center">
      {children}
    </div>
  </div>
);

export const DesignSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('conteudos');

  return (
    <div className="min-h-screen bg-ice p-8 lg:p-12 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center text-white shadow-xl shadow-brand/20">
            <Layout size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#003366] uppercase tracking-tighter">Design System</h1>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Documentação Oficial de Padrões e Componentes</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Este guia documenta a linguagem visual e os componentes reutilizáveis da plataforma. 
          O objetivo é garantir a consistência estética e funcional em todas as telas do sistema.
        </p>
      </header>

      {/* SEÇÃO 1 — IDENTIDADE VISUAL */}
      <Section title="01. Identidade Visual">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <ColorSwatch 
            color="bg-brand" 
            name="Brand Primary" 
            hex="var(--brand-color)" 
            usage="Cor principal de destaque, botões primários e estados ativos." 
          />
          <ColorSwatch 
            color="bg-[#003366]" 
            name="Navy Deep" 
            hex="#003366" 
            usage="Títulos principais, cabeçalhos de sidebar e textos de alta hierarquia." 
          />
          <ColorSwatch 
            color="bg-ice" 
            name="Ice White" 
            hex="#fcfdfe" 
            usage="Fundo principal da plataforma para reduzir o cansaço visual." 
          />
          <ColorSwatch 
            color="bg-gray-100" 
            name="Neutral Light" 
            hex="#f3f4f6" 
            usage="Bordas, fundos secundários e estados de hover sutis." 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xs font-bold text-[#003366] uppercase tracking-widest mb-6">Tipografia (Inter)</h3>
            <div className="space-y-6">
              <div>
                <span className="text-[9.5px] text-gray-400 uppercase font-bold block mb-2">Heading 1 / 24px Black</span>
                <p className="text-2xl font-black text-[#003366] uppercase tracking-tighter">O Futuro da Educação</p>
              </div>
              <div>
                <span className="text-[9.5px] text-gray-400 uppercase font-bold block mb-2">Heading 2 / 14px Bold</span>
                <p className="text-sm font-bold text-[#003366] uppercase tracking-widest">Configurando o seu Movidesk</p>
              </div>
              <div>
                <span className="text-[9.5px] text-gray-400 uppercase font-bold block mb-2">Body / 14px Regular</span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Este curso propõe uma análise profunda das bases do pensamento intelectual brasileiro através da Teoria Geral do Direito.
                </p>
              </div>
              <div>
                <span className="text-[9.5px] text-gray-400 uppercase font-bold block mb-2">Caption / 10px Bold</span>
                <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-[0.15em]">Carga Horária: 36 horas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xs font-bold text-[#003366] uppercase tracking-widest mb-6">Espaçamentos</h3>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex flex-col items-center gap-2">
                <div className="w-4 h-4 bg-brand/10 border border-brand/20 rounded-sm" />
                <span className="text-[9.5px] font-mono text-gray-400">4px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-brand/10 border border-brand/20 rounded-sm" />
                <span className="text-[9.5px] font-mono text-gray-400">8px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-sm" />
                <span className="text-[9.5px] font-mono text-gray-400">12px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-brand/10 border border-brand/20 rounded-sm" />
                <span className="text-[9.5px] font-mono text-gray-400">16px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 bg-brand/10 border border-brand/20 rounded-sm" />
                <span className="text-[9.5px] font-mono text-gray-400">24px</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SEÇÃO 2 — COMPONENTES */}
      <Section title="02. Componentes">
        <div className="grid grid-cols-1 gap-8">
          <ComponentBox title="Botões" description="Variações de botões para diferentes hierarquias de ação.">
            <button className="bg-brand text-white px-6 py-3 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95">
              Primário
            </button>
            <button className="bg-white text-brand px-6 py-3 rounded-xl text-[11.5px] font-bold border border-brand/20 hover:bg-brand/5 transition-all active:scale-95 uppercase tracking-[0.1em]">
              Secundário
            </button>
            <button className="w-10 h-10 rounded-xl bg-[#003366] text-white flex items-center justify-center hover:bg-[#002244] transition-all shadow-lg shadow-blue-900/20">
              <Play size={18} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-200 transition-all">
              <Settings size={16} />
            </button>
          </ComponentBox>

          <ComponentBox title="Badges / Status" description="Indicadores de estado para conteúdos e processos.">
            <span className="text-[8.5px] font-bold px-2 py-1 rounded-sm uppercase tracking-tighter bg-green-50 text-green-600 border border-green-100">
              Concluído
            </span>
            <span className="text-[8.5px] font-bold px-2 py-1 rounded-sm uppercase tracking-tighter bg-brand/10 text-brand border border-brand/10">
              Em andamento
            </span>
            <span className="text-[8.5px] font-bold px-2 py-1 rounded-sm uppercase tracking-tighter bg-gray-100 text-gray-400 border border-gray-200">
              Não visualizado
            </span>
            <span className="text-[9.5px] text-white/70 uppercase tracking-[0.2em] bg-[#003366] px-2 py-1 rounded">
              Curso de Extensão
            </span>
          </ComponentBox>

          <ComponentBox title="Tabs" description="Navegação interna de seções.">
            <div className="flex items-center gap-6 text-[10.5px] font-bold uppercase tracking-[0.1em]">
              <button 
                onClick={() => setActiveTab('conteudos')}
                className={`transition-all cursor-pointer relative py-2 flex items-center gap-2 ${activeTab === 'conteudos' ? 'text-brand' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List size={14} />
                Conteúdos
                {activeTab === 'conteudos' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('desempenho')}
                className={`transition-all cursor-pointer relative py-2 flex items-center gap-2 ${activeTab === 'desempenho' ? 'text-brand' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <BarChart3 size={14} />
                Desempenho
                {activeTab === 'desempenho' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full" />}
              </button>
            </div>
          </ComponentBox>

          <ComponentBox title="Progress Indicators" description="Gráficos circulares e barras de progresso.">
            <div className="flex items-center gap-12">
              <CircularProgress percentage={75} size={80} strokeWidth={8} label="Progresso" />
              <div className="w-48 space-y-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand w-[60%] transition-all" />
                </div>
                <div className="h-1 bg-brand/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand w-[30%] transition-all" />
                </div>
              </div>
            </div>
          </ComponentBox>

          <ComponentBox title="Cards" description="Containers para agrupamento de informações.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="text-[10.5px] font-bold text-[#003366] uppercase tracking-widest mb-4">Card Informativo</h4>
                <p className="text-xs text-gray-500">Exemplo de card padrão com borda suave e sombra leve.</p>
              </div>
              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 border-dashed">
                <h4 className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest mb-4">Card Secundário</h4>
                <p className="text-xs text-gray-400 italic">Usado para áreas de menor destaque ou placeholders.</p>
              </div>
            </div>
          </ComponentBox>
        </div>
      </Section>

      {/* SEÇÃO 3 — ÍCONES */}
      <Section title="03. Iconografia">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8">
            {[
              Play, CheckCircle2, Circle, Clock, ChevronLeft, ChevronRight, ChevronDown, 
              ArrowLeft, FileText, BarChart3, BookOpen, Paperclip, User, Info, Menu, X, 
              Layout, GraduationCap, Search, Settings, Maximize2, Video, ClipboardCheck, 
              Award, List, MessageSquare
            ].map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand/5 group-hover:text-brand transition-all">
                  <Icon size={20} />
                </div>
                <span className="text-[8.5px] font-mono text-gray-300 uppercase">{Icon.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SEÇÃO 4 — PADRÕES DE INTERAÇÃO */}
      <Section title="04. Padrões de Interação">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xs font-bold text-[#003366] uppercase tracking-widest mb-6">Estados de Hover & Active</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-brand/5 hover:border-brand/20 transition-all cursor-pointer group">
                <p className="text-xs font-bold text-gray-600 group-hover:text-brand">Hover State Example</p>
                <p className="text-[10.5px] text-gray-400">Clique para ver o efeito de escala.</p>
              </div>
              <div className="p-4 rounded-xl border border-brand bg-brand/5 transition-all cursor-pointer">
                <p className="text-xs font-bold text-brand">Active / Selected State</p>
                <p className="text-[10.5px] text-brand/60">Indicador lateral e cor da marca aplicados.</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xs font-bold text-[#003366] uppercase tracking-widest mb-6">Transições & Feedback</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border-2 border-brand/20 border-t-brand animate-spin" />
                <span className="text-xs text-gray-500 font-medium">Loading Spinner Pattern</span>
              </div>
              <div className="flex items-center gap-4 text-green-600">
                <CheckCircle2 size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Sucesso / Confirmação</span>
              </div>
              <div className="flex items-center gap-4 text-brand">
                <Info size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Informação / Atenção</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SEÇÃO 5 — EXEMPLOS REAIS */}
      <Section title="05. Exemplos Reais">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm overflow-hidden">
          <div className="border border-gray-100 rounded-xl overflow-hidden mb-8">
            <div className="bg-[#003366] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Menu size={16} className="text-white/70" />
                <span className="text-[10.5px] font-bold text-white uppercase tracking-tight">Miniatura de Sidebar</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-brand" />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between p-2 bg-brand/5 rounded border-l-2 border-brand">
                <span className="text-[10.5px] font-bold text-brand">Aula Ativa</span>
                <ChevronDown size={12} className="text-brand rotate-180" />
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <span className="text-[10.5px] font-bold text-gray-400">Aula Pendente</span>
                <ChevronDown size={12} className="text-gray-300" />
              </div>
            </div>
          </div>
          <p className="text-[10.5px] text-gray-400 italic text-center">
            Estes exemplos utilizam exatamente os mesmos componentes e classes Tailwind aplicados nas telas de produção.
          </p>
        </div>
      </Section>

      <footer className="mt-20 pt-8 border-t border-gray-100 text-center">
        <p className="text-[10.5px] font-bold text-gray-300 uppercase tracking-[0.3em]">
          © 2026 Plataforma de Treinamento • Design System v1.0
        </p>
      </footer>
    </div>
  );
};
