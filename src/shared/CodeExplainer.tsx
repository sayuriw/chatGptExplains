import { useState } from 'react';
import { useExplainCode } from '../hooks/useExplainCode';
import { useHistory } from '../context/HistoryContext';

export default function CodeExplainer() {
  const [code, setCode] = useState('');
  const { explanation, loading, error, explain } = useExplainCode();
  const { addToHistory } = useHistory();

  const handleClick = async () => {
    if (!code.trim()) return;

    const result = await explain(code);

    // only save if explanation was successful
    if (result) {
      // addToHistory({
      //   code,
      //   persona: personas[personaId - 1],
      //   explanation: result
      // });
      setCode('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Code Explainer</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={8}
        className="w-full p-2 border rounded mb-4"
        placeholder="Paste your code here..."
      />

      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Explaining...' : 'Explain Code'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
