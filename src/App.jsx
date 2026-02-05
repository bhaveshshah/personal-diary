import { useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import EntryList from "./components/EntryList/EntryList";
import ViewEntryModal from "./components/modals/ViewEntryModal";

function App() {
  const entries = [
    {
      id: 1,
      title: "A Day at the Lake",
      date: "Feb 02, 2026",
      imageUrl:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      content:
        "Spent the afternoon by the lake, listening to the wind move through the pines. The water was glassy and the mountains looked impossibly still.",
    },
    {
      id: 2,
      title: "Morning Reflections",
      date: "Feb 01, 2026",
      imageUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
      content:
        "Coffee, a blank page, and a quiet sunrise. Wrote down three small things I’m grateful for and felt grounded again.",
    },
    {
      id: 3,
      title: "Sunset by the Sea",
      date: "Jan 31, 2026",
      imageUrl:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
      content:
        "Walked the shoreline until the sky turned peach and gold. The tide was low and the breeze carried the scent of salt and kelp.",
    },
    {
      id: 4,
      title: "Cozy Evening",
      date: "Jan 30, 2026",
      imageUrl:
        "https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=1200&q=80",
      content:
        "Lit a candle, brewed tea, and read by the window. The rain made everything sound softer and the pages felt warm in my hands.",
    },
    {
      id: 5,
      title: "Winter Walk",
      date: "Jan 29, 2026",
      imageUrl:
        "https://images.unsplash.com/photo-1459666644539-a9755287d6b0?auto=format&fit=crop&w=1200&q=80",
      content:
        "Took a slow walk through the snowy park. The trees glittered and every step squeaked—quiet and crisp.",
    },
    {
      id: 6,
      title: "Notebook Thoughts",
      date: "Jan 28, 2026",
      imageUrl:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      content:
        "Jotted down a few ideas for spring. There’s something about pen on paper that makes planning feel real.",
    },
  ];

  const [selectedEntry, setSelectedEntry] = useState(entries[0] ?? null);
  const modalRef = useRef(null);

  const handleOpenEntry = (entry) => {
    setSelectedEntry(entry);
    modalRef.current?.showModal();
  };

  return (
    <>
      <Header />
      <div className="divider"></div>
      <EntryList entries={entries} onOpenEntry={handleOpenEntry} />
      <ViewEntryModal modalRef={modalRef} entry={selectedEntry} />
    </>
  );
}

export default App;
