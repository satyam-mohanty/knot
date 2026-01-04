import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import AnalysisResults from './components/AnalysisResults';
import { UploadedFile, AnalysisResponse } from './types';
import { analyzeContracts } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { ArrowRight, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (files.length === 0) return;

    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
  
      const base64Promises = files.map(f => fileToBase64(f.file));
      const base64Files = await Promise.all(base64Promises);

      const analysis = await analyzeContracts(base64Files);
      setResults(analysis);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setFiles([]);
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-zinc-900">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {!results && !isAnalyzing && (
            <div className="text-center mb-12 animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6">
                    Untangle <span className="text-zinc-200">Legal Complexity</span>
                </h1>
                <p className="text-lg text-zinc-100/80 text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    Knot uses advanced AI to audit contracts, identifying contradictions and hidden liabilities across your legal documents instantly.
                </p>
            </div>
        )}

        <div className={`bg-white rounded-3xl shadow-2xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden transition-all duration-700 ease-in-out ${results ? 'mb-10 ring-1 ring-zinc-100' : 'mb-0'}`}>
            <div className="p-8 md:p-12">
                <FileUpload 
                    files={files} 
                    setFiles={setFiles} 
                    disabled={isAnalyzing || !!results}
                />

                {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm flex items-center">
                        <span className="font-bold mr-2">Error:</span> {error}
                    </div>
                )}

                {!results && (
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleAnalyze}
                            disabled={files.length === 0 || isAnalyzing}
                            className={`flex items-center px-6 py-3 rounded-full font-medium text-sm transition-all transform
                                ${files.length === 0 || isAnalyzing 
                                    ? 'bg-zinc-200 cursor-not-allowed text-zinc-500' 
                                    : 'bg-zinc-900 hover:bg-black text-white shadow-lg hover:-translate-y-0.5'
                                }
                            `}
                        >
                            {isAnalyzing ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Analyze Contracts
                                    <ArrowRight className="w-4 h-4 ml-2 opacity-70" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {results && (
                <div className="bg-zinc-50 border-t border-zinc-100 px-8 py-4 flex justify-between items-center">
                    <span className="text-sm text-zinc-500 font-medium">{files.length} document(s) analyzed</span>
                    <button 
                        onClick={resetAnalysis}
                        className="text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                    >
                        Start New Analysis
                    </button>
                </div>
            )}
        </div>

        <AnalysisResults data={results} loading={isAnalyzing} />

      </main>
    </div>
  );
};

export default App;