// Header is a simple top bar component
import AddEntryButton from "./AddEntryButton.jsx";

export default function Header({ onAddClick }) {
  // onAddClick comes from App, so Header can "talk back" to App
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        {/* App title */}
        <div>
          <h1 className="text-2xl font-bold">Personal Diary</h1>
          <p className="text-sm text-gray-600">
            Write one entry per day. Click a card to read it.
          </p>
        </div>

        {/* button component; when clicked it calls onAddClick */}
        <AddEntryButton onClick={onAddClick} />
      </div>
    </header>
  );
}
