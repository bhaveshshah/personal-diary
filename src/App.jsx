// import React hooks: useEffect (do something on start / when something changes) and useState (store state)
import { useEffect, useMemo, useState } from "react";

// import components that App will show
import Header from "./components/Header.jsx";
import EntryList from "./components/EntryList.jsx";
import AddEntryModal from "./components/AddEntryModal.jsx";
import ViewEntryModal from "./components/ViewEntryModal.jsx";

// import helper functions for localStorage
import { loadEntries, saveEntries } from "./utils/storage.js";

export default function App() {
  // entries = all diary entries
  // setEntries = the function that updates entries
  const [entries, setEntries] = useState([]);

  // isAddOpen controls if the Add Entry modal is visible or hidden
  const [isAddOpen, setIsAddOpen] = useState(false);

  // selectedEntry holds the entry we want to view in the "View" modal
  // if selectedEntry is null, the view modal is closed
  const [selectedEntry, setSelectedEntry] = useState(null);

  // when the app loads for the FIRST time, we want to read localStorage and show saved entries
  useEffect(() => {
    // load saved entries from localStorage
    const saved = loadEntries();

    // put them into our state so UI can render them
    setEntries(saved);
  }, []); // [] means "run only once on startup"

  // whenever entries changes, we want to save to localStorage (persistence requirement)
  useEffect(() => {
    // save the latest entries array
    saveEntries(entries);
  }, [entries]); // [entries] means "run again whenever entries changes"

  // show newest entries first
  // useMemo = "only recalculate when entries changes" (performance + clean)
  const sortedEntries = useMemo(() => {
    // create a new array copy first so we don't mutate React state directly
    const copy = [...entries];

    // sort by date (newest first)
    copy.sort((a, b) => {
      // convert "YYYY-MM-DD" into time numbers and compare
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // return the sorted list
    return copy;
  }, [entries]);

  // this function opens the Add modal
  function openAddModal() {
    setIsAddOpen(true);
  }

  // this function closes the Add modal
  function closeAddModal() {
    setIsAddOpen(false);
  }

  // this runs when the user submits a new entry from the AddEntryModal form
  function handleCreateEntry(newEntry) {
    // first, check: "is there already an entry for this date?"
    const alreadyExists = entries.some((e) => e.date === newEntry.date);

    // if yes, stop and show an alert as required (one-entry-per-day)
    if (alreadyExists) {
      alert("You already wrote an entry for this day. Please come back tomorrow 🙂");
      return;
    }

    // if not, add it to our entries
    setEntries((prev) => {
      // prev = the old entries
      // return a NEW array with the new entry added
      return [newEntry, ...prev];
    });

    // close the add modal after success
    closeAddModal();
  }

  // this runs when user clicks an EntryCard
  function handleOpenEntry(entry) {
    // store the clicked entry, which will open the View modal
    setSelectedEntry(entry);
  }

  // this closes the View modal
  function handleCloseView() {
    // setting selectedEntry to null means "nothing is selected", so modal closes
    setSelectedEntry(null);
  }

  // the UI (what users see)
  return (
    // outer layout
    <div className="min-h-screen">
      {/* header shows title and "Add Entry" button */}
      <Header onAddClick={openAddModal} />

      {/* main page content */}
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
