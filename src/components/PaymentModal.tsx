import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Pagamento</h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            
            {/* Summary & Coupon */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="pr-4">
                  <h3 className="text-sm font-semibold text-gray-800 leading-tight">{itemName}</h3>
                  {discount > 0 && (
                    <span className="text-[11px] font-bold text-green-600 uppercase tracking-wider mt-1 block">
                      Desconto aplicado
                    </span>
                  )}
                </div>
                <div className="text-right">
                  {discount > 0 && (
                    <div className="text-xs text-gray-400 line-through mb-0.5">
                      R$ {itemPrice.toFixed(2)}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-brand">
                    R$ {finalPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Coupon Area */}
              <div className="pt-4 border-t border-gray-200/60">
                {couponState === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 text-green-700">
                      <Tag size={16} />
                      <span className="text-sm font-bold">{couponCode.toUpperCase()}</span>
                    </div>
                    <button 
                      onClick={handleRemoveCoupon}
                      className="text-green-600 hover:text-green-800 p-1 cursor-pointer"
                      title="Remover cupom"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Digite seu cupom"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          if (couponState === 'error') setCouponState('idle');
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        className={`flex-1 bg-white border ${couponState === 'error' ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-brand focus:ring-brand/20'} rounded-lg px-3 py-2 text-sm outline-none focus:ring-4 transition-all uppercase`}
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim() || couponState === 'loading'}
                        className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                      >
                        {couponState === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Aplicar'}
                      </button>
                    </div>
                    {couponState === 'error' && (
                      <motion.span 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1"
                      >
                        <AlertCircle size={12} /> Cupom inválido ou expirado. Tente "DESCONTO".
                      </motion.span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Método de Pagamento</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'pix' 
                      ? 'border-brand bg-brand/5' 
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${paymentMethod === 'pix' ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-500'}`}>
                    <QrCode size={20} />
                  </div>
                  <span className={`font-bold text-sm ${paymentMethod === 'pix' ? 'text-brand' : 'text-gray-600'}`}>Pix</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'card' 
                      ? 'border-brand bg-brand/5' 
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${paymentMethod === 'card' ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-500'}`}>
                    <CreditCard size={20} />
                  </div>
                  <span className={`font-bold text-sm ${paymentMethod === 'card' ? 'text-brand' : 'text-gray-600'}`}>Cartão</span>
                </button>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                {paymentMethod === 'pix' ? (
                  <motion.div 
                    key="pix"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center text-center"
                  >
                    <h5 className="text-sm font-bold text-gray-800 mb-1">Escaneie o QR Code</h5>
                    <p className="text-xs text-gray-500 mb-4">para pagar com pix</p>
                    
                    <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm mb-4">
                      {/* Fake QR Code */}
                      <div className="w-40 h-40 bg-gray-50 flex items-center justify-center rounded-lg border border-gray-100">
                        <QrCode size={64} className="text-gray-300" />
                      </div>
                    </div>

                    <button 
                      onClick={handleCopyPix}
                      className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-brand transition-colors px-4 py-2 rounded-lg border border-gray-200 hover:border-brand/30 hover:bg-brand/5 cursor-pointer"
                    >
                      {pixCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      {pixCopied ? 'Código copiado!' : 'Pix copia e cola'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Número do Cartão</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-gray-200 focus:border-brand focus:ring-4 focus:ring-brand/20 rounded-lg px-3 py-2.5 text-sm outline-none transition-all" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Validade</label>
                        <input type="text" placeholder="MM/AA" className="w-full bg-white border border-gray-200 focus:border-brand focus:ring-4 focus:ring-brand/20 rounded-lg px-3 py-2.5 text-sm outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">CVV</label>
                        <input type="text" placeholder="123" className="w-full bg-white border border-gray-200 focus:border-brand focus:ring-4 focus:ring-brand/20 rounded-lg px-3 py-2.5 text-sm outline-none transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome do Titular</label>
                      <input type="text" placeholder="Como impresso no cartão" className="w-full bg-white border border-gray-200 focus:border-brand focus:ring-4 focus:ring-brand/20 rounded-lg px-3 py-2.5 text-sm outline-none transition-all uppercase" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-100 p-4 sm:px-6 bg-gray-50 flex justify-end gap-3">
            <button 
              onClick={onClose}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing && <Loader2 size={16} className="animate-spin" />}
              {paymentMethod === 'pix' ? 'Simular Pagamento Pix' : 'Confirmar Pagamento'}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
