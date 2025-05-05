import React, { createContext, useContext, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  visible: boolean;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: ToastState;
  showToast: (title: string, message?: string, type?: ToastType) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showToast = (title: string, message?: string, type: ToastType = 'info') => {
    setToast({
      visible: true,
      title,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast({
      ...toast,
      visible: false
    });
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};