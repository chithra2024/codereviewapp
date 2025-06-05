import React from 'react';
import { CodeBracketIcon } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 shadow-md sticky top-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <CodeBracketIcon className="h-8 w-8 text-sky-400" />
          <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">
            Gemini Code Reviewer
          </h1>
        </div>
      </div>
    </header>
  );
};
