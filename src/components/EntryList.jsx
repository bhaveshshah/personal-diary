// EntryList shows many EntryCard components
import EntryCard from "./EntryCard.jsx";

export default function EntryList({ entries, onCardClick }) {
  // If no entries, show an empty state
  if (entries.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-6 text-center text-gray-700">
        No entries yet. Click <b>Add Entry</b> to write your first one ✍️
      </div>
    );
  }

  // Otherwise show a grid of cards
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* We loop through entries and render one card per entry */}
      {entries.map((entry) => (
        <EntryCard
          // key helps React track each item
          key={entry.id}
          // pass the entry object into the card
          entry={entry}
          // when card is clicked, call onCardClick(entry)
          onClick={() => onCardClick(entry)}
        />
      ))}
    </div>
  );
}
