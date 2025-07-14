import { createContext, useContext, useState, type ReactNode } from 'react';

export type Persona = {
  id: number;
  label: string;
  value: string;
};

export const personas: Persona[] = [
  {
    id: 1,
    label: "Thorough explanation",
    value: "You are a patient programming teacher who explains concepts in simple terms."
  },
  {
    id: 2,
    label:  "Code Review",
    value: "You are a strict code reviewer who looks for bugs and best practices."
  },
  {
    id: 3,
    label: "Optimize code",
    value: "You are an experienced programmer who will offer options to rewrite the code in the best possible way for readability, efficiency, performance."
  }
];

type PersonaContextType = {
  selectedPersona: Persona;
  setPersonaById: (id: number) => void;
};

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
};

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(personas[0]);

  const setPersonaById = (id: number) => {
    const persona = personas.find(p => p.id === id) || personas[0];
    setSelectedPersona(persona);
  };

  return (
    <PersonaContext.Provider value={{ selectedPersona, setPersonaById }}>
      {children}
    </PersonaContext.Provider>
  );
};
