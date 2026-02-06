// A small reusable button component
export default function AddEntryButton({ onClick }) {
  return (
    <button
      // When user clicks, we call the function passed from App (through Header)
      onClick={onClick}
      // Tailwind styles
      className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
      type="button"
    >
      + Add Entry
    </button>
  );
}
