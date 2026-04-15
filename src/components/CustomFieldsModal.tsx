import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

        {/* Modal Content - Positioned higher, subtle border, softer shadow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -15 }}
          className="relative bg-white rounded-2xl w-full max-w-[340px] p-5 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col max-h-[80vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Campos personalizados</h2>
            <button 
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Fields Area - Reduced spacing and font sizes */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
            
            {/* Campo de Texto */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                TIPO: TEXTO
              </label>
              <label className="flex items-center gap-2 cursor-pointer w-fit mb-0.5">
                <input 
                  type="checkbox" 
                  checked={skipText}
                  onChange={(e) => setSkipText(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer"
                />
                <span className="text-xs text-gray-500">Não preencher</span>
              </label>
              <input 
                type="text" 
                placeholder="tipo: texto"
                disabled={skipText}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Campo Numérico */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                TIPO: NUMÉRICO
              </label>
              <label className="flex items-center gap-2 cursor-pointer w-fit mb-0.5">
                <input 
                  type="checkbox" 
                  checked={skipNumber}
                  onChange={(e) => setSkipNumber(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer"
                />
                <span className="text-xs text-gray-500">Não preencher</span>
              </label>
              <input 
                type="number" 
                placeholder="tipo: numérico"
                disabled={skipNumber}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Campo Expressão Regular */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                TIPO: EXPRESSÃO REGULAR
              </label>
              <label className="flex items-center gap-2 cursor-pointer w-fit mb-0.5">
                <input 
                  type="checkbox" 
                  checked={skipRegex}
                  onChange={(e) => setSkipRegex(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer"
                />
                <span className="text-xs text-gray-500">Não preencher</span>
              </label>
              <input 
                type="text" 
                placeholder="tipo: expressão regular"
                disabled={skipRegex}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Campo de Arquivo */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                TIPO: ARQUIVO
              </label>
              <label className="flex items-center gap-2 cursor-pointer w-fit mb-0.5">
                <input 
                  type="checkbox" 
                  checked={skipFile}
                  onChange={(e) => setSkipFile(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer"
                />
                <span className="text-xs text-gray-500">Não enviar</span>
              </label>
              <div>
                <button 
                  disabled={skipFile}
                  className="bg-brand text-white px-6 py-2 rounded-lg text-xs font-medium hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Escolher
                </button>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100">
            <button 
              onClick={onConfirm}
              className="flex-1 bg-brand text-white py-2.5 rounded-lg text-xs font-bold hover:bg-brand-dark transition-colors"
            >
              Confirmar
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
