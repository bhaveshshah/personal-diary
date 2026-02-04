import { useState, useCallback } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { FormField } from "../FormFields";
import { storageService } from "../../services/storageService";

export default function EntryForm({ onSuccess }) {
  const initialFormData = {
    title: "",
    file: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { errors, touched, validateField, validateForm, resetValidation } =
    useFormValidation();

  const checkForExistingEntry = useCallback((selectedDate) => {
    if (storageService.hasEntryForDate(selectedDate)) {
      alert(
        `An entry already exists for ${selectedDate}. Please choose a different date or edit the existing entry.`,
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value, true);

    if (name === "date" && value) {
      setTimeout(() => checkForExistingEntry(value), 300);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value, true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      alert("Please fix all validation errors before submitting");
      return;
    }

    if (storageService.hasEntryForDate(formData.date)) {
      alert(
        `An entry already exists for ${formData.date}. Please choose a different date.`,
      );
      return;
    }

    const success = storageService.saveEntry(formData);

    if (success) {
      clearForm();
      onSuccess?.();
    }
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every((value) => value.trim() !== "") &&
      Object.values(errors).every((error) => !error)
    );
  };

  const clearForm = () => {
    setFormData(initialFormData);
    resetValidation();
  };

  const fields = [
    {
      name: "title",
      type: "text",
      placeholder: "Title",
      label: "Title",
      className: "input input-md validator",
    },
    {
      name: "file",
      type: "text",
      placeholder: "Enter file URL",
      className: "input input-md validator",
    },
    {
      name: "date",
      type: "date",
      max: new Date().toISOString().split("T")[0],
      className: "input",
    },
    {
      name: "notes",
      type: "textarea",
      placeholder: "Add your notes here (minimum 10 characters)",
      className: "textarea validator",
      rows: 6,
    },
  ];

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-10 mx-auto">
      <legend className="fieldset-legend">Personal Diary Notes</legend>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={formData[field.name]}
            error={touched[field.name] && errors[field.name]}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        ))}

        <div className="flex flex-row-reverse p-3 gap-2">
          <button
            type="button"
            className="btn btn-soft btn-info"
            onClick={clearForm}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-soft btn-info"
            disabled={!isFormValid()}
          >
            Add Notes
          </button>
        </div>
      </form>
    </fieldset>
  );
}
