import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-zinc-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center text-zinc-900">
              <img src="https://github.com/RupamCodes/knot/blob/main/public/mainlogo.png?raw=true$0" alt="Knot Logo" className="h-8 w-auto" />              
            </div>
            
            <div className="w-px h-5 bg-zinc-300"></div>
            
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                Legal Intelligence
              </span>
            </div>
          </div>
          
          <nav className="flex gap-8">
            <a 
              href="#" 
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Methodology
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Docs
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;