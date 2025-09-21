
import React, { useState, useCallback } from 'react';
import { translateText } from '../services/geminiService';
import { ArrowLeftRightIcon, LanguageIcon, LoadingSpinnerIcon } from './Icons';

const languageOptions = [
  { value: 'Arabic', label: 'العربية' },
  { value: 'English', label: 'الإنجليزية' },
  { value: 'French', label: 'الفرنسية' },
  { value: 'Spanish', label: 'الإسبانية' },
  { value: 'German', label: 'الألمانية' },
];

const Translator: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('French');
  const [targetLang, setTargetLang] = useState('Arabic');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim()) return;
    setIsLoading(true);
    setTranslatedText('');
    const result = await translateText(sourceText, sourceLang, targetLang);
    setTranslatedText(result);
    setIsLoading(false);
  }, [sourceText, sourceLang, targetLang]);

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center">
        <LanguageIcon />
        <span className="mr-3">مترجم النصوص</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex items-center justify-center md:hidden">
            <button
            onClick={swapLanguages}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
            title="تبديل اللغات"
          >
            <ArrowLeftRightIcon />
          </button>
        </div>
        
        {/* Source Text Area */}
        <div className="flex flex-col space-y-2">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {languageOptions.map((lang) => (
              <option key={`source-${lang.value}`} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
            placeholder="أدخل النص هنا..."
          ></textarea>
        </div>
        
        {/* Swap Button and Target Text Area */}
        <div className="flex flex-col space-y-2">
           <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {languageOptions.map((lang) => (
              <option key={`target-${lang.value}`} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <div className="relative w-full">
            <textarea
              value={translatedText}
              readOnly
              rows={8}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 resize-none"
              placeholder="الترجمة..."
            ></textarea>
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-md">
                <LoadingSpinnerIcon />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
         <button
          onClick={swapLanguages}
          className="hidden md:flex p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
          title="تبديل اللغات"
        >
          <ArrowLeftRightIcon />
        </button>
        <button
          onClick={handleTranslate}
          disabled={isLoading || !sourceText}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <LoadingSpinnerIcon />
              <span className="mr-2">جاري الترجمة...</span>
            </>
          ) : (
            'ترجمة'
          )}
        </button>
      </div>
    </div>
  );
};

export default Translator;
