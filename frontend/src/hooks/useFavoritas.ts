import { useEffect, useState } from "react";
import {
  FAVORITAS_STORAGE_KEY,
  IMPORTADAS_STORAGE_KEY,
} from "@/mocks/usuario";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useFavoritas() {
  const [favoritas, setFavoritas] = useState<string[]>(() =>
    readStorage(FAVORITAS_STORAGE_KEY, ["trilha-1", "trilha-4"])
  );
  const [importadas, setImportadas] = useState<string[]>(() =>
    readStorage(IMPORTADAS_STORAGE_KEY, [])
  );

  useEffect(() => {
    localStorage.setItem(FAVORITAS_STORAGE_KEY, JSON.stringify(favoritas));
  }, [favoritas]);

  useEffect(() => {
    localStorage.setItem(IMPORTADAS_STORAGE_KEY, JSON.stringify(importadas));
  }, [importadas]);

  const toggleFavorita = (uid: string) =>
    setFavoritas((prev) =>
      prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
    );

  const isFavorita = (uid: string) => favoritas.includes(uid);

  const importarTrilha = (uid: string) => {
    setFavoritas((prev) => (prev.includes(uid) ? prev : [...prev, uid]));
    setImportadas((prev) => (prev.includes(uid) ? prev : [...prev, uid]));
  };

  const isImportada = (uid: string) => importadas.includes(uid);

  return { favoritas, toggleFavorita, isFavorita, importarTrilha, isImportada };
}
