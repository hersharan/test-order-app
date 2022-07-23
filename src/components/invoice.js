import "../App.css";
import React from "react";
import Box from "@mui/material/Box";
import SubmitInvoice from "./submitInvoice";
import { Tab, Tabs, Typography } from "@mui/material";

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
        <Tab label="Purchase Order" />
        <Tab label="Stocks Entry" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SubmitInvoice title="Purchase Order" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubmitInvoice title="Stocks Entry" />
      </TabPanel>
    </Box>
  );
}

export default Invoice;
