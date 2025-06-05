import React from 'react';
import { ErrorIcon } from '../constants';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = "" }) => {
  if (!message) return null;

  return (
    <div className={`p-4 mt-6 bg-red-700 border border-red-600 text-red-100 rounded-md shadow-md flex items-start space-x-3 ${className}`}>
      <ErrorIcon className="h-6 w-6 text-red-200 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-semibold text-red-50">Error</h4>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};
