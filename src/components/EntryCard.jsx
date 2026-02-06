// EntryCard is one clickable card preview
export default function EntryCard({ entry, onClick }) {
  return (
    <button
      // Whole card is clickable
      onClick={onClick}
      // type="button" prevents accidental form submits
      type="button"
      className="overflow-hidden rounded-xl border bg-white text-left shadow-sm transition hover:shadow-md"
    >
      {/* Image preview */}
      <div className="h-40 w-full bg-gray-100">
        <img
          // src is where the image comes from
          src={entry.imageUrl}
          // alt is for accessibility
          alt={entry.title}
          // Make image cover the area nicely
          className="h-full w-full object-cover"
          // If image fails, we hide it by replacing with a blank
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Text area */}
      <div className="p-4">
        {/* Date */}
        <p className="text-xs text-gray-500">{entry.date}</p>

        {/* Title */}
        <h3 className="mt-1 line-clamp-1 text-lg font-semibold">{entry.title}</h3>

        {/* Content preview (first ~80 chars) */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-700">
          {entry.content}
        </p>
      </div>
    </button>
  );
}
