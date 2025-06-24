import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-500 bg-opacity-20 backdrop-blur-md border border-red-400 border-opacity-30 rounded-2xl p-6 shadow-xl mb-6 hover:bg-opacity-30 transition-all duration-300 group">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
        <div className="flex-1">
          <p className="text-white font-medium group-hover:text-red-200 transition-colors duration-300">Error</p>
          <p className="text-white text-sm opacity-90 mt-1 group-hover:opacity-100 transition-opacity duration-300">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-white hover:text-red-200 hover:scale-110 transition-all duration-300 ml-2 p-1 rounded-full hover:bg-white hover:bg-opacity-20"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;