import { useState, useCallback } from "react";
import { validationRules } from "../utils/validationRules";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value, markTouched = false) => {
    if (markTouched) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }

    const error = validationRules[name]?.(value) || "";
    setErrors((prev) => ({ ...prev, [name]: error }));

    return error;
  }, []);

  const validateForm = useCallback((formData) => {
    const newErrors = {};
    const allTouched = {};

    Object.keys(formData).forEach((key) => {
      const error = validationRules[key]?.(formData[key]) || "";
      if (error) newErrors[key] = error;
      allTouched[key] = true;
    });

    setErrors(newErrors);
    setTouched(allTouched);

    return Object.keys(newErrors).length === 0;
  }, []);

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return { errors, touched, validateField, validateForm, resetValidation };
};
