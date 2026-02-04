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
      imageUrl: "https://cdn.hswstatic.com/gif/gettyimages-174871839.jpg",
      content:
        "Enjoy a peaceful day by the sea. Watched the waves crash onto the shore and the sun set into the horizon.",
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
