import React from 'react';
import { Filter, ArrowUpDown, RotateCcw } from 'lucide-react';

export default function FilterBar({
  selectedDifficulty,
  setSelectedDifficulty,
  selectedLanguage,
  setSelectedLanguage,
  sortBy,
  setSortBy,
  stats,
  hasActiveFilters,
  resetFilters
}) {
  const difficulties = [
    { label: 'All', value: 'ALL', count: stats?.total, activeClass: 'bg-[#1e88e5] text-white' },
    { label: 'Easy', value: 'Easy', count: stats?.easy, activeClass: 'bg-emerald-500 text-white' },
    { label: 'Medium', value: 'Medium', count: stats?.medium, activeClass: 'bg-amber-500 text-black font-extrabold' },
    { label: 'Hard', value: 'Hard', count: stats?.hard, activeClass: 'bg-rose-500 text-white font-bold' }
  ];

  const availableLanguages = stats?.languages ? Object.keys(stats.languages) : ['C++', 'Java', 'SQL', 'Python'];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#222731] border border-[#2d3442] rounded-xl shadow-md text-gray-200">
      {/* Left: Difficulty Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-gray-400 mr-1 flex items-center gap-1.5 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-blue-400" /> Difficulty:
        </span>
        {difficulties.map((diff) => {
          const isSelected = selectedDifficulty === diff.value;
          return (
            <button
              key={diff.value}
              onClick={() => setSelectedDifficulty(diff.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                isSelected
                  ? `${diff.activeClass} shadow-md`
                  : 'bg-[#2a303d] text-gray-300 hover:text-white hover:bg-[#343c4d] border border-[#384255]'
              }`}
            >
              <span>{diff.label}</span>
              {diff.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/20 text-current' : 'bg-black/30 text-gray-400'
                  }`}
                >
                  {diff.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Language, Sort & Reset */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Language Filter */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2a303d] text-gray-200 border border-[#384255] hover:border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          <option value="ALL">All Languages</option>
          {availableLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang} ({stats?.languages?.[lang] || 0})
            </option>
          ))}
        </select>

        {/* Sort Select */}
        <div className="relative flex items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-7 pr-3 py-1.5 rounded-lg text-xs font-medium bg-[#2a303d] text-gray-200 border border-[#384255] hover:border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none"
          >
            <option value="id-asc">Problem # (Ascending)</option>
            <option value="id-desc">Problem # (Descending)</option>
            <option value="title-asc">Title (A-Z)</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-2 pointer-events-none" />
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-300 hover:text-white bg-rose-900/30 hover:bg-rose-900/50 border border-rose-700/50 transition-colors"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
