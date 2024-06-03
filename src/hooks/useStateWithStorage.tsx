import { useState, useEffect } from 'react';

export default function useStateWithStorage(key: string, defaultValue: unknown) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
