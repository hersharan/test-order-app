import "../App.css";
import React from "react";
import Box from "@mui/material/Box";
import SubmitInvoice from "./submitInvoice";
import { Tab, Tabs, Typography } from "@mui/material";
import DownloadInvoice from "./downloadInvoice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Invoice() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className="main-box">
      <Tabs value={value} onChange={handleChange} aria-label="invoices">
        <Tab label="SALE BILL" />
        <Tab label="PURCHASE BILL" />
        <Tab label="SUMMARY INVOICE"/>
      </Tabs>
      <TabPanel value={value} index={0}>
        <SubmitInvoice title="Sale Bill" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubmitInvoice title="Purchase Bill" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DownloadInvoice />
      </TabPanel>
    </Box>
  );
}

export default Invoice;
