import React from 'react';
import { Clock } from 'lucide-react';

export default function ProblemCard({ problem, onSelect }) {
  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'bg-[#00b8a3] text-white';
      case 'Hard':
        return 'bg-[#ff375f] text-white';
      case 'Medium':
      default:
        return 'bg-[#ffb300] text-black';
    }
  };

  const hasSolutions = problem.solutions && problem.solutions.length > 0;

  return (
    <div
      onClick={() => onSelect(problem)}
      className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-[#222731] hover:bg-[#262c37] border border-[#2d3442] hover:border-[#3b82f6]/80 transition-all duration-150 cursor-pointer shadow-md hover:shadow-lg"
    >
      <div>
        {/* Header: ID & Difficulty Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#1a1d24] text-gray-400 group-hover:text-blue-400 border border-[#2d3442] transition-colors">
            #{problem.id}
          </span>
          <span
            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-sm uppercase tracking-wider ${getDifficultyBadge(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-gray-100 group-hover:text-[#42a5f5] transition-colors line-clamp-1">
          {problem.title}
        </h3>

        {/* Time / Notes if available */}
        {problem.notes && (
          <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-gray-400">
            <Clock className="w-3 h-3 text-amber-400/80" />
            <span className="truncate">{problem.notes}</span>
          </div>
        )}
      </div>

      {/* Footer: Solutions / Languages */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#2d3442]/80">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {hasSolutions ? (
            problem.solutions.map((sol, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1a1d24] text-gray-300 border border-[#2d3442]"
              >
                {sol.language}
              </span>
            ))
          ) : (
            <span className="text-[11px] text-gray-500 italic">No code attached</span>
          )}
        </div>

        <div className="flex items-center text-xs text-blue-400 group-hover:text-blue-300 font-semibold transition-colors">
          <span>View Solution</span>
          <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </div>
  );
}
