import React, { useEffect, useRef } from 'react';
import { Search, X, Hash } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, totalResults, totalProblems }) {
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
    <div className="w-full">
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-gray-500 flex items-center">
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by problem # (e.g. 100, 20) or title (e.g. Same Tree, Subarray)..."
          className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base rounded-2xl bg-gray-900/90 hover:bg-gray-900 text-gray-100 placeholder-gray-500 border border-gray-800 focus:border-amber-500/80 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all shadow-xl backdrop-blur-sm"
        />

        <div className="absolute right-3.5 flex items-center gap-2">
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-gray-400 bg-gray-800/80 border border-gray-700/60 rounded-md">
            <kbd className="font-semibold">Ctrl</kbd>
            <span>+</span>
            <kbd className="font-semibold">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-1 mt-2 text-xs text-gray-500">
        <span>
          Showing <span className="text-gray-300 font-medium">{totalResults}</span> of{' '}
          <span className="text-gray-300 font-medium">{totalProblems}</span> problems
        </span>
        {searchTerm && (
          <span className="italic text-gray-400">
            Filtering by "{searchTerm}"
          </span>
        )}
      </div>
    </div>
  );
}
