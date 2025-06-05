import React from 'react';
import { InformationCircleIcon } from '../constants';

interface InfoMessageProps {
  title: string;
  message: string | React.ReactNode;
  className?: string;
}

export const InfoMessage: React.FC<InfoMessageProps> = ({ title, message, className = "" }) => {
  return (
    <div className={`p-4 mt-6 bg-sky-700 border border-sky-600 text-sky-100 rounded-md shadow-md flex items-start space-x-3 ${className}`}>
      <InformationCircleIcon className="h-6 w-6 text-sky-200 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-semibold text-sky-50">{title}</h4>
        {typeof message === 'string' ? <p className="text-sm">{message}</p> : <div className="text-sm">{message}</div>}
      </div>
    </div>
  );
};
