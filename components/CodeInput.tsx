import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  disabled?: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, onCodeChange, language, disabled }) => {
  const currentLanguageLabel = SUPPORTED_LANGUAGES.find(l => l.value === language)?.label || 'selected language';
  const placeholderText = `// Paste your ${currentLanguageLabel} code here...\n\n// Example for ${currentLanguageLabel}:\nfunction helloWorld() {\n  console.log("Hello from ${currentLanguageLabel}!");\n}\n\nhelloWorld();`;

  return (
    <div className="mt-1">
      <label htmlFor="codeInput" className="block text-sm font-medium text-slate-300 mb-1">
        Code to Review
      </label>
      <textarea
        id="codeInput"
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder={placeholderText}
        disabled={disabled}
        rows={15}
        className="block w-full p-3 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-colors duration-150 font-mono text-sm"
        spellCheck="false"
      />
       <p className="mt-2 text-xs text-slate-400">
        Enter or paste your code snippet in the editor above. For best results, ensure the code is complete enough for context.
      </p>
    </div>
  );
};
