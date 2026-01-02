import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText } from 'lucide-react';



const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 flex items-center text-zinc-900">
              <img src="/mainlogo.png" alt="Knot Logo" className="h-8 w-auto" />              
            </div>
            <div className="hidden md:block w-px h-6 bg-zinc-200 mx-2"></div>
            <div className="hidden md:block">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                Legal Intelligence
              </span>
            </div>
          </div>
          <nav className="flex gap-8">
            <a 
              href="#" 
              className="group relative text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors py-2 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Methodology
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-900 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
              />
            </a>
            <a 
              href="#" 
              className="group relative text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors py-2 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Docs
               <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-900 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
              />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;