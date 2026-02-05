export default function EntryDetails({ entry }) {
    if (!entry) {
        return null;
    }

    return (
        <>
            <h2 className="font-semibold text-lg">{entry.title}</h2>
            <p className="py-3 text-base-content/60">{entry.date}</p>
            <figure className="pb-5">
                <img
                    src={entry.imageUrl}
                    alt={entry.title} />
            </figure>
            <p>{entry.content}</p>
        </>
    );
}
