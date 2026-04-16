import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, CreditCard, Check, Copy, Tag, AlertCircle, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemPrice: number;
  onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  itemName,
  itemPrice,
  onSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [couponState, setCouponState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [discount, setDiscount] = useState(0);

  // Payment State
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPaymentMethod('pix');
      setCouponCode('');
      setCouponState('idle');
      setDiscount(0);
      setIsProcessing(false);
      setPixCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const finalPrice = Math.max(0, itemPrice - discount);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    setCouponState('loading');
    
    // Simulate API call
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'DESCONTO') {
        setDiscount(itemPrice * 0.2); // 20% discount
        setCouponState('success');
      } else {
        setCouponState('error');
      }
    }, 800);
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponState('idle');
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(); // Triggers the "Reenviar campos" state in the parent
    }, 1500);
  };

  const handleCopyPix = () => {
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/10"
        />

        {/* Modal Card - Consistent with the "Institutional/Acolhedor" style */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="relative w-full max-w-[320px] bg-white rounded-[40px] shadow-2xl shadow-black/5 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100/50">
            <h2 className="text-[19px] font-bold text-gray-800">Pagamento</h2>
            <button 
              onClick={onClose}
              className="p-1 text-gray-300 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
            
            {/* Summary & Coupon */}
            <div className="bg-[#f8f9fa] rounded-[28px] p-6 border border-gray-100/50">
              <div className="flex justify-between items-start mb-6">
                <div className="pr-4">
                  <h3 className="text-[14px] font-bold text-gray-800 leading-tight mb-1">{itemName}</h3>
                  {discount > 0 && (
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest block">
                      Cupom aplicado
                    </span>
                  )}
                </div>
                <div className="text-right">
                  {discount > 0 && (
                    <div className="text-[11px] text-gray-400 line-through mb-0.5">
                      R$ {itemPrice.toFixed(2)}
                    </div>
                  )}
                  <div className="text-[24px] font-bold text-[#cc0000] tracking-tighter">
                    R$ {finalPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Coupon Area */}
              <div className="pt-6 border-t border-gray-200/50">
                {couponState === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-between bg-green-50 rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-2 text-green-700">
                      <Tag size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">{couponCode}</span>
                    </div>
                    <button 
                      onClick={handleRemoveCoupon}
                      className="text-green-500 hover:text-green-700 p-1 cursor-pointer transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Possui cupom?</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="CÓDIGO"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          if (couponState === 'error') setCouponState('idle');
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        className={`flex-1 bg-white border ${couponState === 'error' ? 'border-red-200 focus:border-red-400' : 'border-gray-200 focus:border-gray-400'} rounded-full px-6 py-3 text-[13px] font-medium outline-none transition-all uppercase placeholder:text-gray-200`}
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim() || couponState === 'loading'}
                        className="bg-gray-800 text-white px-6 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                      >
                        {couponState === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Aplicar'}
                      </button>
                    </div>
                    {couponState === 'error' && (
                      <motion.span 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1 ml-2 uppercase"
                      >
                        <AlertCircle size={12} /> Cupom inválido. Use "DESCONTO".
                      </motion.span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5 ml-2">Método de Pagamento</h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex flex-col items-center gap-3 p-6 rounded-[32px] border-2 transition-all cursor-pointer ${
                    paymentMethod === 'pix' 
                      ? 'border-[#cc0000] bg-red-50/10' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className={`p-3 rounded-full ${paymentMethod === 'pix' ? 'bg-[#cc0000] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <QrCode size={24} />
                  </div>
                  <span className={`font-bold text-xs uppercase tracking-widest ${paymentMethod === 'pix' ? 'text-[#cc0000]' : 'text-gray-400'}`}>Pix</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-3 p-6 rounded-[32px] border-2 transition-all cursor-pointer ${
                    paymentMethod === 'card' 
                      ? 'border-[#cc0000] bg-red-50/10' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className={`p-3 rounded-full ${paymentMethod === 'card' ? 'bg-[#cc0000] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <CreditCard size={24} />
                  </div>
                  <span className={`font-bold text-xs uppercase tracking-widest ${paymentMethod === 'card' ? 'text-[#cc0000]' : 'text-gray-400'}`}>Cartão</span>
                </button>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="min-h-[220px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {paymentMethod === 'pix' ? (
                  <motion.div 
                    key="pix"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center w-full"
                  >
                    <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-xl shadow-black/5 mb-8">
                      {/* Fake QR Code */}
                      <div className="w-48 h-48 bg-gray-50 flex items-center justify-center rounded-2xl border border-dashed border-gray-200">
                        <QrCode size={64} className="text-gray-200" />
                      </div>
                    </div>

                    <button 
                      onClick={handleCopyPix}
                      className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#cc0000] transition-all px-8 py-4 rounded-full border border-gray-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer bg-white"
                    >
                      {pixCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      {pixCopied ? 'Código Copiado!' : 'Copiar Código Pix'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-6 w-full"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Número do Cartão</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-gray-200 focus:border-gray-400 rounded-full px-6 py-4 text-[13px] font-medium outline-none transition-all placeholder:text-gray-200" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Validade</label>
                        <input type="text" placeholder="MM/AA" className="w-full bg-white border border-gray-200 focus:border-gray-400 rounded-full px-6 py-4 text-[13px] font-medium outline-none transition-all placeholder:text-gray-200" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">CVV</label>
                        <input type="text" placeholder="123" className="w-full bg-white border border-gray-200 focus:border-gray-400 rounded-full px-6 py-4 text-[13px] font-medium outline-none transition-all placeholder:text-gray-200" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Nome Completo</label>
                      <input type="text" placeholder="Como no cartão" className="w-full bg-white border border-gray-200 focus:border-gray-400 rounded-full px-6 py-4 text-[13px] font-medium outline-none transition-all uppercase placeholder:text-gray-200" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 pt-0 flex gap-3">
            <button 
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="flex-3 bg-[#cc0000] text-white h-14 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-500/10 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing && <Loader2 size={18} className="animate-spin" />}
              {paymentMethod === 'pix' ? 'Confirmar Pagamento' : 'Pagar Agora'}
            </button>
            <button 
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 bg-[#f2f2f2] text-gray-500 h-14 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-all cursor-pointer disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
