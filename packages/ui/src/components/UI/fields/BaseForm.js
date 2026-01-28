import React from "react";
import { TextField, Box } from "@mui/material";
import BaseTextField2 from "./BaseTextField2";

const BaseForm = ({ formData, setFormData, errors, fields, readOnly = false }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {fields.map(({ name, label, required, multiline }, index) => (
        <BaseTextField2
          key={index}
          name={name}
          label={label}
          value={formData[name] || ""}
          onChange={handleChange}
          error={!!errors[name]}
          helperText={errors[name]}
          fullWidth
          required={required}
          multiline={multiline}
          rows={multiline ? 4 : 1}
          disabled={readOnly}
        />
      ))}
    </Box>
  );
};

export default BaseForm;
