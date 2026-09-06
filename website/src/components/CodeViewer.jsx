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
      <div className="flex flex-col items-center justify-center p-12 text-center bg-[#1a1d24] rounded-xl border border-[#2d3442]">
        <Code2 className="w-12 h-12 text-gray-500 mb-3" />
        <h4 className="text-base font-semibold text-gray-200">No Solution Code Uploaded Yet</h4>
        <p className="text-xs text-gray-400 mt-1 max-w-sm">
          A solution file for this question hasn't been synced to the repository yet.
        </p>
        {leetcodeUrl && (
          <a
            href={leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/40 transition-colors"
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
    <div className="flex flex-col rounded-xl overflow-hidden border border-[#2d3442] bg-[#11141a] shadow-xl">
      {/* Code Header / Tabs */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#1a1d24] border-b border-[#2d3442]">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {solutions.map((sol, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                selectedIdx === idx
                  ? 'bg-[#1e88e5] text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#252a35]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{sol.filename}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded ${
                  selectedIdx === idx ? 'bg-black/20 text-white' : 'bg-black/30 text-gray-400'
                }`}
              >
                {sol.language}
              </span>
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#252a35] hover:bg-[#2e3544] text-gray-200 hover:text-white transition-colors border border-[#384255] ml-2 shrink-0"
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
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area with Line Numbers */}
      <div className="relative overflow-x-auto max-h-[620px] flex text-xs font-mono">
        {/* Line Numbers */}
        <div className="select-none py-4 pl-4 pr-3 text-right text-gray-600 bg-[#161920]/80 border-r border-[#2d3442]/60">
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
