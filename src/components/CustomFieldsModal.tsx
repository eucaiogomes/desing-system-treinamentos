import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CustomFieldsModal: React.FC<CustomFieldsModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [skipText, setSkipText] = useState(false);
  const [skipNumber, setSkipNumber] = useState(false);
  const [skipRegex, setSkipRegex] = useState(false);
  const [skipFile, setSkipFile] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 p-4">
        {/* Overlay - Even lighter for maximum subtlety */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/10"
        />

        {/* Modal Content - Photo-Inspired "Institutional/Acolhedor" Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="relative bg-white rounded-[40px] w-full max-w-[340px] p-6 sm:p-7 shadow-2xl shadow-black/5 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[19px] font-bold text-gray-800">Campos personalizados</h2>
            <button 
              onClick={onClose}
              className="p-1 text-gray-300 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>

          {/* Scrollable Fields Area */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
            
            {/* Campo de Texto */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                CAMPO 06/02 PARA TESTE
              </label>
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <input 
                  type="checkbox" 
                  checked={skipText}
                  onChange={(e) => setSkipText(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand/20 cursor-pointer"
                />
                <span className="text-[13px] text-gray-400 font-medium">Não preencher</span>
              </label>
              <input 
                type="text" 
                placeholder="campo 06/02 para teste"
                disabled={skipText}
                className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 text-[13px] font-medium placeholder:text-gray-300 focus:outline-none focus:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Repetindo estilo para os outros campos para consistência visual */}
            
            {/* Campo Numérico */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                VALOR ESTIMADO
              </label>
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <input 
                  type="checkbox" 
                  checked={skipNumber}
                  onChange={(e) => setSkipNumber(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand/20 cursor-pointer"
                />
                <span className="text-[13px] text-gray-400 font-medium">Não preencher</span>
              </label>
              <input 
                type="number" 
                placeholder="0000"
                disabled={skipNumber}
                className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 text-[13px] font-medium placeholder:text-gray-300 focus:outline-none focus:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Campo de Arquivo */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                ANEXO DE DOCUMENTO
              </label>
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <input 
                  type="checkbox" 
                  checked={skipFile}
                  onChange={(e) => setSkipFile(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand/20 cursor-pointer"
                />
                <span className="text-[13px] text-gray-400 font-medium">Não enviar</span>
              </label>
              <button 
                disabled={skipFile}
                className="bg-[#f2f2f2] text-gray-600 px-8 py-3.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-all disabled:opacity-40 w-fit"
              >
                Escolher Arquivo
              </button>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-4 mt-6">
            <button 
              onClick={onConfirm}
              className="flex-1 bg-[#cc0000] text-white py-4 rounded-full text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/10 active:scale-95"
            >
              Confirmar
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-[#f2f2f2] text-gray-500 py-4 rounded-full text-sm font-bold hover:bg-gray-200 transition-all active:scale-95"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
