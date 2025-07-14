import { usePersona, personas } from '../context/PersonaContext';

export default function PersonaSelector() {
  const { selectedPersona, setPersonaById } = usePersona();

  return (
    <div className="p-6">
      <label className="block mb-2 font-semibold">Choose a persona:</label>
      <select
        value={selectedPersona.id}
        onChange={(e) => setPersonaById(Number(e.target.value))}
        className="p-2 border rounded w-full"
      >
        {personas.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}
