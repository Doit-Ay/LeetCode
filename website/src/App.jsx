import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import ProblemList from './components/ProblemList';
import ProblemModal from './components/ProblemModal';

import problemsData from './data/problems.json';
import statsData from './data/stats.json';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');
  const [sortBy, setSortBy] = useState('id-asc');
  const [selectedProblem, setSelectedProblem] = useState(null);

  // Sync with URL Hash: e.g. #/problem/100 or #100
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) {
        setSelectedProblem(null);
        return;
      }
      const match = hash.match(/#\/?(?:problem\/)?(\d+)/i);
      if (match) {
        const id = parseInt(match[1], 10);
        const found = problemsData.find((p) => p.id === id);
        if (found) {
          setSelectedProblem(found);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    window.location.hash = `#/problem/${problem.id}`;
  };

  const handleCloseModal = () => {
    setSelectedProblem(null);
    history.pushState('', document.title, window.location.pathname + window.location.search);
  };

  // Filter and Sort Logic
  const filteredProblems = useMemo(() => {
    return problemsData
      .filter((problem) => {
        // Difficulty filter
        if (selectedDifficulty !== 'ALL' && problem.difficulty !== selectedDifficulty) {
          return false;
        }

        // Language filter
        if (selectedLanguage !== 'ALL') {
          const hasLang = problem.solutions?.some((s) => s.language === selectedLanguage);
          if (!hasLang) return false;
        }

        // Search term matching
        if (searchTerm.trim()) {
          const term = searchTerm.trim().toLowerCase();
          const idStr = problem.id.toString();

          // Exact ID or prefix match
          const matchesId = idStr === term || idStr.startsWith(term);
          const matchesTitle = problem.title.toLowerCase().includes(term);
          const matchesSlug = problem.slug.toLowerCase().includes(term);

          if (!matchesId && !matchesTitle && !matchesSlug) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        // If user searched for an exact number, put exact match first
        if (searchTerm.trim()) {
          const term = searchTerm.trim();
          const aExact = a.id.toString() === term;
          const bExact = b.id.toString() === term;
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
        }

        if (sortBy === 'id-asc') return a.id - b.id;
        if (sortBy === 'id-desc') return b.id - a.id;
        if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [searchTerm, selectedDifficulty, selectedLanguage, sortBy]);

  // Next / Prev navigation within the current filtered set
  const currentProblemIndex = useMemo(() => {
    if (!selectedProblem) return -1;
    return filteredProblems.findIndex((p) => p.id === selectedProblem.id);
  }, [selectedProblem, filteredProblems]);

  const hasPrev = currentProblemIndex > 0;
  const hasNext = currentProblemIndex !== -1 && currentProblemIndex < filteredProblems.length - 1;

  const handleNavigateModal = (direction) => {
    if (direction === 'prev' && hasPrev) {
      handleSelectProblem(filteredProblems[currentProblemIndex - 1]);
    } else if (direction === 'next' && hasNext) {
      handleSelectProblem(filteredProblems[currentProblemIndex + 1]);
    }
  };

  const hasActiveFilters =
    searchTerm !== '' || selectedDifficulty !== 'ALL' || selectedLanguage !== 'ALL' || sortBy !== 'id-asc';

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('ALL');
    setSelectedLanguage('ALL');
    setSortBy('id-asc');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Navbar with integrated search */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalResults={filteredProblems.length}
        totalProblems={problemsData.length}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Filters */}
        <section>
          <FilterBar
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            sortBy={sortBy}
            setSortBy={setSortBy}
            stats={statsData}
            hasActiveFilters={hasActiveFilters}
            resetFilters={resetFilters}
          />
        </section>

        {/* Problems Grid / List */}
        <section>
          <ProblemList
            problems={filteredProblems}
            onSelectProblem={handleSelectProblem}
            onResetFilters={resetFilters}
          />
        </section>
      </main>

      {/* Modal / Detail View */}
      {selectedProblem && (
        <ProblemModal
          problem={selectedProblem}
          onClose={handleCloseModal}
          onNavigate={handleNavigateModal}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}
    </div>
  );
}
