import { useState } from 'react';
import { useHistory } from '../context/HistoryContext';
import ReactMarkdown from 'react-markdown';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function HistoryList() {
  const { history, clearHistory } = useHistory();

  const personas = ["Thorough explanation", "Code Review", "Optimize code"]

  // Track expanded state for each code block
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const toggleExpand = (idx: number) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold mb-4">Previous Explanations</h2>
            <button
                onClick={clearHistory}
                className="mb-4 text-sky-400 font-semibold py-2 px-4 border border-sky-400 rounded shadow hover:bg-sky-400 hover:text-white transition-colors"
            >
                Clear History
            </button>
        </div>
      {history.length === 0 && <p className="text-gray-600">No history yet.</p>}
      {history.map((item, idx) => {
        const codeLines = item.code.split('\n');
        const isExpanded = expanded[idx];
        const shouldShowToggle = codeLines.length > 5;
        const displayedLines = isExpanded ? codeLines : codeLines.slice(0, 5);

        return (
          <div key={idx} className="mb-4 p-3 border rounded bg-gray-50">
            <div className="text-sm mb-1 text-gray-700 font-semibold">
              Persona: {personas[item.personaId - 1]}
            </div>
            <pre className="text-xs mb-1 bg-gray-100 p-2 rounded italic">
              {displayedLines.join('\n')}
              {(!isExpanded && shouldShowToggle) && '\n...'}

              {shouldShowToggle && (
                <button
                  onClick={() => toggleExpand(idx)}
                  aria-label={isExpanded ? 'Collapse code' : 'Expand code'}
                  className="flex items-center justify-center hover:text-sky-700 p-2"
                >
                  {isExpanded ? (
                    <FiChevronUp className="h-5 w-5" />
                  ) : (
                    <FiChevronDown className="h-5 w-5" />
                  )}
                </button>
              )}
            </pre>
            <div className="text-sm">
              <strong>Explanation:</strong>
              <div className="prose prose-sm min-w-full">
                <ReactMarkdown>
                  {item.explanation}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
