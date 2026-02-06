export default function ViewEntryModal({ entry, onClose }) {
  // if entry is null, modal is closed
  if (!entry) return null;

  return (
    // Dark overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Modal box */}
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Image section */}
        <div className="h-64 w-full bg-gray-100">
          <img
            src={entry.imageUrl}
            alt={entry.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Content section */}
        <div className="p-5">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-500">{entry.date}</p>
              <h2 className="mt-1 text-2xl font-bold">{entry.title}</h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* Full content */}
          <p className="mt-4 whitespace-pre-wrap text-gray-800">
            {entry.content}
          </p>

          {/* Bottom close */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
