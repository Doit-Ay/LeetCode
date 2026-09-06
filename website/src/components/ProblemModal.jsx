import React, { useEffect, useState } from 'react';
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Code2,
  ArrowLeft,
  Columns,
  Rows
} from 'lucide-react';
import CodeViewer from './CodeViewer';

export default function ProblemModal({
  problem,
  onClose,
  onNavigate,
  hasPrev,
  hasNext,
  prevProblem,
  nextProblem
}) {
  const [layoutMode, setLayoutMode] = useState('split'); // 'split' or 'stacked'

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-7xl max-h-[94vh] bg-[#1a1d24] border border-[#2d3442] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-[#222731] border-b border-[#2d3442] gap-3 shrink-0">
          {/* Left: Back button & Breadcrumbs */}
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2a303d] hover:bg-[#343c4d] text-gray-200 hover:text-white border border-[#384255] text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Problems</span>
            </button>

            <div className="h-4 w-px bg-gray-700 hidden sm:block" />

            <div className="flex items-center gap-2 truncate">
              <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-[#1a1d24] text-blue-400 border border-[#2d3442]">
                #{problem.id}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white truncate">
                {problem.title}
              </h2>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-sm uppercase tracking-wider ${getDifficultyBadge(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </span>
            </div>
          </div>

          {/* Right: Controls & Navigation */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Split / Stacked Layout Toggle (Desktop only) */}
            <div className="hidden lg:flex items-center bg-[#1a1d24] rounded-lg p-0.5 border border-[#2d3442]">
              <button
                onClick={() => setLayoutMode('split')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  layoutMode === 'split'
                    ? 'bg-[#1e88e5] text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                title="Split Side-by-Side View"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLayoutMode('stacked')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  layoutMode === 'stacked'
                    ? 'bg-[#1e88e5] text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                title="Stacked View"
              >
                <Rows className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                disabled={!hasPrev}
                onClick={() => onNavigate('prev')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  hasPrev
                    ? 'bg-[#2a303d] hover:bg-[#343c4d] text-gray-200 hover:text-white border-[#384255]'
                    : 'bg-[#1a1d24] text-gray-600 border-[#2d3442] cursor-not-allowed'
                }`}
                title="Previous Problem (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden md:inline">Prev</span>
              </button>

              <button
                disabled={!hasNext}
                onClick={() => onNavigate('next')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  hasNext
                    ? 'bg-[#2a303d] hover:bg-[#343c4d] text-gray-200 hover:text-white border-[#384255]'
                    : 'bg-[#1a1d24] text-gray-600 border-[#2d3442] cursor-not-allowed'
                }`}
                title="Next Problem (Right Arrow)"
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* LeetCode link */}
            {problem.leetcodeUrl && (
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/40 transition-colors"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
              title="Close (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div
          className={`flex-1 overflow-y-auto ${
            layoutMode === 'split'
              ? 'grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#2d3442]'
              : 'flex flex-col space-y-6 divide-y divide-[#2d3442]'
          }`}
        >
          {/* Left / Top: Problem Description */}
          <div
            className={`${
              layoutMode === 'split' ? 'lg:col-span-6' : 'w-full'
            } p-5 sm:p-7 overflow-y-auto max-h-[80vh] space-y-5 bg-[#1a1d24]`}
          >
            {/* Title & Metadata Header inside content */}
            <div className="pb-4 border-b border-[#2d3442]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold text-gray-200 uppercase tracking-wider">
                    Problem Statement
                  </span>
                </div>

                {problem.notes && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-300/90 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono">{problem.notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Rendered HTML problem statement */}
            {problem.descriptionHtml ? (
              <div
                className="problem-content text-sm text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: problem.descriptionHtml }}
              />
            ) : (
              <p className="text-sm text-gray-500">No problem description available.</p>
            )}

            {problem.leetcodeUrl && (
              <div className="pt-4 border-t border-[#2d3442]">
                <a
                  href={problem.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Open official problem on LeetCode</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Right / Bottom: Code Solution */}
          <div
            className={`${
              layoutMode === 'split' ? 'lg:col-span-6' : 'w-full'
            } p-5 sm:p-7 overflow-y-auto max-h-[80vh] bg-[#161920] space-y-4`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2d3442]">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-200 uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Solution Code</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">
                {problem.solutions?.length || 0} solution(s) available
              </span>
            </div>

            <CodeViewer
              solutions={problem.solutions}
              problemTitle={problem.title}
              leetcodeUrl={problem.leetcodeUrl}
            />
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#222731] border-t border-[#2d3442] text-xs text-gray-400 shrink-0">
          <div>
            {hasPrev && prevProblem && (
              <button
                onClick={() => onNavigate('prev')}
                className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
              >
                <span>← #{prevProblem.id} {prevProblem.title}</span>
              </button>
            )}
          </div>

          <div>
            {hasNext && nextProblem && (
              <button
                onClick={() => onNavigate('next')}
                className="flex items-center gap-1.5 hover:text-blue-400 transition-colors ml-auto"
              >
                <span>#{nextProblem.id} {nextProblem.title} →</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
