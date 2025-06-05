import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { LanguageOption } from '../types';

interface LanguageSelectorProps {
  language: string;
  onLanguageChange: (language: string) => void;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onLanguageChange, disabled }) => {
  return (
    <div>
      <label htmlFor="languageSelect" className="block text-sm font-medium text-slate-300 mb-1">
        Select Language
      </label>
      <select
        id="languageSelect"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        disabled={disabled}
        className="block w-full pl-3 pr-10 py-2.5 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-slate-100 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-colors duration-150"
      >
        {SUPPORTED_LANGUAGES.map((lang: LanguageOption) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
