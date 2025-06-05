import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-700 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Gemini Code Reviewer. Powered by AI.
        </p>
        <p className="text-xs mt-1">
          This tool provides AI-generated feedback and should be used as a supplement to, not a replacement for, human review.
        </p>
      </div>
    </footer>
  );
};
