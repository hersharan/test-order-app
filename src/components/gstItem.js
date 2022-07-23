import "../App.css";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

function GstItem({ item, idx, inputList, removeItem, addItem }) {
  const [itemInput, setitemInput] = useState(item);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const oldItem = itemInput;
    setitemInput({
      ...oldItem,
      [name]: value,
    });
    addItem(name, index, value);
    const newErrors = errors;
    setErrors({
      ...newErrors,
      [name]: !value || value === "",
    });
  };

  const handleRemoveClick = (index) => {
    removeItem(index);
  };

  useEffect(() => {
    setitemInput(item);
  }, [item]);

  return (
    <div className="box">
      <TextField
        name="particulars"
        id="ship-to"
        placeholder="Enter Particulars"
        value={itemInput.particulars}
        onChange={(e) => handleInputChange(e, idx)}
        multiline
        maxRows={4}
        error={errors.particulars}
        helperText={errors.particulars && "Enter a value"}
      />
      <TextField
        className="ml10"
        name="hsnOrSacCode"
        placeholder="Enter HSN/SAC Code"
        value={itemInput.hsnOrSacCode}
        onChange={(e) => handleInputChange(e, idx)}
        error={errors.hsnOrSacCode}
        helperText={errors.hsnOrSacCode && "Enter a value"}
      />
      <TextField
        name="unit"
        placeholder="Enter Unit"
        value={itemInput.unit}
        onChange={(e) => handleInputChange(e, idx)}
        error={errors.unit}
        helperText={errors.unit && "Enter a value"}
        type="number"
      />
      <TextField
        className="ml10"
        name="cost"
        placeholder="Enter Cost"
        value={itemInput.cost}
        onChange={(e) => handleInputChange(e, idx)}
        error={errors.cost}
        helperText={errors.cost && "Enter a value"}
        type="number"
      />
      <TextField
        className="ml10"
        name="gstRate"
        placeholder="Enter GST Rate"
        value={itemInput.gstRate}
        onChange={(e) => handleInputChange(e, idx)}
        error={errors.gstRate}
        helperText={errors.gstRate && "Enter a value"}
        type="number"
      />
      <div className="btn-box">
        {inputList.length !== 1 && (
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveClick(idx)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default GstItem;
