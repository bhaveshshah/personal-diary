// We import React hooks: useEffect (do something on start / when something changes) and useState (store state)
import { useEffect, useMemo, useState } from "react";

// We import components that App will show
import Header from "./components/Header.jsx";
import EntryList from "./components/EntryList.jsx";
import AddEntryModal from "./components/AddEntryModal.jsx";
import ViewEntryModal from "./components/ViewEntryModal.jsx";

// We import helper functions for localStorage
import { loadEntries, saveEntries } from "./utils/storage.js";

export default function App() {
  // entries = all diary entries we have
  // setEntries = the function we use to update entries
  const [entries, setEntries] = useState([]);

  // isAddOpen controls if the Add Entry modal is visible or hidden
  const [isAddOpen, setIsAddOpen] = useState(false);

  // selectedEntry holds the entry we want to view in the "View" modal
  // if selectedEntry is null, the view modal is closed
  const [selectedEntry, setSelectedEntry] = useState(null);

  // When the app loads for the FIRST time, we want to read localStorage and show saved entries
  useEffect(() => {
    // Load saved entries from localStorage
    const saved = loadEntries();

    // Put them into our state so UI can render them
    setEntries(saved);
  }, []); // [] means "run only once on startup"

  // Whenever entries changes, we want to save to localStorage (persistence requirement)
  useEffect(() => {
    // Save the latest entries array
    saveEntries(entries);
  }, [entries]); // [entries] means "run again whenever entries changes"

  // We always want to show entries newest-first
  // useMemo = "only recalculate when entries changes" (performance + clean)
  const sortedEntries = useMemo(() => {
    // We create a new array copy first so we don't mutate React state directly
    const copy = [...entries];

    // We sort by date (newest first)
    copy.sort((a, b) => {
      // Convert "YYYY-MM-DD" into time numbers and compare
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Return the sorted list
    return copy;
  }, [entries]);

  // This function opens the Add modal
  function openAddModal() {
    setIsAddOpen(true);
  }

  // This function closes the Add modal
  function closeAddModal() {
    setIsAddOpen(false);
  }

  // This runs when the user submits a new entry from the AddEntryModal form
  function handleCreateEntry(newEntry) {
    // First, we check: "Is there already an entry for this date?"
    const alreadyExists = entries.some((e) => e.date === newEntry.date);

    // If yes, we stop and show an alert as required (one-entry-per-day)
    if (alreadyExists) {
      alert("You already wrote an entry for this day. Please come back tomorrow 🙂");
      return;
    }

    // If not, we add it to our entries
    setEntries((prev) => {
      // prev = the old entries
      // We return a NEW array with the new entry added
      return [newEntry, ...prev];
    });

    // Close the add modal after success
    closeAddModal();
  }

  // This runs when user clicks an EntryCard
  function handleOpenEntry(entry) {
    // We store the clicked entry, which will open the View modal
    setSelectedEntry(entry);
  }

  // This closes the View modal
  function handleCloseView() {
    // Setting selectedEntry to null means "nothing is selected", so modal closes
    setSelectedEntry(null);
  }

  // The UI (what users see)
  return (
    // Outer layout
    <div className="min-h-screen">
      {/* Header shows title and "Add Entry" button */}
      <Header onAddClick={openAddModal} />

      {/* Main page content */}
      <main className="mx-auto max-w-5xl p-4">
        {/* EntryList shows cards; onCardClick links card clicks back to App */}
        <EntryList entries={sortedEntries} onCardClick={handleOpenEntry} />
      </main>

      {/* AddEntryModal opens/closes based on isAddOpen */}
      <AddEntryModal
        isOpen={isAddOpen}
        onClose={closeAddModal}
        onCreate={handleCreateEntry}
      />

      {/* ViewEntryModal opens if selectedEntry is not null */}
      <ViewEntryModal
        entry={selectedEntry}
        onClose={handleCloseView}
      />
    </div>
  );
}
