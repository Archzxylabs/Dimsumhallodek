import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

// Keep a draft in this tab only. Storage may be unavailable in private browsing.
export function useSessionState<T>(name: string, initial: T, valid: (value: unknown) => value is T): [T, Dispatch<SetStateAction<T>>] {
  const key = `dhd:${name}:v1`;
  const [value, setValue] = useState<T>(() => {
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(key) || 'null');
      return valid(saved) ? saved : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* The form still works without storage. */ }
  }, [key, value]);
  return [value, setValue];
}

export function isStringRecord(value: unknown, fields: string[]): value is Record<string, string> {
  return !!value && typeof value === 'object' && fields.every((field) => typeof (value as Record<string, unknown>)[field] === 'string');
}
