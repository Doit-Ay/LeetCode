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
    { label: 'All', value: 'ALL', count: stats?.total },
    { label: 'Easy', value: 'Easy', count: stats?.easy },
    { label: 'Medium', value: 'Medium', count: stats?.medium },
    { label: 'Hard', value: 'Hard', count: stats?.hard }
  ];

  const availableLanguages = stats?.languages ? Object.keys(stats.languages) : ['C++', 'Java', 'SQL', 'Python'];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Left: Difficulty Filters */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-gray-500 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-gray-400" /> Difficulty:
        </span>
        {difficulties.map((diff) => {
          const isSelected = selectedDifficulty === diff.value;
          return (
            <button
              key={diff.value}
              onClick={() => setSelectedDifficulty(diff.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-500 text-white font-semibold shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{diff.label}</span>
              {diff.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'
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
      <div className="flex flex-wrap items-center gap-2">
        {/* Language Filter */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
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
            className="pl-7 pr-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer appearance-none"
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
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
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
