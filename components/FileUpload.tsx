import React from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import { UploadedFile, AnalysisMode } from '../types';
import { formatFileSize } from '../utils/fileUtils';

interface FileUploadProps {
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  disabled: boolean;
  mode: AnalysisMode;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles, disabled, mode }) => {
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files).map(file => ({
        file
      }));
      
     
      setFiles(prev => [...prev, ...newFiles].slice(0, 2));
    }
   
    event.target.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const isComparison = mode === 'COMPARISON';

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        {}
        <div className="flex flex-col">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4">
              {isComparison ? 'Upload Versions' : 'Upload Contracts'}
            </h4>
            
            <div className={`relative group flex-1 min-h-[20rem] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 ${
            disabled 
                ? 'bg-zinc-50 border-zinc-200 opacity-50 cursor-not-allowed' 
                : 'border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50/50'
            }`}>
                <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileChange}
                    disabled={disabled || files.length >= 2}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                />
                
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-5 group-hover:scale-110 transition-transform duration-300 border border-zinc-100">
                    <UploadCloud className="h-6 w-6 text-zinc-900" />
                </div>
                
                <div className="space-y-1">
                    <p className="text-sm font-semibold text-zinc-900">
                        <span className="cursor-pointer border-b-2 border-zinc-900 pb-0.5 hover:text-zinc-600 hover:border-zinc-600 transition-colors">Click to browse</span> or drag & drop.
                    </p>
                    <p className="text-xs text-zinc-400 font-medium">
                      {isComparison ? 'Upload Original & New Version' : 'Supports PDF (Max 2 files)'}
                    </p>
                </div>
            </div>
        </div>

        {}
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">
                   {isComparison ? 'Versions to Compare' : 'Selected Documents'}
                </h4>
                <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-1 rounded-md">{files.length}/2</span>
            </div>
            
            <div className={`flex-1 min-h-[20rem] border border-zinc-200 rounded-2xl bg-white overflow-hidden flex flex-col relative transition-all duration-300 ${files.length > 0 ? 'shadow-sm' : ''}`}>
                {files.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-sm italic text-zinc-300 font-medium select-none">No documents uploaded yet.</p>
                    </div>
                ) : (
                    <div className="p-4 space-y-3">
                        {files.map((f, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white border border-zinc-100 rounded-xl shadow-sm hover:shadow-md transition-all group animate-fade-in">
                                <div className="flex items-center space-x-3 overflow-hidden">
                                    <div className="bg-zinc-50 p-2.5 rounded-lg flex-shrink-0 border border-zinc-100 text-zinc-700">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-zinc-900 truncate max-w-[140px] sm:max-w-[200px]">{f.file.name}</p>
                                        <p className="text-[10px] text-zinc-400 uppercase tracking-wide font-medium">
                                          {formatFileSize(f.file.size)}
                                        </p>
                                    </div>
                                </div>
                                {!disabled && (
                                    <button 
                                        onClick={() => removeFile(index)}
                                        className="p-1.5 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
