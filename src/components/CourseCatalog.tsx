import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Info, ChevronDown, ChevronUp, AlertCircle, RefreshCw, CreditCard, Clock,
  Folder, Play, FileText, Video, Users, MonitorPlay, Box, UploadCloud,
  CheckSquare, Star, Award
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CustomFieldsModal } from './CustomFieldsModal';
import { PaymentModalV2 } from './PaymentModalV2';
import { PaymentModal } from './PaymentModal';
import { BoletoModal } from './BoletoModal';

interface CourseCatalogProps {
  onNavigate: (screen: 'catalog' | 'view' | 'design' | 'trilha' | 'trilhaView' | 'treinamentoTrilha') => void;
  enrollmentStatus: 'default' | 'payment' | 'rejected' | 'pending';
  setEnrollmentStatus: (status: 'default' | 'payment' | 'rejected' | 'pending') => void;
  selectedTurmaId: number | null;
  setSelectedTurmaId: (id: number | null) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  isBoletoModalOpen: boolean;
  setIsBoletoModalOpen: (open: boolean) => void;
  isOldPaymentModalOpen: boolean;
  setIsOldPaymentModalOpen: (open: boolean) => void;
}

interface Turma {
  id: number;
  title: string;
  prazo: string;
  price: string;
  vagas: string;
  modo: string;
  recomendada?: boolean;
  hasExtras?: boolean;
  extrasCount?: number;
}

interface ContentItem {
  type: string;
  title: string;
  exclusive?: boolean;
}

const turmas: Turma[] = [
  { id: 1, title: '1ª Gratuita com aprovação do gestor', prazo: '01/05/2026 até 30/06/2026', price: 'Gratuito', vagas: '50 vagas', modo: 'EaD' },
  { id: 2, title: '2ª Gratuita sem aprovação do gestor', prazo: 'Indeterminado', price: 'Gratuito', vagas: 'Ilimitadas', modo: 'EaD', recomendada: true, hasExtras: true, extrasCount: 2 },
  { id: 3, title: '3ª Paga com aprovação do gestor + campos personalizados', prazo: '10/05/2026 até 15/07/2026', price: 'R$ 150,00', vagas: '20 vagas', modo: 'Presencial' },
  { id: 4, title: '4ª Paga sem aprovação do gestor + campos personalizados', prazo: '05/04/2026 até 31/12/2026', price: 'R$ 320,00', vagas: '100 vagas', modo: 'EaD', hasExtras: true, extrasCount: 1 },
  { id: 5, title: '5ª Gratuita com aprovação do gestor + campos personalizados', prazo: '15/06/2026 até 15/08/2026', price: 'Gratuito', vagas: '10 vagas', modo: 'In-company' },
  { id: 6, title: '6ª Gratuita sem aprovação do gestor + campos personalizados', prazo: '01/04/2026 até 01/10/2026', price: 'Gratuito', vagas: 'Ilimitadas', modo: 'EaD' },
  { id: 7, title: '7ª Paga com aprovação do gestor', prazo: '20/05/2026 até 20/06/2026', price: 'R$ 450,00', vagas: '5 vagas', modo: 'Presencial' },
  { id: 8, title: '8ª Paga sem aprovação do gestor', prazo: 'Indeterminado', price: 'R$ 290,00', vagas: 'Ilimitadas', modo: 'EaD' },
  { id: 9, title: '9ª Aluno aplicando cupom de desconto', prazo: 'Indeterminado', price: 'R$ 49,90', vagas: 'Ilimitadas', modo: 'EaD' },
];

const baseContents: ContentItem[] = [
  { type: 'Tópico', title: 'Módulo 1: Fundamentos' },
  { type: 'Vídeos', title: 'Introdução ao Pensamento Jurídico Brasileiro' },
  { type: 'Documentos', title: 'Material de Apoio (PDF)' },
  { type: 'Gravado', title: 'Aula Magna Gravada' },
  { type: 'Aula presencial', title: 'Encontro Presencial — Polo SP' },
  { type: 'Webconferência', title: 'Tira-dúvidas ao vivo' },
  { type: 'Scorm', title: 'Módulo Interativo SCORM' },
  { type: 'Entrega de atividade', title: 'Trabalho de Conclusão de Módulo' },
  { type: 'Avaliação', title: 'Prova de Conhecimentos' },
  { type: 'Avaliação de reação/pesquisa', title: 'Pesquisa de Satisfação' },
  { type: 'Certificado', title: 'Emissão do Certificado' },
];

