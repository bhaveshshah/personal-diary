// We create a single "key name" so we always store/retrieve from the same localStorage slot
const STORAGE_KEY = "personalDiaryEntries";

// This function loads entries from localStorage
export function loadEntries() {
  // localStorage stores ONLY strings, so we read a string here
  const raw = localStorage.getItem(STORAGE_KEY);

  // If there is nothing saved yet, return an empty array (no entries)
  if (!raw) return [];

  // If there IS something, it is JSON text, so we convert it back into an array of objects
  try {
    return JSON.parse(raw);
  } catch {
    // If parsing fails (bad data), we fail safely and start fresh
    return [];
  }
}

// This function saves entries into localStorage
export function saveEntries(entries) {
  // We convert our array of objects into a JSON string
  const raw = JSON.stringify(entries);

  // We store that string under our key
  localStorage.setItem(STORAGE_KEY, raw);
}
