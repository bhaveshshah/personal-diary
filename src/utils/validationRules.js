export const validationRules = {
  title: (value) => {
    if (!value.trim()) return "Title is required";
    if (value.trim().length < 3) return "Title must be at least 3 characters";
    if (value.trim().length > 100)
      return "Title must not exceed 100 characters";
    return "";
  },

  file: (value) => {
    if (!value.trim()) return "File URL is required";
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(value.trim())) return "Please enter a valid URL";
    return "";
  },

  date: (value) => {
    if (!value) return "Date is required";
    const selectedDate = new Date(value + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate > today) return "Cannot select a future date";
    return "";
  },

  notes: (value) => {
    if (!value.trim()) return "Notes are required";
    if (value.trim().length < 10) return "Notes must be at least 10 characters";
    if (value.trim().length > 5000)
      return "Notes must not exceed 5000 characters";
    return "";
  },
};
