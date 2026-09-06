import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike.js';
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-cpp.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-sql.js';
import { Copy, Check, Code2, ExternalLink } from 'lucide-react';

export default function CodeViewer({ solutions = [], problemTitle, leetcodeUrl }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSelectedIdx(0);
  }, [solutions]);

  if (!solutions || solutions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
        <Code2 className="w-12 h-12 text-gray-400 mb-3" />
        <h4 className="text-base font-semibold text-gray-800">No Solution Code Uploaded Yet</h4>
        <p className="text-xs text-gray-500 mt-1 max-w-sm">
          A solution file for this question hasn't been synced to the repository yet.
        </p>
        {leetcodeUrl && (
          <a
            href={leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
          >
            Solve on LeetCode <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    );
  }

  const activeSolution = solutions[selectedIdx] || solutions[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSolution.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const highlightCode = (code, prismLang) => {
    const grammar = Prism.languages[prismLang] || Prism.languages.cpp || Prism.languages.clike;
    return Prism.highlight(code, grammar, prismLang || 'cpp');
  };

  const codeLines = activeSolution.code.split('\n');

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-gray-800 bg-gray-900/90 shadow-2xl">
      {/* Code Header / Tabs */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-950/80 border-b border-gray-800">
        <div className="flex items-center gap-2 overflow-x-auto">
          {solutions.map((sol, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedIdx === idx
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{sol.filename}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">
                {sol.language}
              </span>
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border border-gray-700/60 ml-2 shrink-0"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-gray-400" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area with Line Numbers */}
      <div className="relative overflow-x-auto max-h-[600px] flex text-xs font-mono">
        {/* Line Numbers */}
        <div className="select-none py-4 pl-4 pr-3 text-right text-gray-600 bg-gray-950/40 border-r border-gray-800/80">
          {codeLines.map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Highlighted Code */}
        <pre className="py-4 px-4 overflow-x-auto leading-6 flex-1 m-0 bg-transparent text-gray-200">
          <code
            dangerouslySetInnerHTML={{
              __html: highlightCode(activeSolution.code, activeSolution.prismLang)
            }}
          />
        </pre>
      </div>
    </div>
  );
}
