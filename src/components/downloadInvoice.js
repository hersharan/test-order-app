import "../App.css";
import React, { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { HEADERS } from "../constants";

function DownloadInvoice() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
  };

  const onDownload = async (type) => {
    const url = "https://3a66-103-59-74-38.in.ngrok.io";
    const path = "/api/v1/purchase-order/download-purchase-orders";
    const res = await fetch(
      `${url}/${path}/?ingst=${search}&fromDate=${fromDate}&toDate=${toDate}`,
      {
        method: "GET",
        headers: HEADERS,
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <Fragment>
      <Box className="dl-invoice-box">
        <Paper elevation={3}>
          <div className="dl-form">
            <FormControl className="search-dropdown">
              <InputLabel id="search-label">Search INGST</InputLabel>
              <Select
                labelId="search-label"
                id="search-invoice"
                value={search}
                label="Search"
                onChange={(e) => setSearch(e.target.value)}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="From Date"
              value={fromDate}
              required
              onChange={(e) => {
                handleFromDate(e);
              }}
              type="date"
            />
            <TextField
              label="To Date"
              value={toDate}
              required
              onChange={(e) => {
                handleToDate(e);
              }}
              type="date"
            />
          </div>
          <div className="dl-buttons">

          
          <Button
            variant="contained"
            type="button"
            id="save-xl"
            startIcon={<InsertDriveFileIcon />}
            onClick={() => onDownload("XL")}
            disabled={search === "" || toDate === null || fromDate === null}
          >
            Download Excel
          </Button>
          <Button
            variant="contained"
            type="button"
            id="save-pdf"
            startIcon={<PictureAsPdfIcon />}
            onClick={() => onDownload("PDF")}
            disabled={search === "" || toDate === null || fromDate === null}
          >
            Download PDF
          </Button>
          </div>
        </Paper>
      </Box>
    </Fragment>
  );
}

export default DownloadInvoice;
