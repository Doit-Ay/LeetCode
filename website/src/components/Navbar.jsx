import React, { useEffect, useRef } from 'react';
import { Search, X, Code } from 'lucide-react';

export default function Navbar({ searchTerm, setSearchTerm, totalResults, totalProblems }) {
  const inputRef = useRef(null);

  // Keyboard shortcut: Pressing '/' or 'Ctrl+K' focuses search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) && 
          document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Title */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shadow-sm">
            <Code className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg text-gray-900 tracking-tight">
              LeetCode Solutions
            </span>
          </div>
        </a>

        {/* Integrated Search Bar in Title Bar */}
        <div className="flex-1 max-w-xl relative flex items-center">
          <div className="absolute left-3.5 pointer-events-none text-gray-400 flex items-center">
            <Search className="w-4 h-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by problem # (e.g. 20, 100) or title..."
            className="w-full pl-10 pr-24 py-2 text-sm rounded-xl bg-gray-100 hover:bg-gray-100/80 focus:bg-white text-gray-900 placeholder-gray-400 border border-transparent focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
          />

          <div className="absolute right-3 flex items-center gap-1.5">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-200/70 border border-gray-300/60 rounded">
              <span>/</span>
            </div>
          </div>
        </div>

        {/* Total count badge */}
        <div className="hidden md:flex items-center text-xs text-gray-500 shrink-0 font-medium">
          <span>{totalResults} {totalResults === 1 ? 'problem' : 'problems'}</span>
        </div>
      </div>
    </header>
  );
}
