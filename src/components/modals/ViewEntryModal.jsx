import EntryDetails from "../forms/EntryDetails";

export default function ViewEntryModal({ modalRef, entry }) {
    return (
        <>
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <EntryDetails entry={entry} />
                    <div className="modal-action justify-center">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-info text-white w-25">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
