import EntryForm from "../forms/EntryForm.jsx";

export default function AddEntryModal({ modalRef, onClose }) {
  return (
    <>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-md relative">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
            aria-label="Close"
          >
            ✕
          </button>
          <EntryForm onSuccess={onClose}></EntryForm>
        </div>
      </dialog>
    </>
  );
}
