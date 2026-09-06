import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const outputDir = path.resolve(__dirname, '../src/data');

const EXTENSION_MAP = {
  '.cpp': { lang: 'C++', prism: 'cpp' },
  '.cc': { lang: 'C++', prism: 'cpp' },
  '.cxx': { lang: 'C++', prism: 'cpp' },
  '.c': { lang: 'C', prism: 'c' },
  '.java': { lang: 'Java', prism: 'java' },
  '.py': { lang: 'Python', prism: 'python' },
  '.sql': { lang: 'SQL', prism: 'sql' },
  '.js': { lang: 'JavaScript', prism: 'javascript' },
  '.ts': { lang: 'TypeScript', prism: 'typescript' },
  '.go': { lang: 'Go', prism: 'go' },
  '.rs': { lang: 'Rust', prism: 'rust' },
  '.kt': { lang: 'Kotlin', prism: 'kotlin' },
  '.cs': { lang: 'C#', prism: 'csharp' },
  '.swift': { lang: 'Swift', prism: 'swift' }
};

function formatSlugTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractProblems() {
  console.log(`Scanning repository at: ${rootDir}`);
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });

  const problems = [];
  const dirRegex = /^(\d+)-(.+)$/;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const match = entry.name.match(dirRegex);
    if (!match) continue;

    const problemId = parseInt(match[1], 10);
    const slug = match[2];
    const problemDirPath = path.join(rootDir, entry.name);

    let title = formatSlugTitle(slug);
    let difficulty = 'Medium'; // default fallback
    let leetcodeUrl = `https://leetcode.com/problems/${slug}/`;
    let bodyHtml = '';
    let notes = '';

    // Read README.md if present
    const readmePath = path.join(problemDirPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      const readmeContent = fs.readFileSync(readmePath, 'utf-8');

      // Title & URL extraction
      const titleLinkMatch = readmeContent.match(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i);
      if (titleLinkMatch) {
        leetcodeUrl = titleLinkMatch[1];
        title = titleLinkMatch[2].trim();
      } else {
        const h2Match = readmeContent.match(/<h[12][^>]*>(.*?)<\/h[12]>/i);
        if (h2Match) {
          title = h2Match[1].replace(/<[^>]+>/g, '').trim();
        }
      }

      // Difficulty extraction from shields.io badge
      const diffMatch = readmeContent.match(/Difficulty-(Easy|Medium|Hard)/i);
      if (diffMatch) {
        const rawDiff = diffMatch[1].toLowerCase();
        difficulty = rawDiff === 'easy' ? 'Easy' : rawDiff === 'hard' ? 'Hard' : 'Medium';
      }

      // Content extraction (everything after the first <hr>)
      const hrIndex = readmeContent.indexOf('<hr>');
      if (hrIndex !== -1) {
        bodyHtml = readmeContent.slice(hrIndex + 4).trim();
      } else {
        bodyHtml = readmeContent;
      }
    }

    // Read Notes.md if present
    const notesPath = path.join(problemDirPath, 'Notes.md');
    if (fs.existsSync(notesPath)) {
      const notesContent = fs.readFileSync(notesPath, 'utf-8');
      const timeMatch = notesContent.match(/\[\s*Time taken:\s*([^\]]+)\]/i);
      if (timeMatch) {
        notes = timeMatch[1].trim();
      } else {
        notes = notesContent.replace(/<[^>]+>/g, '').trim();
      }
    }

    // Read solution code files
    const problemFiles = fs.readdirSync(problemDirPath);
    const solutions = [];

    for (const file of problemFiles) {
      if (file === 'README.md' || file === 'Notes.md') continue;
      const ext = path.extname(file).toLowerCase();
      if (EXTENSION_MAP[ext]) {
        const codePath = path.join(problemDirPath, file);
        const code = fs.readFileSync(codePath, 'utf-8');
        solutions.push({
          filename: file,
          language: EXTENSION_MAP[ext].lang,
          prismLang: EXTENSION_MAP[ext].prism,
          code
        });
      }
    }

    problems.push({
      id: problemId,
      slug,
      folderName: entry.name,
      title,
      difficulty,
      leetcodeUrl,
      descriptionHtml: bodyHtml,
      notes,
      solutions
    });
  }

  // Sort by problem ID ascending
  problems.sort((a, b) => a.id - b.id);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'problems.json');
  fs.writeFileSync(outputPath, JSON.stringify(problems, null, 2), 'utf-8');

  // Stats calculation
  const stats = {
    total: problems.length,
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
    languages: {}
  };

  for (const p of problems) {
    for (const s of p.solutions) {
      stats.languages[s.language] = (stats.languages[s.language] || 0) + 1;
    }
  }

  const statsPath = path.join(outputDir, 'stats.json');
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf-8');

  console.log(`Successfully extracted ${problems.length} problems!`);
  console.log(`Easy: ${stats.easy}, Medium: ${stats.medium}, Hard: ${stats.hard}`);
  console.log(`Languages:`, stats.languages);
  console.log(`Saved to ${outputPath} and ${statsPath}`);
}

extractProblems();
