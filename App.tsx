import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CodeInput } from './components/CodeInput';
import { LanguageSelector } from './components/LanguageSelector';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { InfoMessage } from './components/InfoMessage';
import { reviewCodeWithGemini } from './services/geminiService';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, SparklesIcon } from './constants';

const App: React.FC = () => {
  const [codeToReview, setCodeToReview] = useState<string>('');
  const [language, setLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [reviewFeedback, setReviewFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitReview = useCallback(async () => {
    if (!codeToReview.trim()) {
      setError("Please enter some code to review.");
      setReviewFeedback(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setReviewFeedback(null);
    try {
      const feedback = await reviewCodeWithGemini(codeToReview, language);
      setReviewFeedback(feedback);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [codeToReview, language]);

  const currentLanguageLabel = SUPPORTED_LANGUAGES.find(l => l.value === language)?.label || language;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-slate-800 shadow-2xl rounded-lg p-6 md:p-10 border border-slate-700">
          <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
            AI Code Review Assistant
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-3">
              <LanguageSelector
                language={language}
                onLanguageChange={setLanguage}
                disabled={isLoading}
              />
            </div>
          </div>

          <CodeInput
            code={codeToReview}
            onCodeChange={setCodeToReview}
            language={language}
            disabled={isLoading}
          />

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmitReview}
              disabled={isLoading || !codeToReview.trim()}
              className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 disabled:bg-slate-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors duration-150"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="w-5 h-5 mr-2 -ml-1" />
                  Reviewing...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2 -ml-1" />
                  Get AI Review
                </>
              )}
            </button>
          </div>

          {error && <ErrorMessage message={error} className="mt-8" />}
          
          {isLoading && !reviewFeedback && (
             <div className="mt-8 p-6 bg-slate-700 rounded-lg shadow text-center">
                <LoadingSpinner className="w-12 h-12 mx-auto mb-4 text-sky-400" />
                <p className="text-lg font-medium text-slate-300">Analyzing your code with Gemini...</p>
                <p className="text-sm text-slate-400">This might take a few moments.</p>
            </div>
          )}

          {reviewFeedback && !isLoading && (
            <FeedbackDisplay feedback={reviewFeedback} />
          )}

          {!isLoading && !reviewFeedback && !error && (
            <InfoMessage 
              title="Ready to Review Your Code!"
              message={`Paste your ${currentLanguageLabel} code in the editor above and click "Get AI Review" to receive feedback powered by Gemini.`}
              className="mt-8"
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;