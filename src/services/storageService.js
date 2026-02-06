import { generateEntryId } from "../utils/generateId";
const STORAGE_KEY = "diaryEntries";

export const storageService = {
  getEntries: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  },

  saveEntry: (formData) => {
    try {
      const existingEntries = storageService.getEntries();
      const newEntry = {
        ...formData,
        id: generateEntryId(),
        createdAt: new Date().toISOString(), // adding a creation timestamp
      };

      const updatedEntries = [...existingEntries, newEntry];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

      console.log("Entry saved:", newEntry);
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Failed to save entry. Please try again.");
      return false;
    }
  },

  hasEntryForDate: (date) => {
    const entries = storageService.getEntries();
    return entries.some((entry) => entry.date === date);
  },

  deleteEntry: (id) => {
    const entries = storageService.getEntries();
    const filtered = entries.filter((entry) => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};
