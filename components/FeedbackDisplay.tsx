import React from 'react';

interface FeedbackDisplayProps {
  feedback: string;
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  return (
    <div className="mt-8 p-6 bg-slate-700 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-sky-400">Gemini's Review Feedback:</h3>
      <pre className="whitespace-pre-wrap break-words text-sm text-slate-200 bg-slate-800 p-4 rounded-md font-mono overflow-x-auto">
        {feedback}
      </pre>
    </div>
  );
};
