import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-zinc-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <p className="text-sm font-medium text-zinc-400 flex items-center gap-1">
          Built with <Heart className="w-4 h-4 fill-zinc-400 text-zinc-400" /> by Rupam and Satyam
        </p>
      </div>
    </footer>
  );
};

export default Footer;