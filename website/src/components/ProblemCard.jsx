import React from 'react';
import { Clock } from 'lucide-react';

export default function ProblemCard({ problem, onSelect }) {
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Hard':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'Medium':
      default:
        return 'text-amber-700 bg-amber-50 border-amber-200';
    }
  };

  const hasSolutions = problem.solutions && problem.solutions.length > 0;

  return (
    <div
      onClick={() => onSelect(problem)}
      className="group relative flex flex-col justify-between p-4 rounded-xl bg-white hover:bg-amber-50/20 border border-gray-200 hover:border-amber-400 transition-all duration-150 cursor-pointer shadow-sm hover:shadow-md"
    >
      <div>
        {/* Header: ID & Difficulty */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
            #{problem.id}
          </span>
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getDifficultyColor(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
          {problem.title}
        </h3>

        {/* Time / Notes if available */}
        {problem.notes && (
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-500">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="truncate">{problem.notes}</span>
          </div>
        )}
      </div>

      {/* Footer: Solutions / Languages */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {hasSolutions ? (
            problem.solutions.map((sol, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200"
              >
                {sol.language}
              </span>
            ))
          ) : (
            <span className="text-[11px] text-gray-400 italic">No code uploaded</span>
          )}
        </div>

        <div className="flex items-center text-xs text-gray-400 group-hover:text-amber-600 font-medium transition-colors">
          <span>View</span>
          <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </div>
  );
}
