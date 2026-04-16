import React, { useState } from 'react';
import { CourseCatalog } from './components/CourseCatalog';
import { TrilhaCatalog } from './components/TrilhaCatalog';
import { TrilhaView } from './components/TrilhaView';
import TrainingView from './components/TrainingView';
import { DesignSystem } from './components/DesignSystem';
import { BookOpen, Play, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'catalog' | 'view' | 'design' | 'trilha' | 'trilhaView'>('catalog');
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
    <div className="min-h-screen bg-slate-50">
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

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.main 
          key={currentScreen}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className={currentScreen === 'view' || currentScreen === 'trilhaView' ? 'h-[100dvh] overflow-hidden' : 'min-h-[100dvh]'}
        >
          {currentScreen === 'catalog' && <div className="pb-32"><CourseCatalog /></div>}
          {currentScreen === 'trilha' && <div className="pb-32"><TrilhaCatalog /></div>}
          {currentScreen === 'view' && <TrainingView />}
          {currentScreen === 'trilhaView' && <TrilhaView />}
          {currentScreen === 'design' && <div className="pb-32"><DesignSystem /></div>}
        </motion.main>
      </AnimatePresence>

      {/* Simple Navigation for Demo - Moved to bottom for better stacking context */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex gap-2 z-[100]">
        <button 
          onClick={() => setCurrentScreen('catalog')}
          title="Catálogo de Treinamento"
          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
            currentScreen === 'catalog' 
              ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          1
        </button>
        <button 
          onClick={() => setCurrentScreen('view')}
          title="Visualização"
          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
            currentScreen === 'view' 
              ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          2
        </button>
        <button 
          onClick={() => setCurrentScreen('design')}
          title="Design"
          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
            currentScreen === 'design' 
              ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          3
        </button>
        <button 
          onClick={() => setCurrentScreen('trilha')}
          title="Catálogo de Trilha"
          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
            currentScreen === 'trilha' 
              ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          4
        </button>
        <button 
          onClick={() => setCurrentScreen('trilhaView')}
          title="Visualização da Trilha"
          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
            currentScreen === 'trilhaView' 
              ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          5
        </button>
      </div>
    </div>
  );
}
