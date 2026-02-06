export const generateEntryId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    // Fallback: time + random to reduce collision risk.
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};