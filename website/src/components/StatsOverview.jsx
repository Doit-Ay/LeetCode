import React from 'react';
import { CheckCircle2, Flame, Award, Terminal } from 'lucide-react';

export default function StatsOverview({ stats }) {
  if (!stats) return null;

  const easyPercent = Math.round((stats.easy / stats.total) * 100) || 0;
  const medPercent = Math.round((stats.medium / stats.total) * 100) || 0;
  const hardPercent = Math.round((stats.hard / stats.total) * 100) || 0;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-950 border border-gray-800 p-6 sm:p-8 shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Heading & Intro */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>LeetCode Solutions Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{stats.total} Solved</span> Problems
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mt-2 leading-relaxed">
            Search solutions by problem number or title. Browse complete code implementations, problem constraints, examples, and time complexities.
          </p>
        </div>

        {/* Right: Difficulty Breakdown Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
          {/* Easy */}
          <div className="flex flex-col p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 hover:border-emerald-500/30 transition-colors">
            <span className="text-xs font-medium text-emerald-400">Easy</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1">{stats.easy}</span>
            <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${easyPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500 mt-1">{easyPercent}%</span>
          </div>

          {/* Medium */}
          <div className="flex flex-col p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 hover:border-amber-500/30 transition-colors">
            <span className="text-xs font-medium text-amber-400">Medium</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1">{stats.medium}</span>
            <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${medPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500 mt-1">{medPercent}%</span>
          </div>

          {/* Hard */}
          <div className="flex flex-col p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 hover:border-rose-500/30 transition-colors">
            <span className="text-xs font-medium text-rose-400">Hard</span>
            <span className="text-2xl sm:text-3xl font-bold text-white mt-1">{stats.hard}</span>
            <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-rose-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${hardPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500 mt-1">{hardPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
