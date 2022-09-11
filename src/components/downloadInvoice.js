import "../App.css";
import React, { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { API_URL, HEADERS } from "../constants";

function DownloadInvoice() {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState(new Date().toISOString().substr(0, 10));
  const [toDate, setToDate] = useState(new Date().toISOString().substr(0, 10));
  const [errors, setErrors] = useState({
    search: false,
    searchValue: false,
    fromDate: false,
    toDate: false,
  });

  const handleFromDate = (e) => {
    const { value } = e.target;
    const today = new Date();
    const selectedDate = new Date(value);
    setFromDate(value);
    const newErrors = {
      ...errors,
      fromDate: !value || value === "" || selectedDate >= today,
    };
    setErrors(newErrors);
  };
  const handleToDate = (e) => {
    const { value } = e.target;
    const today = new Date();
    const selectedDate = new Date(value);
    setToDate(value);
    const newErrors = {
      ...errors,
      toDate: !value || value === "" || selectedDate >= today,
    };
    setErrors(newErrors);
  };

  const handleSearchValue = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    const newErrors = {
      ...errors,
      searchValue: !value || value === "",
    };
    setErrors(newErrors);
  };

  const handleType = (e) => {
    const { value } = e.target;
    setSearch(value);
    const newErrors = {
      ...errors,
      search: !value || value === "",
    };
    setErrors(newErrors);
  };

  const clearForm = () => {
    setSearch("");
    setSearchValue("");
    setFromDate(new Date().toISOString().substr(0, 10));
    setToDate(new Date().toISOString().substr(0, 10));
    setErrors({
      search: false,
      searchValue: false,
      fromDate: false,
      toDate: false,
    });
  };

  const onDownload = async (type) => {
    const fileType = type === "pdf" ? "-pdf" : "";
    const path = `api/v1/purchase-order/download${fileType}-purchase-orders`;
    await fetch(
      `${API_URL}/${path}?ingst=${searchValue}&fromDate=${fromDate}&toDate=${toDate}`,
      {
        method: "GET",
        headers: HEADERS,
      }
    )
      .then((response) => {
        response.blob().then((blob) => {
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob);
          link.href = url;
          link.download = `${searchValue}_${fromDate}_${toDate}.${
            type === "pdf" ? type : "xls"
          }`;
          link.click();
          clearForm();
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <Fragment>
      <Box className="dl-invoice-box">
        <Paper elevation={3}>
          <Typography variant="h4" component="div" gutterBottom>
            Summary Invoice
          </Typography>
          <div className="dl-form">
            <FormControl className="search-dropdown" error={errors.search}>
              <InputLabel id="search-label">Search</InputLabel>
              <Select
                labelId="search-label"
                id="search-invoice"
                value={search}
                label="Search"
                onChange={handleType}
              >
                <MenuItem value="GSTIN NO.">GSTIN No.</MenuItem>
              </Select>
              {errors.search && <FormHelperText>Select a type</FormHelperText>}
            </FormControl>
            <TextField
              className="search-no"
              id="search-value"
              label="Enter No."
              value={searchValue}
              required
              onChange={handleSearchValue}
              error={errors.searchValue}
              helperText={errors.searchValue && "Enter a No."}
            />
            <TextField
              label="From Date"
              value={fromDate}
              required
              onChange={(e) => {
                handleFromDate(e);
              }}
              type="date"
              error={errors.fromDate}
              helperText={errors.fromDate && "Enter a valid date"}
            />
            <TextField
              label="To Date"
              value={toDate}
              required
              onChange={(e) => {
                handleToDate(e);
              }}
              type="date"
              error={errors.toDate}
              helperText={errors.toDate && "Enter a valid date"}
            />
          </div>
          <div className="dl-buttons">
            <Button
              variant="contained"
              type="button"
              id="save-xl"
              startIcon={<InsertDriveFileIcon />}
              onClick={() => onDownload("xls")}
              disabled={search === "" || toDate === "" || fromDate === ""}
            >
              Download Excel
            </Button>
            <Button
              variant="contained"
              type="button"
              id="save-pdf"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => onDownload("pdf")}
              disabled={search === "" || toDate === "" || fromDate === ""}
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
