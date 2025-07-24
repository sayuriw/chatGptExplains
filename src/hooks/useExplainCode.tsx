import { useState } from 'react';
import axios from 'axios';
import { usePersona } from '../context/PersonaContext';
import { useHistory } from '../context/HistoryContext';

export function useExplainCode() {
    const { selectedPersona } = usePersona();
    const { addToHistory } = useHistory();
    const [loading, setLoading] = useState(false);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

  const explain = async (code: string): Promise<string | null> => {
    setLoading(true);
    setExplanation(null);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_APP_OPENAI_API_KEY;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: selectedPersona.value },
            { role: "user", content: `Please analyze the following code:\n\n${code}` }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          }
        }
      );

    const result = response.data.choices[0].message.content;

    setExplanation(result);
    addToHistory({ code, personaId: selectedPersona.id, explanation: result });

    return result;

    } catch (err: any) {
      setError(err.message || "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { explanation, loading, error, explain };
}

