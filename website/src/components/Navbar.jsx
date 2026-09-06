import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

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
    <header className="sticky top-0 z-30 shadow-md">
      {/* Primary Blue Top Bar */}
      <div className="bg-[#1e88e5] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <span className="font-mono text-xl font-bold tracking-tighter text-white group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                LeetCode Solutions
              </span>
            </div>
          </a>

          {/* Integrated Search Bar (Matching Walkccc style) */}
          <div className="flex-1 max-w-md relative flex items-center">
            <div className="absolute left-3 pointer-events-none text-blue-200 flex items-center">
              <Search className="w-4 h-4" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ('/' to focus)"
              className="w-full pl-9 pr-10 py-1.5 text-sm rounded-lg bg-[#1565c0] hover:bg-[#0d47a1]/70 focus:bg-[#0d47a1] text-white placeholder-blue-200 border border-blue-400/30 focus:border-white/60 focus:ring-1 focus:ring-white/40 outline-none transition-all"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 p-0.5 rounded text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Sub-nav Bar (Matching Walkccc style) */}
      <div className="bg-[#1976d2] border-t border-blue-400/20 text-xs sm:text-sm font-medium text-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-white font-semibold border-b-2 border-white pb-0.5 cursor-pointer">
              Problems
            </span>
          </div>

          <div className="text-xs text-blue-100/80">
            {totalResults} {totalResults === 1 ? 'problem' : 'problems'}
          </div>
        </div>
      </div>
    </header>
  );
}
