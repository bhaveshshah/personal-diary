import { useRef, useState } from "react";
import AddEntryModal from "../modals/AddEntryModal.jsx";

export default function AddEntryButton() {
  const modalRef = useRef(null);
  // adding this to reset the form state
  const [modalKey, setModalKey] = useState(0);

  const openModal = () => modalRef.current?.showModal();
  const closeModal = () => {
    setModalKey((prev) => prev + 1);
    modalRef.current?.close();
  };

  return (
    <>
      <button className="btn btn-soft btn-info" onClick={openModal}>
        + Add Entry
      </button>
      <AddEntryModal key={modalKey} modalRef={modalRef} onClose={closeModal} />
    </>
  );
}
