export default function EntryCard({ entry, onOpen }) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm cursor-pointer" onClick={onOpen}>
      <figure className="h-48 w-full overflow-hidden">
        <img
          src={entry.imageUrl}
          alt={entry.title}
          className="h-full w-full object-cover" />
      </figure>
      <div className="card-body">
        <p className="text-lg text-base-content/60">{entry.date}</p>
        <h2 className="card-title">{entry.title}</h2>
      </div>
    </div>
  );
}
