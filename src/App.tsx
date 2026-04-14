import React, { useState } from 'react';
import { CourseCatalog } from './components/CourseCatalog';
import TrainingView from './components/TrainingView';
import { DesignSystem } from './components/DesignSystem';
import { BookOpen, Play, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'catalog' | 'view' | 'design'>('catalog');
  const [activeColor, setActiveColor] = useState('#c00000');

  const colors = [
    { id: 'red', value: '#c00000', dark: '#a00000' },
    { id: 'orange', value: '#eb6200', dark: '#c55200' },
    { id: 'green', value: '#8ed02e', dark: '#76ad26' },
    { id: 'dark', value: '#414141', dark: '#000000' }
  ];

  const handleColorChange = (color: { value: string, dark: string }) => {
    setActiveColor(color.value);
    document.documentElement.style.setProperty('--brand-color', color.value);
    document.documentElement.style.setProperty('--brand-color-dark', color.dark);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Minimalist Color Switcher */}
      <div className="fixed top-6 right-6 flex gap-2 z-[60]">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorChange(color)}
            className={`w-4 h-4 rounded-full transition-all hover:scale-125 cursor-pointer shadow-sm ${
              activeColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
            }`}
            style={{ backgroundColor: color.value }}
            title={`Mudar para ${color.id}`}
          />
        ))}
      </div>

      {/* Simple Navigation for Demo */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-full p-1 shadow-2xl flex gap-1 z-50">
        <button 
          onClick={() => setCurrentScreen('catalog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10.5px] font-bold transition-all ${
            currentScreen === 'catalog' 
              ? 'bg-brand text-white shadow-lg shadow-brand/20' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <BookOpen size={14} />
          Catálogo
        </button>
        <button 
          onClick={() => setCurrentScreen('view')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10.5px] font-bold transition-all ${
            currentScreen === 'view' 
              ? 'bg-brand text-white shadow-lg shadow-brand/20' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Play size={14} />
          Visualização
        </button>
        <button 
          onClick={() => setCurrentScreen('design')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10.5px] font-bold transition-all ${
            currentScreen === 'design' 
              ? 'bg-brand text-white shadow-lg shadow-brand/20' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Box size={14} />
          Design
        </button>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={currentScreen}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="pb-20"
        >
          {currentScreen === 'catalog' && <CourseCatalog />}
          {currentScreen === 'view' && <TrainingView />}
          {currentScreen === 'design' && <DesignSystem />}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
