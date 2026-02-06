// use state to control the form fields
import { useEffect, useState } from "react";

export default function AddEntryModal({ isOpen, onClose, onCreate }) {
  // form fields as state (so React controls inputs)
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  // if modal opens, optionally reset fields
  useEffect(() => {
    // if it's opening, reset fields so user starts fresh
    if (isOpen) {
      setTitle("");
      setDate("");
      setImageUrl("");
      setContent("");
    }
  }, [isOpen]);

  // if modal is closed, render nothing
  if (!isOpen) return null;

  // check if all fields are filled
  const isValid =
    title.trim() !== "" &&
    date.trim() !== "" &&
    imageUrl.trim() !== "" &&
    content.trim() !== "";

  function handleSubmit(e) {
    // stop the browser from refreshing the page
    e.preventDefault();

    // if not valid, block submission
    if (!isValid) return;

    // create the new entry object
    const newEntry = {
      // id helps React list rendering; we make a simple unique id
      id: crypto.randomUUID(),
      // store fields
      title: title.trim(),
      date: date.trim(),
      imageUrl: imageUrl.trim(),
      content: content.trim(),
    };

    // send this entry back up to App
    onCreate(newEntry);
  }

  return (
    // dark background overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Modal box */}
      <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-lg">
        {/* Top row: title + close button */}
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold">Add New Entry</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* The form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
              placeholder="My day was..."
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm font-medium">Image URL</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
              rows={5}
              placeholder="Today I learned..."
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              // disable button until form is valid
              disabled={!isValid}
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-40"
            >
              Save Entry
            </button>
          </div>

          {/* small helper text */}
          {!isValid && (
            <p className="text-xs text-gray-500">
              Please fill all fields to save your entry.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
