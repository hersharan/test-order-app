import "../App.css";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { API_URL, HEADERS } from "../constants";
import GstItem from "./gstItem";

function SubmitInvoice({ title = "" }) {
  const [billTo, setbillTo] = useState("");
  const [shipTo, setshipTo] = useState("");
  const [supplyPlace, setsupplyPlace] = useState("");
  const [pan, setPan] = useState("");
  const [gstIn, setgstIn] = useState("");
  const [billDate, setBillDate] = useState("");
  const [billNo, setBillNo] = useState("");
  const [inputList, setInputList] = useState([
    { particulars: "", hsnOrSacCode: "", unit: "", cost: "", gstRate: "" },
  ]);
  const [errors, setErrors] = useState({
    billTo: false,
    shipTo: false,
    supplyPlace: false,
    pan: false,
    gstIn: false,
    billDate: false,
    billNo: false,
  });

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { particulars: "", hsnOrSacCode: "", unit: "", cost: "", gstRate: "" },
    ]);
  };

  const addItem = (name, index, value) => {
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const removeItem = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleshipChange = (e) => {
    const { value } = e.target;
    setshipTo(value);
    const newErrors = {
      ...errors,
      shipTo: !value || value === "",
    };
    setErrors(newErrors);
  };
  const handlesBillNoChange = (e) => {
    const { value } = e.target;
    setBillNo(value);
    const newErrors = {
      ...errors,
      billNo: !value || value === "",
    };
    setErrors(newErrors);
  };
  const handleplaceChange = (e) => {
    const { value } = e.target;
    setsupplyPlace(value);
    const newErrors = {
      ...errors,
      supplyPlace: !value || value === "",
    };
    setErrors(newErrors);
  };
  const handlepanChange = (e) => {
    const { value } = e.target;
    setPan(value);
    const newErrors = {
      ...errors,
      pan: !value || value === "",
    };
    setErrors(newErrors);
  };
  const handlegstInChange = (e) => {
    const { value } = e.target;
    setgstIn(value);
    const newErrors = {
      ...errors,
      gstIn: !value || value === "",
    };
    setErrors(newErrors);
  };

  const handlebillto = (e) => {
    const { value } = e.target;
    setbillTo(value);
    const newErrors = {
      ...errors,
      billTo: !value || value === "",
    };
    setErrors(newErrors);
  };
  const handlebillDate = (e) => {
    const { value } = e.target;
    setBillDate(value);
    const newErrors = {
      ...errors,
      billDate: !value || value === "",
    };
    setErrors(newErrors);
  };

  const clearForm = () => {
    setInputList([
      { particulars: "", hsnOrSacCode: "", unit: "", cost: "", gstRate: "" },
    ]);
    setbillTo("");
    setshipTo("");
    setsupplyPlace("");
    setPan("");
    setgstIn("");
    setBillDate("");
    setBillNo("");
  };

  const handleSubmit = async (e) => {
    const path = "api/v1/purchase-order/save";
    const data = {
      billTo: billTo,
      shipTo: shipTo,
      supplyPlace: supplyPlace,
      pan: pan,
      gstin: gstIn,
      billNo: "",
      billDate: billDate.toString(),
      items: inputList,
    };
    try {
      await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          clearForm();
        });
    } catch {
      clearForm();
    }
  };

  const getIfValuesEmpty = () => {
    if (
      billTo === "" ||
      shipTo === "" ||
      supplyPlace === "" ||
      pan === "" ||
      gstIn === "" ||
      billNo === "" ||
      billDate === ""
    ) {
      return true;
    }
    if (
      inputList.length === 0 ||
      (inputList.length > 0 &&
        (inputList[0].particulars === "" ||
          inputList[0].hsnOrSacCode === "" ||
          inputList[0].unit === "" ||
          inputList[0].cost === "" ||
          inputList[0].gstRate === ""))
    ) {
      return true;
    }
    return false;
  };

  return (
    <Paper elevation={3}>
      <div className="App">
        <Typography variant="h4" component="div" gutterBottom>
          {title}
        </Typography>
        <form
          className="search-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="gst-form">
            <TextField
              id="bill-to"
              label="Bill To"
              value={billTo}
              required
              onChange={(e) => {
                handlebillto(e);
              }}
              multiline
              rows={4}
              name="billTo"
              error={errors.billTo}
              helperText={errors.billTo && "Enter a value"}
            />
            <TextField
              id="ship-to"
              label="Ship To"
              value={shipTo}
              required
              onChange={(e) => {
                handleshipChange(e);
              }}
              multiline
              rows={4}
              name="shipTo"
              error={errors.shipTo}
              helperText={errors.shipTo && "Enter a value"}
            />
            <TextField
              id="ship-to"
              label="Supply Place"
              value={supplyPlace}
              required
              onChange={(e) => {
                handleplaceChange(e);
              }}
              name="supplyPlace"
              error={errors.supplyPlace}
              helperText={errors.supplyPlace && "Enter a value"}
            />
            <TextField
              id="pan"
              label="Pan"
              value={pan}
              required
              onChange={(e) => {
                handlepanChange(e);
              }}
              name="pan"
              error={errors.pan}
              helperText={errors.pan && "Enter a value"}
            />
            <TextField
              id="ship-to"
              label="GSTIN No."
              value={gstIn}
              required
              onChange={(e) => {
                handlegstInChange(e);
              }}
              name="gstIn"
              error={errors.gstIn}
              helperText={errors.gstIn && "Enter a value"}
            />

            <TextField
              id="ship-to"
              label="Bill No."
              value={billNo}
              required
              onChange={(e) => {
                handlesBillNoChange(e);
              }}
              name="billNo"
              error={errors.billNo}
              helperText={errors.billNo && "Enter a value"}
            />
            <TextField
              label="Bill Date"
              value={billDate}
              required
              onChange={(e) => {
                handlebillDate(e);
              }}
              type="date"
              name="billDate"
              error={errors.billDate}
              helperText={errors.billDate && "Enter a value"}
            />
          </div>
          <div className="AppItems">
            <Typography variant="h5" component="div" gutterBottom>
              Item Details
            </Typography>
            {inputList.map((x, i) => {
              return (
                <GstItem
                  key={`${x.name}_${i}`}
                  item={x}
                  idx={i}
                  inputList={inputList}
                  removeItem={removeItem}
                  addItem={addItem}
                />
              );
            })}
          </div>
        </form>
      </div>
      <div className="buttons-section">
        {inputList && (
          <Button
            className="add-btn"
            variant="contained"
            onClick={handleAddClick}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        )}
        <Button
          variant="contained"
          className="submit-btn"
          id="Submit"
          onClick={handleSubmit}
          disabled={
            Object.values(errors).some((item) => item) || getIfValuesEmpty()
          }
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
}

export default SubmitInvoice;
