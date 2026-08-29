'use client';

import React, { createContext, useContext, useState } from 'react';

interface Toast {
  id: string;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
  isSimulatingBatch: boolean;
  runBatchSimulation: () => void;
  batchStep: string;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  isSimulatingBatch: false,
  runBatchSimulation: () => {},
  batchStep: ''
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isSimulatingBatch, setIsSimulatingBatch] = useState(false);
  const [batchStep, setBatchStep] = useState('');

  const showToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const runBatchSimulation = () => {
    if (isSimulatingBatch) return;
    setIsSimulatingBatch(true);
    const steps = [
      'Scanning payments...',
      'Analyzing revenue risk...',
      'Diagnosing failures...',
      'Generating recovery strategies...',
      'Applying safety policies...',
      'Calculating recovered revenue...'
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setBatchStep(step);
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsSimulatingBatch(false);
            setBatchStep('');
            showToast('Recovery Batch Execution Complete! 3 new recovery cases updated.');
          }, 800);
        }
      }, index * 900);
    });
  };

  return (
    <ToastContext.Provider value={{ showToast, isSimulatingBatch, runBatchSimulation, batchStep }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#16191E] border border-gold/40 text-text-primary px-4 py-3 rounded text-sm font-medium shadow-2xl flex items-center gap-3 animate-slide-up"
          >
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Batch Simulation Modal / Banner */}
      {isSimulatingBatch && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#16191E] border border-gold/30 rounded-lg p-6 max-w-md w-full shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mx-auto">
              <svg className="animate-spin h-6 w-6 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Executing Recovery Batch</h3>
              <p className="text-xs text-text-secondary mt-1">AI Autonomous Recovery Engine Active</p>
            </div>
            <div className="bg-[#121418] border border-[#242830] p-3 rounded text-sm text-gold font-mono tracking-wide">
              {batchStep}
            </div>
            <div className="w-full bg-[#121418] h-1.5 rounded-full overflow-hidden">
              <div className="bg-gold h-full animate-pulse w-full transition-all duration-300"></div>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
