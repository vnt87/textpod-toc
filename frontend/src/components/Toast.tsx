import { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface ToastMessage {
    id: string;
    type: 'success' | 'error';
    message: string;
}

interface ToastProps {
    toast: ToastMessage;
    onDismiss: (id: string) => void;
}

function Toast({ toast, onDismiss }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(toast.id);
        }, 3000);

        return () => clearTimeout(timer);
    }, [toast.id, onDismiss]);

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all ${toast.type === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
        >
            {toast.type === 'success' ? (
                <CheckCircleIcon className="w-5 h-5 shrink-0" />
            ) : (
                <XCircleIcon className="w-5 h-5 shrink-0" />
            )}
            <span className="text-sm">{toast.message}</span>
            <button
                onClick={() => onDismiss(toast.id)}
                className="ml-2 p-1 hover:bg-white/20 rounded transition-colors"
            >
                <XMarkIcon className="w-4 h-4" />
            </button>
        </div>
    );
}

interface ToastContainerProps {
    toasts: ToastMessage[];
    onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
    return (
        <div className="fixed bottom-4 right-4 flex flex-col-reverse gap-2 z-50">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
        </div>
    );
}

// Hook for managing toasts
export function useToast() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = (type: 'success' | 'error', message: string) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, type, message }]);
    };

    const dismissToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return { toasts, addToast, dismissToast };
}
