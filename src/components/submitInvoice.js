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
    setshipTo(e.target.value);
  };
  const handlesBillNoChange = (e) => {
    setBillNo(e.target.value);
  };
  const handleplaceChange = (e) => {
    setsupplyPlace(e.target.value);
  };
  const handlepanChange = (e) => {
    setPan(e.target.value);
  };
  const handlegstInChange = (e) => {
    setgstIn(e.target.value);
  };

  const handlebillto = (e) => {
    setbillTo(e.target.value);
  };
  const handlebillDate = (e) => {
    setBillDate(e.target.value);
  };

  const clearForm = () => {
    setInputList([]);
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
            />
            <TextField
              id="ship-to"
              label="Supply Place"
              value={supplyPlace}
              required
              onChange={(e) => {
                handleplaceChange(e);
              }}
            />
            <TextField
              id="pan"
              label="Pan"
              value={pan}
              required
              onChange={(e) => {
                handlepanChange(e);
              }}
            />
            <TextField
              id="ship-to"
              label="GSTIN No."
              value={gstIn}
              required
              onChange={(e) => {
                handlegstInChange(e);
              }}
            />

            <TextField
              id="ship-to"
              label="Bill No."
              value={billNo}
              required
              onChange={(e) => {
                handlesBillNoChange(e);
              }}
            />
            <TextField
              label="Bill Date"
              value={billDate}
              required
              onChange={(e) => {
                handlebillDate(e);
              }}
              type="date"
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
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
}

export default SubmitInvoice;
