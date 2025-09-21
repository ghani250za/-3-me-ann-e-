import { GoogleGenAI } from "@google/genai";

// Fix: Initialize GoogleGenAI client directly with process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const translateText = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  if (!text.trim()) {
    return "";
  }

  const prompt = `Translate the following text from ${sourceLang} to ${targetLang}. Provide only the translation, without any additional comments, introductions, or explanations.\n\nText to translate: "${text}"`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error translating text:", error);
    return "حدث خطأ أثناء الترجمة. يرجى المحاولة مرة أخرى.";
  }
};