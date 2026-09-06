import React, { useState } from 'react';
import ProblemCard from './ProblemCard';
import { SearchX, ChevronDown } from 'lucide-react';

export default function ProblemList({ problems, onSelectProblem, onResetFilters }) {
  const [displayCount, setDisplayCount] = useState(36);

  if (problems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center bg-gray-900/40 rounded-3xl border border-gray-800/80">
        <SearchX className="w-12 h-12 text-gray-500 mb-3" />
        <h3 className="text-lg font-semibold text-gray-200">No matching problems found</h3>
        <p className="text-sm text-gray-400 mt-1 max-w-md">
          Try searching for a different problem number, title, or clearing your active filters.
        </p>
        <button
          onClick={onResetFilters}
          className="mt-5 px-4 py-2 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 shadow-md shadow-amber-500/20 transition-all"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  const visibleProblems = problems.slice(0, displayCount);
  const hasMore = displayCount < problems.length;

  return (
    <div className="space-y-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleProblems.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            onSelect={onSelectProblem}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setDisplayCount((prev) => prev + 36)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700 text-sm font-medium transition-all shadow-lg"
          >
            <span>Load More Problems ({problems.length - displayCount} remaining)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
