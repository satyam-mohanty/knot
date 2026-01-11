import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FileUpload from './components/FileUpload';
import AnalysisResults from './components/AnalysisResults';
import { UploadedFile, AnalysisResponse, AnalysisMode } from './types';
import { analyzeContracts } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { ArrowRight, Sparkles, Scale, FileSearch } from 'lucide-react';

const App: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<AnalysisMode>('ANALYSIS');

  const handleAnalyze = async () => {
    if (files.length === 0) return;
   
    if (mode === 'COMPARISON' && files.length < 2) {
      setError("Comparison mode requires 2 documents (Original and New Version).");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const base64Promises = files.map(f => fileToBase64(f.file));
      const base64Files = await Promise.all(base64Promises);

      const analysis = await analyzeContracts(base64Files, mode);
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

  const toggleMode = (newMode: AnalysisMode) => {
    if (mode === newMode) return;
    setMode(newMode);
    setResults(null);
    setError(null);
    setFiles([]); 
  };

  const hasResults = !!results;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-zinc-900">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className={`text-center animate-fade-in-up transition-all duration-500 ease-in-out ${hasResults ? 'mb-8' : 'mb-12'}`}>
            
            <div className="inline-flex bg-zinc-100 p-1 rounded-full mb-8 relative">
                <button
                    onClick={() => toggleMode('ANALYSIS')}
                    className={`relative z-10 flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        mode === 'ANALYSIS' 
                        ? 'bg-white text-zinc-900 shadow-sm' 
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                >
                    <FileSearch className="w-4 h-4 mr-2" />
                    Audit Analysis
                </button>
                <button
                    onClick={() => toggleMode('COMPARISON')}
                    className={`relative z-10 flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        mode === 'COMPARISON' 
                        ? 'bg-white text-zinc-900 shadow-sm' 
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                >
                    <Scale className="w-4 h-4 mr-2" />
                    Compare Versions
                </button>
            </div>
            <h1 className={`font-bold text-zinc-900 tracking-tight transition-all duration-500 ${hasResults ? 'text-3xl md:text-4xl mb-4' : 'text-5xl md:text-6xl mb-6'}`}>
                {mode === 'ANALYSIS' ? (
                    <>Untangle <span className="text-zinc-200">Legal Complexity</span></>
                ) : (
                    <>Compare <span className="text-zinc-200">Legal Versions</span></>
                )}
            </h1>
            
            <div className={`overflow-hidden transition-all duration-500 ${hasResults ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    {mode === 'ANALYSIS' 
                        ? "Knot uses advanced AI to audit contracts, identifying contradictions and hidden liabilities across your legal documents instantly."
                        : "Instantly detect changes, deleted clauses, and new liabilities between your original agreements and redlines."
                    }
                </p>
            </div>
        </div>

        <div className={`bg-white rounded-3xl shadow-2xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden transition-all duration-700 ease-in-out ${results ? 'mb-10 ring-1 ring-zinc-100' : 'mb-0'}`}>
            <div className="p-8 md:p-12">
                <FileUpload 
                    files={files} 
                    setFiles={setFiles} 
                    disabled={isAnalyzing || !!results}
                    mode={mode}
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
                                    {mode === 'ANALYSIS' ? 'Analyze Contracts' : 'Compare Versions'}
                                    <ArrowRight className="w-4 h-4 ml-2 opacity-70" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
            
            {results && (
                <div className="bg-zinc-50 border-t border-zinc-100 px-8 py-4 flex justify-between items-center">
                    <span className="text-sm text-zinc-500 font-medium">
                        {files.length} document(s) {mode === 'ANALYSIS' ? 'analyzed' : 'compared'}
                    </span>
                    <button 
                        onClick={resetAnalysis}
                        className="text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                    >
                        Start New {mode === 'ANALYSIS' ? 'Analysis' : 'Comparison'}
                    </button>
                </div>
            )}
        </div>

        <AnalysisResults data={results} loading={isAnalyzing} />

      </main>
      
      <Footer />
    </div>
  );
};

export default App;