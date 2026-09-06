import React, { useEffect } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Clock, BookOpen, Code2 } from 'lucide-react';
import CodeViewer from './CodeViewer';

export default function ProblemModal({ problem, onClose, onNavigate, hasPrev, hasNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate('prev');
      if (e.key === 'ArrowRight' && hasNext) onNavigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate, hasPrev, hasNext]);

  if (!problem) return null;

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl max-h-[92vh] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gray-50 border-b border-gray-200 shrink-0">
          {/* Left: Problem info */}
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-sm font-mono font-bold px-2.5 py-0.5 rounded-md bg-gray-200 text-gray-800">
              #{problem.id}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">
              {problem.title}
            </h2>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyColor(
                problem.difficulty
              )}`}
            >
              {problem.difficulty}
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Prev / Next */}
            <div className="flex items-center gap-1 mr-2">
              <button
                disabled={!hasPrev}
                onClick={() => onNavigate('prev')}
                className={`p-1.5 rounded-lg border transition-colors ${
                  hasPrev
                    ? 'text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100 border-gray-300 shadow-sm'
                    : 'text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed'
                }`}
                title="Previous Problem (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={!hasNext}
                onClick={() => onNavigate('next')}
                className={`p-1.5 rounded-lg border transition-colors ${
                  hasNext
                    ? 'text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100 border-gray-300 shadow-sm'
                    : 'text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed'
                }`}
                title="Next Problem (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* LeetCode link */}
            {problem.leetcodeUrl && (
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors ml-1"
              title="Close (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Split View (Problem Description vs Code Solution) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {/* Left: Problem Statement & Examples */}
          <div className="lg:col-span-6 p-5 sm:p-6 overflow-y-auto max-h-[78vh] space-y-4 bg-white">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Problem Statement</span>
              </div>
              {problem.notes && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>{problem.notes}</span>
                </div>
              )}
            </div>

            {/* HTML Content from README */}
            {problem.descriptionHtml ? (
              <div
                className="problem-content text-sm"
                dangerouslySetInnerHTML={{ __html: problem.descriptionHtml }}
              />
            ) : (
              <p className="text-sm text-gray-500">No problem description available.</p>
            )}

            {problem.leetcodeUrl && (
              <div className="pt-4 border-t border-gray-100">
                <a
                  href={problem.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  <span>Open in LeetCode official page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Right: Code Solutions */}
          <div className="lg:col-span-6 p-5 sm:p-6 overflow-y-auto max-h-[78vh] bg-gray-50/50 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200 text-sm font-semibold text-gray-800">
              <Code2 className="w-4 h-4 text-amber-600" />
              <span>Solution Implementation</span>
            </div>

            <CodeViewer
              solutions={problem.solutions}
              problemTitle={problem.title}
              leetcodeUrl={problem.leetcodeUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