const extraContents: ContentItem[] = [
  { type: 'Vídeos', title: 'Masterclass Exclusiva de Encerramento', exclusive: true },
  { type: 'Documentos', title: 'Apostila Premium com Jurisprudência', exclusive: true },
];

const CONTENT_ICONS: Record<string, React.ReactNode> = {
  'Tópico': <Folder size={8} />,
  'Vídeos': <Play size={8} />,
  'Documentos': <FileText size={8} />,
  'Gravado': <Video size={8} />,
  'Aula presencial': <Users size={8} />,
  'Webconferência': <MonitorPlay size={8} />,
  'Scorm': <Box size={8} />,
  'Entrega de atividade': <UploadCloud size={8} />,
  'Avaliação': <CheckSquare size={8} />,
  'Avaliação de reação/pesquisa': <Star size={8} />,
  'Certificado': <Award size={8} />,
};

const TURMAS_LIMIT = 8;

const tabs = [
  { id: 'conteudos', label: 'Conteúdos' },
  { id: 'resumo', label: 'Resumo' },
  { id: 'autor', label: 'Sobre o autor' },
];

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onNavigate,
  enrollmentStatus,
  setEnrollmentStatus,
  selectedTurmaId,
  setSelectedTurmaId,
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  isBoletoModalOpen,
  setIsBoletoModalOpen,
  isOldPaymentModalOpen,
  setIsOldPaymentModalOpen,
}) => {
  const [activeTab, setActiveTab] = useState('conteudos');
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isTurmasExpanded, setIsTurmasExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hover panel state
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [panelTurmaId, setPanelTurmaId] = useState<number | null>(null);
  const [panelTop, setPanelTop] = useState(0);
  const [panelVisible, setPanelVisible] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const cardRefsMap = useRef<Map<number, HTMLDivElement>>(new Map());
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearPanelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (clearPanelTimerRef.current) clearTimeout(clearPanelTimerRef.current);
    };
  }, []);

  const selectedTurma = selectedTurmaId ? turmas.find(t => t.id === selectedTurmaId) ?? null : null;

  const selectedTurmaIndex = selectedTurmaId ? turmas.findIndex(t => t.id === selectedTurmaId) : -1;
  const selectedBeyondLimit = selectedTurmaIndex >= TURMAS_LIMIT;

  const visibleTurmas = isTurmasExpanded
    ? turmas
    : selectedBeyondLimit
      ? [...turmas.slice(0, TURMAS_LIMIT), turmas[selectedTurmaIndex]]
      : turmas.slice(0, TURMAS_LIMIT);

  const hiddenCount = turmas.length - TURMAS_LIMIT;

  const displayedContents: ContentItem[] = [
    ...baseContents,
    ...(selectedTurma?.hasExtras ? extraContents : []),
  ];

  const handleCardMouseEnter = useCallback((id: number) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (clearPanelTimerRef.current) clearTimeout(clearPanelTimerRef.current);

    showTimerRef.current = setTimeout(() => {
      const card = cardRefsMap.current.get(id);
      const sidebar = sidebarRef.current;
      if (card && sidebar) {
        const cardRect = card.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        setPanelTop(Math.max(0, cardRect.top - sidebarRect.top - 10));
      }
      setPanelTurmaId(id);
      setPanelVisible(true);
    }, 80);
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);

    hideTimerRef.current = setTimeout(() => {
      setPanelVisible(false);
      clearPanelTimerRef.current = setTimeout(() => setPanelTurmaId(null), 180);
    }, 120);
  }, []);

  const handleTurmaClick = (id: number) => {
    if (enrollmentStatus !== 'default') return;
    setSelectedTurmaId(selectedTurmaId === id ? null : id);
  };

  const handleMainAction = () => {
    if (!selectedTurmaId) return;
    if (selectedTurmaId === 2) {
      onNavigate('view');
    } else if (selectedTurmaId === 9) {
      setIsOldPaymentModalOpen(true);
    } else if (selectedTurmaId === 1 || selectedTurmaId === 7) {
      setEnrollmentStatus('pending');
    } else if ([3, 4, 5, 6].includes(selectedTurmaId)) {
      setIsModalOpen(true);
    } else {
      setEnrollmentStatus('payment');
    }
  };

  const mainButtonLabel = !selectedTurmaId
    ? 'Selecione uma turma'
    : selectedTurma?.price === 'Gratuito'
      ? 'Fazer inscrição'
      : `Inscrever por ${selectedTurma?.price}`;

  const panelTurma = panelTurmaId ? turmas.find(t => t.id === panelTurmaId) ?? null : null;

  return (
    <div className="flex flex-col h-[100dvh] bg-white font-sans">

      {/* ── Topbar ── */}
      <nav
        className="flex-none flex items-center border-b border-gray-100"
        style={{ height: 40, padding: '0 20px' }}
      >
        <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: '#9ca3af' }}>
          <span className="cursor-pointer hover:text-gray-600 transition-colors">Treinamentos</span>
          <span style={{ color: '#e5e7eb' }}>/</span>
          <span className="cursor-pointer hover:text-gray-600 transition-colors">Jurídico</span>
          <span style={{ color: '#e5e7eb' }}>/</span>
          <span style={{ color: 'var(--brand-color)' }}>Teoria Geral do Direito</span>
        </div>
      </nav>

      {/* ── Main grid ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ──────────── SIDEBAR ──────────── */}
        <aside
          ref={sidebarRef}
          className="relative flex-none flex flex-col border-r border-gray-100"
          style={{ width: 210 }}
        >
          {/* Top: pills + cover */}
          <div
            className="flex-none border-b border-gray-100"
            style={{ padding: '12px 12px 10px' }}
          >
            <div className="flex gap-[5px]" style={{ marginBottom: 7 }}>
              {['Extensão', '36h 00min'].map(label => (
                <span
                  key={label}
                  style={{
                    fontSize: 11,
                    color: '#9ca3af',
                    background: '#f9fafb',
                    border: '0.5px solid #f3f4f6',
                    borderRadius: 4,
                    padding: '2px 6px',
                    lineHeight: 1.4,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: '3/2',
                borderRadius: 8,
                border: '0.5px solid #f3f4f6',
              }}
            >
              <img
                src="https://picsum.photos/seed/law/300/200"
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Middle: turma selection */}
          <div
            className="flex-1 overflow-y-auto custom-scrollbar"
            style={{ padding: '10px 12px' }}
          >
            <div
              className="font-medium uppercase"
              style={{
                fontSize: 10,
                color: '#9ca3af',
                letterSpacing: '0.07em',
                marginBottom: 4,
              }}
            >
              Escolha sua turma
            </div>

            {/* Contextual instruction */}
            <div
              className="flex items-center"
              style={{
                gap: 4,
                marginBottom: 10,
                opacity: selectedTurmaId ? 0 : 1,
                pointerEvents: selectedTurmaId ? 'none' : 'auto',
                transition: 'opacity 0.2s ease',
              }}
            >
              <Info size={12} style={{ color: '#9ca3af', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#9ca3af' }}>
                Selecione uma turma para continuar
              </span>
            </div>

            {/* Turma cards */}
            {visibleTurmas.map(turma => {
              const isSelected = selectedTurmaId === turma.id;
              const isHovered = hoveredCardId === turma.id && !isSelected;

              const prazoShort = turma.prazo === 'Indeterminado'
                ? 'Indeterminado'
                : turma.prazo.split(' ')[0];
              const meta = `${prazoShort} · ${turma.vagas}`;

              return (
                <div
                  key={turma.id}
                  ref={el => {
                    if (el) cardRefsMap.current.set(turma.id, el);
                    else cardRefsMap.current.delete(turma.id);
                  }}
                  onClick={() => handleTurmaClick(turma.id)}
                  onMouseEnter={() => {
                    setHoveredCardId(turma.id);
                    handleCardMouseEnter(turma.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredCardId(null);
                    handleCardMouseLeave();
                  }}
                  className="flex items-center"
                  style={{
                    gap: 7,
                    padding: '6px 8px',
                    borderRadius: 6,
                    marginBottom: 3,
                    cursor: enrollmentStatus !== 'default' ? 'default' : 'pointer',
                    transition: 'border-color 0.13s, background 0.13s',
                    border: isSelected
                      ? '1.5px solid var(--brand-color)'
                      : isHovered
                        ? '0.5px solid #d1d5db'
                        : '0.5px solid #f3f4f6',
                    background: isSelected
                      ? 'color-mix(in srgb, var(--brand-color) 10%, transparent)'
                      : isHovered
                        ? '#f9fafb'
                        : '#ffffff',
                  }}
                >
                  {/* Radio */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: 12,
                      height: 12,
                      border: `1.5px solid ${isSelected ? 'var(--brand-color)' : '#d1d5db'}`,
                      transition: 'border-color 0.13s',
                    }}
                  >
                    {isSelected && (
                      <div
                        className="rounded-full"
                        style={{
                          width: 5,
                          height: 5,
                          background: 'var(--brand-color)',
                        }}
                      />
                    )}
                  </div>

                  {/* Center column */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="whitespace-nowrap overflow-hidden text-ellipsis font-medium"
                      style={{
                        fontSize: 11,
                        lineHeight: 1.3,
                        color: isSelected ? 'var(--brand-color-dark)' : '#111827',
                      }}
                    >
                      {turma.title}
                    </div>
                    <div
                      className="whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ fontSize: 10, color: '#9ca3af', marginTop: 1 }}
                    >
                      {meta}
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="flex-shrink-0 flex flex-col items-end" style={{ gap: 2 }}>
                    <span
                      className="font-medium"
                      style={{
                        fontSize: 11,
                        color: isSelected ? 'var(--brand-color-dark)' : '#4b5563',
                      }}
                    >
                      {turma.price}
                    </span>
                    {turma.recomendada && (
                      <span
                        className="font-medium"
                        style={{
                          fontSize: 9,
                          padding: '1px 4px',
                          borderRadius: 3,
                          background: '#FAEEDA',
                          color: '#854F0B',
                        }}
                      >
                        recomendada
                      </span>
                    )}
                    {turma.hasExtras && turma.extrasCount && (
                      <span
                        className="font-medium"
                        style={{
                          fontSize: 9,
                          padding: '1px 4px',
                          borderRadius: 3,
                          background: '#E1F5EE',
                          color: '#0F6E56',
                        }}
                      >
                        +{turma.extrasCount} extras
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Ver mais / Mostrar menos */}
            {turmas.length > TURMAS_LIMIT && (
              <button
                onClick={() => setIsTurmasExpanded(v => !v)}
                className="w-full flex items-center justify-center"
                style={{
                  gap: 5,
                  padding: 6,
                  marginTop: 4,
                  borderRadius: 6,
                  border: '0.5px dashed #d1d5db',
                  background: 'transparent',
                  fontSize: 11,
                  color: '#9ca3af',
                  cursor: 'pointer',
                  transition: 'background 0.13s, color 0.13s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = '#f9fafb';
                  el.style.color = '#111827';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = 'transparent';
                  el.style.color = '#9ca3af';
                }}
              >
                {isTurmasExpanded
                  ? <><ChevronUp size={11} /> Mostrar menos</>
                  : <><ChevronDown size={11} /> Ver mais {hiddenCount} turma{hiddenCount !== 1 ? 's' : ''}</>
                }
              </button>
            )}
          </div>

          {/* Footer: CTAs */}
          <div
            className="flex-none border-t border-gray-100 flex flex-col"
            style={{ padding: '10px 12px', gap: 5 }}
          >
            {enrollmentStatus === 'default' && (
              <>
                <button
                  onClick={selectedTurmaId ? handleMainAction : undefined}
                  disabled={!selectedTurmaId}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    width: '100%',
                    padding: '9px',
                    borderRadius: 8,
                    background: selectedTurmaId ? 'var(--brand-color)' : '#f3f4f6',
                    color: selectedTurmaId ? '#ffffff' : '#9ca3af',
                    border: `0.5px solid ${selectedTurmaId ? 'var(--brand-color)' : '#e5e7eb'}`,
                    cursor: selectedTurmaId ? 'pointer' : 'not-allowed',
                    transition: 'background 0.18s ease, color 0.18s ease, border-color 0.18s ease',
                  }}
                  onMouseEnter={e => {
                    if (selectedTurmaId) (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-color-dark)';
                  }}
                  onMouseLeave={e => {
                    if (selectedTurmaId) (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-color)';
                  }}
                >
                  {mainButtonLabel}
                </button>

                <button
                  style={{
                    fontSize: 11,
                    width: '100%',
                    padding: '7px',
                    borderRadius: 8,
                    background: 'transparent',
                    color: '#4b5563',
                    border: '0.5px solid #d1d5db',
                    cursor: 'pointer',
                    transition: 'color 0.13s, border-color 0.13s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = '#111827';
                    el.style.borderColor = '#9ca3af';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = '#4b5563';
                    el.style.borderColor = '#d1d5db';
                  }}
                >
                  Registrar interesse
                </button>
              </>
            )}

            {enrollmentStatus === 'pending' && (
              <div
                className="w-full flex items-center justify-center font-medium"
                style={{
                  gap: 6,
                  fontSize: 12,
                  padding: '9px',
                  borderRadius: 8,
                  color: 'var(--brand-color)',
                  background: 'color-mix(in srgb, var(--brand-color) 8%, white)',
                  border: '0.5px solid color-mix(in srgb, var(--brand-color) 25%, transparent)',
                }}
              >
                <Clock size={13} />
                Aguardando aprovação
              </div>
            )}

            {enrollmentStatus === 'payment' && (
              <button
                onClick={() => setIsBoletoModalOpen(true)}
                className="w-full flex items-center justify-center font-medium"
                style={{
                  gap: 6,
                  fontSize: 12,
                  padding: '9px',
                  borderRadius: 8,
                  background: 'var(--brand-color)',
                  color: '#ffffff',
                  border: '0.5px solid var(--brand-color)',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-color-dark)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-color)'}
              >
                <CreditCard size={13} />
                Efetuar pagamento
              </button>
            )}

            {enrollmentStatus === 'rejected' && (
              <div className="flex flex-col" style={{ gap: 5 }}>
                <div
                  className="flex items-start"
                  style={{
                    gap: 7,
                    padding: '8px',
                    borderRadius: 8,
                    background: '#fef2f2',
                    border: '0.5px solid #fecaca',
                    fontSize: 11,
                  }}
                >
                  <AlertCircle size={13} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
                  <span style={{ color: '#b91c1c' }}>Matrícula recusada pelo gestor</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center font-medium"
                  style={{
                    gap: 6,
                    fontSize: 12,
                    padding: '9px',
                    borderRadius: 8,
                    background: 'var(--brand-color)',
                    color: '#ffffff',
                    border: '0.5px solid var(--brand-color)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-color-dark)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-color)'}
                >
                  <RefreshCw size={13} />
                  Reenviar campos
                </button>
              </div>
            )}
          </div>

          {/* ── Hover panel ── */}
          {panelTurma && (
            <div
              style={{
                position: 'absolute',
                left: 210,
                top: panelTop,
                width: 220,
                zIndex: 10,
                pointerEvents: 'none',
                opacity: panelVisible ? 1 : 0,
                transition: 'opacity 0.15s ease',
                background: '#ffffff',
                border: '0.5px solid #e5e7eb',
                borderLeft: 'none',
                borderRadius: '0 12px 12px 0',
                padding: 14,
              }}
            >
              <div
                className="uppercase font-medium"
                style={{
                  fontSize: 9,
                  color: '#9ca3af',
                  letterSpacing: '0.07em',
                  marginBottom: 6,
                }}
              >
                Detalhes da turma
              </div>

              <div
                className="font-medium"
                style={{
                  fontSize: 12,
                  lineHeight: 1.4,
                  color: '#111827',
                  marginBottom: 10,
                }}
              >
                {panelTurma.title}
              </div>

              <div style={{ height: 0.5, background: '#f3f4f6', marginBottom: 10 }} />

              {[
                { key: 'Prazo', value: panelTurma.prazo },
                { key: 'Vagas', value: panelTurma.vagas },
                { key: 'Valor', value: panelTurma.price },
                { key: 'Modo', value: panelTurma.modo },
              ].map(({ key, value }) => (
                <div key={key} className="flex" style={{ gap: 6, marginBottom: 6 }}>
                  <span
                    style={{ fontSize: 11, color: '#9ca3af', width: 52, flexShrink: 0 }}
                  >
                    {key}
                  </span>
                  <span className="font-medium" style={{ fontSize: 11, color: '#111827' }}>
                    {value}
                  </span>
                </div>
              ))}

              {(panelTurma.recomendada || panelTurma.hasExtras) && (
                <>
                  <div style={{ height: 0.5, background: '#f3f4f6', marginBottom: 8, marginTop: 4 }} />
                  <div className="flex flex-wrap" style={{ gap: 4 }}>
                    {panelTurma.recomendada && (
                      <span
                        className="font-medium"
                        style={{
                          fontSize: 9,
                          padding: '1px 4px',
                          borderRadius: 3,
                          background: '#FAEEDA',
                          color: '#854F0B',
                        }}
                      >
                        recomendada
                      </span>
                    )}
                    {panelTurma.hasExtras && panelTurma.extrasCount && (
                      <span
                        className="font-medium"
                        style={{
                          fontSize: 9,
                          padding: '1px 4px',
                          borderRadius: 3,
                          background: '#E1F5EE',
                          color: '#0F6E56',
                        }}
                      >
                        +{panelTurma.extrasCount} conteúdos extras
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </aside>

        {/* ──────────── MAIN CONTENT ──────────── */}
        <main
          className="flex-1 overflow-y-auto custom-scrollbar"
          style={{ padding: '20px 28px' }}
        >
          {/* Title */}
          <h1
            className="font-medium"
            style={{
              fontSize: 16,
              lineHeight: 1.4,
              color: '#111827',
              marginBottom: 8,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            2º Curso de Extensão em Teoria Geral do Direito: Formação do Pensamento Intelectual Brasileiro
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 12,
              color: '#4b5563',
              lineHeight: 1.6,
              marginBottom: 5,
              display: isDescExpanded ? 'block' : '-webkit-box',
              WebkitLineClamp: isDescExpanded ? undefined : 2,
              WebkitBoxOrient: isDescExpanded ? undefined : 'vertical',
              overflow: isDescExpanded ? 'visible' : 'hidden',
            }}
          >
            Este curso propõe uma análise profunda das bases do pensamento intelectual
            brasileiro através da Teoria Geral do Direito. Exploramos as conexões entre a
            formação jurídica e o desenvolvimento social do país, abordando temas fundamentais
            para a compreensão da nossa estrutura institucional contemporânea. Durante os encontros,
            debateremos as obras dos principais juristas e sociólogos que moldaram a compreensão
            do Estado brasileiro — com metodologia que inclui análise de jurisprudência histórica,
            debates guiados e seminários de pesquisa.
          </p>

          <button
            onClick={() => setIsDescExpanded(v => !v)}
            className="flex items-center"
            style={{
              gap: 3,
              marginBottom: 14,
              fontSize: 11,
              color: '#3b82f6',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            {isDescExpanded
              ? <>Recolher <ChevronUp size={10} /></>
              : <>Ler descrição completa <ChevronDown size={10} /></>
            }
          </button>

          {/* Divider */}
          <div style={{ height: 0.5, background: '#f3f4f6', margin: '10px 0' }} />

          {/* Tabs – sangradas */}
          <div
            className="flex border-b border-gray-100"
            style={{ margin: '0 -28px', padding: '0 28px' }}
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  fontSize: 12,
                  padding: '9px 16px',
                  marginBottom: -1,
                  color: activeTab === tab.id ? 'var(--brand-color)' : '#6b7280',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: `2px solid ${activeTab === tab.id ? 'var(--brand-color)' : 'transparent'}`,
                  fontWeight: activeTab === tab.id ? 500 : 400,
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'color 0.13s, border-color 0.13s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (activeTab !== tab.id)
                    (e.currentTarget as HTMLButtonElement).style.color = '#111827';
                }}
                onMouseLeave={e => {
                  if (activeTab !== tab.id)
                    (e.currentTarget as HTMLButtonElement).style.color = '#6b7280';
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === 'conteudos' && (
                <div className="flex flex-col" style={{ paddingTop: 8 }}>
                  {displayedContents.map((item, index) => {
                    const isExtra = index >= baseContents.length;
                    const isLast = index === displayedContents.length - 1;
                    return (
                      <motion.div
                        key={item.title}
                        initial={isExtra ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center"
                        style={{
                          gap: 10,
                          padding: '11px 4px',
                          borderBottom: isLast ? 'none' : '0.5px solid #f3f4f6',
                          borderRadius: 4,
                          cursor: 'pointer',
                          transition: 'background 0.13s',
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                      >
                        {/* Type icon */}
                        <div
                          className="flex-shrink-0 flex items-center justify-center"
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 3,
                            background: 'color-mix(in srgb, var(--brand-color) 10%, transparent)',
                            border: '0.5px solid color-mix(in srgb, var(--brand-color) 30%, transparent)',
                            color: 'var(--brand-color)',
                          }}
                        >
                          {CONTENT_ICONS[item.type] ?? <FileText size={8} />}
                        </div>

                        {/* Text column */}
                        <div className="flex-1">
                          <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 1 }}>
                            {item.type}
                          </div>
                          <div className="flex items-center">
                            <span
                              className="font-medium"
                              style={{ fontSize: 13, lineHeight: 1.3, color: '#111827' }}
                            >
                              {item.title}
                            </span>
                            {item.exclusive && (
                              <span
                                className="font-medium"
                                style={{
                                  fontSize: 10,
                                  padding: '1px 5px',
                                  borderRadius: 3,
                                  background: '#E1F5EE',
                                  color: '#0F6E56',
                                  marginLeft: 5,
                                }}
                              >
                                exclusivo
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'resumo' && (
                <p
                  className="italic"
                  style={{
                    fontSize: 12,
                    color: '#6b7280',
                    lineHeight: 1.7,
                    paddingTop: 16,
                  }}
                >
                  Uma jornada intelectual que conecta o passado jurídico do Brasil com os
                  desafios do presente, focando na construção de uma consciência crítica sobre
                  nossas instituições.
                </p>
              )}

              {activeTab === 'autor' && (
                <div
                  className="flex items-center"
                  style={{ gap: 14, paddingTop: 16 }}
                >
                  <div
                    className="flex-shrink-0 overflow-hidden rounded-full border border-gray-100"
                    style={{ width: 40, height: 40 }}
                  >
                    <img
                      src="https://picsum.photos/seed/professor/100/100"
                      alt="Autor"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div
                      className="font-medium"
                      style={{ fontSize: 12, color: '#111827' }}
                    >
                      Dr. Roberto Silva
                    </div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
                      Doutor em Teoria do Direito e Pesquisador Sênior
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Modals */}
      <CustomFieldsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          setEnrollmentStatus('pending');
        }}
      />

      <PaymentModalV2
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        itemName="TEORIA GERAL DO DIREITO"
        itemPrice={parseFloat(
          selectedTurma?.price.replace('R$ ', '').replace('.', '').replace(',', '.') ?? '1000'
        )}
        onSuccess={() => {
          setIsPaymentModalOpen(false);
          setEnrollmentStatus('payment');
          setIsBoletoModalOpen(true);
        }}
      />

      <BoletoModal
        isOpen={isBoletoModalOpen}
        onClose={() => setIsBoletoModalOpen(false)}
        price={parseFloat(
          selectedTurma?.price.replace('R$ ', '').replace('.', '').replace(',', '.') ?? '1000'
        )}
      />

      <PaymentModal
        isOpen={isOldPaymentModalOpen}
        onClose={() => setIsOldPaymentModalOpen(false)}
        itemName={selectedTurma?.title ?? 'TEORIA GERAL DO DIREITO'}
        itemPrice={parseFloat(
          selectedTurma?.price.replace('R$ ', '').replace('.', '').replace(',', '.') ?? '1000'
        )}
        onSuccess={() => {
          setIsOldPaymentModalOpen(false);
          onNavigate('view');
        }}
      />
    </div>
  );
};
