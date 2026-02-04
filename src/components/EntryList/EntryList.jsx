import EntryCard from "./EntryCard";

export default function EntryList({ entries, onOpenEntry }) {
  return (
    <div className="entry-list flex flex-wrap gap-6">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} onOpen={() => onOpenEntry(entry)} />
      ))}
    </div>
  );
}
