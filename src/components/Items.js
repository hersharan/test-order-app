import "./Items.css";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { TextField } from "@react-ui-org/react-ui";

export const Items = () => {
  const [name, setName] = useState("");
  const [hsnorSacCode, sethsnorSacCode] = useState("");
  const [unit, setUnit] = useState("");
  const [cost, setCost] = useState("");
  const [gstRate, setgstRate] = useState("");

  const handlenameChange = (e) => {
    setName(e.target.value);
  };
  const handlehsnorsacChange = (e) => {
    sethsnorSacCode(e.target.value);
  };
  const handleunitChange = (e) => {
    setUnit(e.target.value);
  };
  const handlecostChange = (e) => {
    setCost(e.target.value);
  };
  const handlegstChange = (e) => {
    setgstRate(e.target.value);
  };

  return (
    <div className="Items">
      <TextField
        label=" Item Name"
        placeholder="Enter Item Name"
        required={true}
        type="text"
        onChange={(e) => handlenameChange(e)}
      ></TextField>
      <TextField
        label="HSNorSACCode"
        placeholder="Enter HSN or SAC Code"
        required={true}
        type="text"
        onChange={(e) => handlehsnorsacChange(e)}
      ></TextField>
      <TextField
        label="Units"
        placeholder="Enter Units"
        required={true}
        type="text"
        onChange={(e) => handleunitChange(e)}
      ></TextField>
      <TextField
        label="Cost"
        placeholder="Enter Item Cost"
        required={true}
        type="text"
        onChange={(e) => handleunitChange(e)}
      ></TextField>
      <TextField
        id="GST"
        label=" GST Rate"
        placeholder="Enter GST Rate"
        required={true}
        type="text"
        onChange={(e) => handlegstChange(e)}
      ></TextField>
    </div>
  );
};
