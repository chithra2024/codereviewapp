import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';

// IMPORTANT: This relies on process.env.API_KEY being set in the execution environment.
// The application UI will NOT prompt for this key.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.error(
    "Gemini API key not found. Please set the process.env.API_KEY environment variable. API calls will fail."
  );
}

export const reviewCodeWithGemini = async (code: string, language: string): Promise<string> => {
  if (!ai) {
    throw new Error(
      "Gemini API client is not initialized. This is likely due to a missing API key (process.env.API_KEY)."
    );
  }

  const prompt = `
You are an expert AI code reviewer. Your task is to analyze the provided code snippet and offer constructive feedback.

Please review the following ${language} code.

Provide your feedback as plain text, but use Markdown-like syntax for structure. 
Use triple asterisks for headings (e.g., *** Potential Bugs ***).
Use hyphens or asterisks for bullet points (e.g., - This is a point or * This is a point).
Ensure generous use of newlines for readability, especially when the output might be displayed in a <pre> tag or simple text area.

Structure your review with clear sections:
- *** Overall Impression & Summary ***
  A brief overview of the code.
- *** Potential Bugs & Errors ***
  Identify any logical errors, potential runtime errors, or unhandled edge cases.
- *** Code Style & Best Practices ***
  Comment on adherence to ${language}-specific conventions, naming clarity, formatting consistency, and established software engineering best practices.
- *** Performance Considerations ***
  Point out any potential performance bottlenecks or suggest areas for optimization if applicable.
- *** Security Vulnerabilities ***
  Highlight any common security risks (e.g., injection vulnerabilities, insecure handling of data, improper error handling that might leak information) if applicable to the snippet.
- *** Clarity & Readability ***
  Assess how easy the code is to understand and maintain. Suggest improvements for comments, code structure, variable naming, or function modularity.
- *** Suggestions for Improvement ***
  Offer specific, actionable recommendations to enhance the code quality, robustness, or efficiency.
- *** Positive Aspects ***
  Acknowledge what the code does well or any particularly good practices observed.

Be concise yet thorough. Focus on providing valuable insights that would help a developer improve their code.

Code to review:
\`\`\`${language}
${code}
\`\`\`

Please provide your review below:
`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    let message = "Error generating code review. Please try again later.";
    if (error instanceof Error) {
        message = `Error generating code review: ${error.message}`;
        if ((error as any).message?.includes('API key not valid') || (error as any).message?.includes('permission denied')) {
            message = "Error generating code review: The Gemini API key is invalid, not authorized, or missing. Please ensure the API_KEY environment variable is correctly configured and valid.";
        } else if ((error as any).message?.includes('quota')) {
            message = "Error generating code review: API quota exceeded. Please check your Gemini project quotas or try again later.";
        } else if ((error as any).message?.includes('fetch')) {
             message = "Error generating code review: Network error or issue reaching the Gemini API. Please check your internet connection.";
        }
    }
    throw new Error(message);
  }
};
