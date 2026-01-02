import React, { useCallback } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import { UploadedFile } from '../types';
import { formatFileSize } from '../utils/fileUtils';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  disabled: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles, disabled }) => {
  
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

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <motion.div 
          whileHover={!disabled ? { scale: 1.02, borderColor: '#52525b' } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          className={`relative group border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-colors duration-300 ${
           disabled 
            ? 'bg-zinc-50 border-zinc-200 opacity-50 cursor-not-allowed' 
            : 'border-zinc-300 bg-zinc-50/50 hover:bg-zinc-50'
        }`}>
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
            disabled={disabled || files.length >= 2}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          />
          <div className="bg-white p-4 rounded-2xl shadow-sm mb-5 group-hover:scale-110 transition-transform duration-300">
            <UploadCloud className="h-8 w-8 text-zinc-900" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 mb-2">
            {files.length >= 2 ? 'Limit Reached' : 'Upload Contracts'}
          </h3>
          <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
            Drag & drop PDF files here, or click to browse. 
            <span className="text-xs text-zinc-400 mt-2 block font-medium">Supports PDF (Max 2 files)</span>
          </p>
        </motion.div>


        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end mb-1">
                <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">Selected Documents</h4>
                <span className="text-xs font-medium text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">{files.length}/2</span>
            </div>
            
            {files.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center border border-zinc-200 rounded-2xl bg-white text-zinc-400 text-sm p-8 text-center dashed-pattern">
                    <p className="italic">No documents uploaded yet.</p>
                </div>
            )}
            
            <AnimatePresence>
            {files.map((f, index) => (
                <motion.div 
                    key={`${f.file.name}-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center space-x-4 overflow-hidden">
                        <div className="bg-zinc-100 p-2.5 rounded-lg flex-shrink-0">
                            <FileText className="h-5 w-5 text-zinc-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-zinc-900 truncate">{f.file.name}</p>
                            <p className="text-xs text-zinc-500">{formatFileSize(f.file.size)}</p>
                        </div>
                    </div>
                    {!disabled && (
                        <button 
                            onClick={() => removeFile(index)}
                            className="p-2 hover:bg-red-50 text-zinc-400 hover:text-red-600 rounded-lg transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;