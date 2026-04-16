import React, { useState } from 'react';
import { 
  Play, CheckCircle2, Circle, Clock, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  ArrowLeft, FileText, BarChart3, BookOpen, Paperclip, User, Info, Menu, X, 
  Layout, GraduationCap, Search, Settings, Maximize2, Video, ClipboardCheck, 
  Award, List, MessageSquare, AlertCircle, RefreshCw, CreditCard, QrCode, Tag, Loader2, UploadCloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgress } from './CircularProgress';
import { CustomFieldsModal } from './CustomFieldsModal';
import { PaymentModal } from './PaymentModal';
import { SidebarContentIndicator, ContentTypeLabel } from './SidebarContentIndicator';

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
  const [documentedTab, setDocumentedTab] = useState('tab_0');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCustomFieldsModalOpen, setIsCustomFieldsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponState, setCouponState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    setCouponState('loading');
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'DESCONTO') setCouponState('success');
      else setCouponState('error');
    }, 800);
  };

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
          O objetivo é garantir a consistência estética e funcional em todas as telas do sistema, incluindo os novos fluxos de pagamento e formulários.
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
      <Section title="02. Componentes Básicos">
        <div className="grid grid-cols-1 gap-8">
          <ComponentBox title="Item de Conteúdo (Sidebar)" description="Novo padrão vertical com título (max 2 linhas), tipo e status.">
            <div className="w-full max-w-sm bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              {/* Item Não Concluído */}
              <div className="flex items-start gap-3 p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                <Circle size={16} className="mt-1 text-gray-400 flex-none" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-[11.5px] font-bold text-[#003366] leading-tight line-clamp-2">Introdução aos Processos de Atendimento ao Cliente</h3>
                    <ChevronDown size={14} className="text-gray-400 mt-0.5 flex-none" />
                  </div>
                  <div className="flex items-end justify-between gap-2 mt-1">
                    <div className="flex items-center gap-1 opacity-60">
                      <Play size={10} /> <span className="text-[9px] font-bold uppercase">Vídeos</span>
                    </div>
                    <span className="text-[8.5px] font-black text-gray-400 uppercase tracking-tight">Não visualizado</span>
                  </div>
                </div>
              </div>
              {/* Item Concluído */}
              <div className="flex items-start gap-3 p-4 bg-green-50/50 transition-colors cursor-pointer">
                <CheckCircle2 size={16} className="mt-1 text-green-500 flex-none" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-[11.5px] font-bold text-[#003366] leading-tight line-clamp-2">Boas-vindas</h3>
                    <ChevronDown size={14} className="text-gray-400 mt-0.5 flex-none" />
                  </div>
                  <div className="flex items-end justify-between gap-2 mt-1">
                    <div className="flex items-center gap-1 opacity-60">
                      <Play size={10} /> <span className="text-[9px] font-bold uppercase">Vídeos</span>
                    </div>
                    <span className="text-[8.5px] font-black text-green-600 uppercase tracking-tight">Concluído</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full text-[10px] text-gray-400 italic">
              Regras: Título em Negrito (line-clamp-2). Tipo de conteúdo abaixo do título. Status no canto inferior direito. Fundo verde claro para concluídos.
            </div>
          </ComponentBox>

          <ComponentBox title="Accordions (Menu de Etapas)" description="Padrão de navegação por etapas com setas à esquerda.">
            <div className="w-full max-w-md bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              {/* Item Fechado */}
              <div className="border-b border-gray-100">
                <button className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                    <ChevronDown size={12} className="text-gray-500" />
                  </div>
                  <span className="text-xs font-bold text-[#003366] tracking-tight uppercase">Etapa 2: Gestão de Equipes (Fechado)</span>
                </button>
              </div>
              {/* Item Aberto */}
              <div>
                <button className="w-full flex items-center gap-3 p-4 bg-gray-50 transition-colors border-b border-gray-100 cursor-default">
                  <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                    <ChevronUp size={12} className="text-gray-500" />
                  </div>
                  <span className="text-xs font-bold text-[#003366] tracking-tight uppercase">Etapa 1: Fundamentos (Aberto)</span>
                </button>
                <div className="p-4 bg-white space-y-3">
                  <div className="flex items-center gap-2 pl-4">
                    <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                      <ChevronDown size={14} />
                    </div>
                    <span className="text-xs font-bold text-gray-800">Treinamento de Fluxos</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full text-[10px] text-gray-400 italic">
              Regra: Seta sempre à esquerda do título. [ ^ ] para aberto, [ v ] para fechado.
            </div>
          </ComponentBox>

          <ComponentBox title="Barras de Progresso (White Label)" description="Indicadores dinâmicos adaptáveis à cor do cliente.">
            <div className="w-full max-w-sm p-6 bg-brand rounded-2xl shadow-xl shadow-brand/20">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[9px] font-bold uppercase mb-1.5 text-white/70 tracking-widest">
                    <span>Progresso</span>
                    <span className="text-white">21.43%</span>
                  </div>
                  <div className="h-1.5 bg-black/10 rounded-full overflow-hidden relative border border-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]">
                    <div 
                      className="h-full bg-gradient-to-r from-white/90 via-white to-white/90 rounded-full transition-all duration-1000" 
                      style={{ width: '21.43%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-bold uppercase mb-1.5 text-white/70 tracking-widest">
                    <span>Aproveitamento</span>
                    <span className="text-white">100%</span>
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
            <div className="w-full text-[10px] text-gray-400 italic">
              Regra: Preenchimento branco dinâmico sobre trilho escuro (black/10). Altura 6px (h-1.5).
            </div>
          </ComponentBox>

          <ComponentBox title="Cabeçalho Sidebar (White Label)" description="Top da navegação lateral totalmente imersivo na marca.">
            <div className="w-full max-w-xs bg-brand rounded-2xl overflow-hidden shadow-2xl shadow-brand/20">
              <div className="p-5 relative border-b border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <X size={18} />
                  </div>
                  <h2 className="text-[11px] font-bold uppercase tracking-tight text-white">Nome do Treinamento</h2>
                </div>
                <div className="h-1 bg-black/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/3" />
                </div>
              </div>
            </div>
            <div className="w-full text-[10px] text-gray-400 italic">
              Regra: bg-brand no fundo, textos brancos e ícones com background de baixa opacidade (white/10).
            </div>
          </ComponentBox>

          <ComponentBox title="Botões & Ações" description="Variações de botões para diferentes hierarquias de ação.">
            <button className="bg-brand text-white px-6 py-3 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95">
              Primário
            </button>
            <button className="bg-white text-brand px-6 py-3 rounded-xl text-[11.5px] font-bold border border-brand/20 hover:bg-brand/5 transition-all active:scale-95 uppercase tracking-[0.1em]">
              Secundário
            </button>
            <button disabled className="bg-gray-200 text-gray-400 px-6 py-3 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] cursor-not-allowed">
              Desabilitado
            </button>
            <button className="bg-brand text-white px-6 py-3 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] flex items-center gap-2 shadow-lg shadow-brand/10">
              <CreditCard size={14} /> Com Ícone
            </button>
            <button className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-full hover:bg-brand-dark transition-all shadow-md shadow-brand/20 cursor-pointer group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11.5px] font-bold">Voltar para a trilha</span>
            </button>
            
            <div className="w-full h-px bg-gray-100 my-2" />
            
            <div className="w-full flex items-center gap-8">
              <div>
                <span className="text-[9.5px] text-gray-400 uppercase font-bold block mb-2">Botão de Expansão (Ver mais)</span>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-[10.5px] font-bold text-brand uppercase tracking-[0.15em] hover:text-brand-dark transition-colors cursor-pointer"
                >
                  {isExpanded ? (
                    <>Ver menos <ChevronUp size={14} /></>
                  ) : (
                    <>Ver mais <ChevronDown size={14} /></>
                  )}
                </button>
              </div>
            </div>
          </ComponentBox>

          <ComponentBox title="Navegação em Abas (Tabs)" description="Abas animadas com barra inferior deslizante (Sliding Line).">
            <div className="w-full flex items-center border-b border-gray-100 mb-2 overflow-x-auto no-scrollbar">
              {['Descrição', 'Desempenho', 'Resumo'].map((tabLabel, idx) => {
                const tabId = `tab_${idx}`;
                return (
                  <button
                    key={tabId}
                    onClick={() => setDocumentedTab(tabId)}
                    className={`relative flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors whitespace-nowrap cursor-pointer ${
                      documentedTab === tabId 
                        ? 'text-brand' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tabLabel}
                    {documentedTab === tabId && (
                      <motion.div
                        layoutId="activeTabIndicatorDS"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-gray-400 italic">Clique nas abas acima para testar a barra deslizante e a transição de cor.</div>
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

          <ComponentBox title="Indicadores de Tipo de Conteúdo" description="Micro-ícones sutis utilizados na barra lateral para indicar o formato do material.">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full p-4 bg-gray-50 rounded-xl border border-gray-100">
              {(['Tópico', 'Vídeos', 'Documentos', 'Gravado', 'Aula presencial', 'Webconferência', 'Scorm', 'Entrega de atividade', 'Avaliação', 'Avaliação de reação/pesquisa', 'Certificado', 'Treinamento'] as ContentTypeLabel[]).map(type => (
                <div key={type} className="flex items-center gap-2">
                  <SidebarContentIndicator type={type} />
                </div>
              ))}
            </div>
          </ComponentBox>

          <ComponentBox title="Inputs & Formulários" description="Campos de texto, upload e cupons.">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Standard Input */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome Completo</label>
                <input type="text" placeholder="Digite seu nome" className="w-full bg-white border border-gray-200 focus:border-brand focus:ring-4 focus:ring-brand/20 rounded-lg px-3 py-2.5 text-sm outline-none transition-all" />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Upload de Documento</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud size={20} className="text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500"><span className="font-semibold text-brand">Clique para enviar</span> ou arraste</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Coupon Input */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Cupom de Desconto (Simulação)</label>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-md">
                  {couponState === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 text-green-700">
                        <Tag size={16} />
                        <span className="text-sm font-bold">{couponCode.toUpperCase()}</span>
                      </div>
                      <button onClick={() => { setCouponCode(''); setCouponState('idle'); }} className="text-green-600 hover:text-green-800 p-1">
                        <X size={14} />
                      </button>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="Tente 'DESCONTO'"
                          value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value); if (couponState === 'error') setCouponState('idle'); }}
                          className={`flex-1 bg-white border ${couponState === 'error' ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-brand focus:ring-brand/20'} rounded-lg px-3 py-2 text-sm outline-none focus:ring-4 transition-all uppercase`}
                        />
                        <button 
                          onClick={handleApplyCoupon}
                          disabled={!couponCode || couponState === 'loading'}
                          className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white px-4 rounded-lg text-sm font-bold transition-colors w-24 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                        >
                          {couponState === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Aplicar'}
                        </button>
                      </div>
                      {couponState === 'error' && <span className="text-xs text-red-500 font-medium ml-1 flex items-center gap-1 mt-1"><AlertCircle size={12} /> Cupom inválido</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Navigation Interaction */}
              <div className="col-span-1 md:col-span-2 mt-4 pt-6 border-t border-gray-100">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">Navegação Lateral (Sidebar Toggle)</label>
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex flex-col items-center gap-3">
                    <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm cursor-pointer">
                      <Menu size={20} />
                    </button>
                    <div className="text-center">
                      <span className="text-[10.5px] font-bold text-gray-600 block">Abrir Sidebar</span>
                      <span className="text-[9px] text-gray-400">Botão no header</span>
                    </div>
                  </div>
                  <div className="w-8 h-px bg-gray-200 hidden sm:block"></div>
                  <div className="flex flex-col items-center gap-3">
                    <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer">
                      <X size={18} />
                    </button>
                    <div className="text-center">
                      <span className="text-[10.5px] font-bold text-gray-600 block">Fechar Sidebar</span>
                      <span className="text-[9px] text-gray-400">Ícone X dentro da sidebar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ComponentBox>

          <ComponentBox title="Feedback & Alertas" description="Estados de erro, sucesso e processamento.">
            <div className="w-full space-y-4 max-w-md">
              {/* Error Alert */}
              <div className="bg-red-50 border border-red-100 p-3.5 rounded-xl flex items-start gap-3">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Matrícula Recusada</span>
                  <span className="text-[11px] text-red-600 leading-relaxed font-medium">
                    Sua matrícula não foi aprovada pelo gestor. Verifique os dados e tente novamente.
                  </span>
                </div>
              </div>

              {/* Info Alert */}
              <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl flex items-start gap-3">
                <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Aguardando Aprovação</span>
                  <span className="text-[11px] text-blue-600 leading-relaxed font-medium">
                    Seus dados foram enviados e estão em análise.
                  </span>
                </div>
              </div>
            </div>
          </ComponentBox>
        </div>
      </Section>

      {/* SEÇÃO 3 — MODAIS E FLUXOS COMPLEXOS */}
      <Section title="03. Modais & Fluxos Complexos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center text-brand mb-2">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#003366] uppercase tracking-widest mb-1">Campos Personalizados</h3>
              <p className="text-[10.5px] text-gray-400 mb-6 max-w-xs mx-auto">Modal para coleta de dados adicionais e upload de documentos antes da matrícula.</p>
            </div>
            <button 
              onClick={() => setIsCustomFieldsModalOpen(true)}
              className="bg-brand text-white px-6 py-3 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95"
            >
              Abrir Modal de Campos
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center text-brand mb-2">
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#003366] uppercase tracking-widest mb-1">Checkout / Pagamento</h3>
              <p className="text-[10.5px] text-gray-400 mb-6 max-w-xs mx-auto">Modal de pagamento com suporte a Pix, Cartão de Crédito e Cupons de Desconto.</p>
            </div>
            <button 
              onClick={() => setIsPaymentModalOpen(true)}
              className="bg-brand text-white px-6 py-3 rounded-xl text-[11.5px] font-bold uppercase tracking-[0.15em] hover:bg-brand-dark shadow-lg shadow-brand/10 transition-all active:scale-95"
            >
              Abrir Modal de Pagamento
            </button>
          </div>
        </div>
      </Section>

      <footer className="mt-20 pt-8 border-t border-gray-100 text-center">
        <p className="text-[10.5px] font-bold text-gray-300 uppercase tracking-[0.3em]">
          © 2026 Plataforma de Treinamento • Design System v2.0
        </p>
      </footer>

      {/* Render Modals for Demo */}
      <CustomFieldsModal 
        isOpen={isCustomFieldsModalOpen} 
        onClose={() => setIsCustomFieldsModalOpen(false)} 
        onConfirm={() => setIsCustomFieldsModalOpen(false)} 
      />

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        itemName="CURSO DE DESIGN SYSTEM AVANÇADO"
        itemPrice={150.00}
        onSuccess={() => setIsPaymentModalOpen(false)}
      />
    </div>
  );
};
