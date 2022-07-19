import "./App.css";
import React from "react";
import DownloadInvoice from "./components/downloadInvoice";
import AppHeader from "./components/header";
import SubmitInvoice from "./components/submitInvoice";

function App() {
  return (
    <div>
      <AppHeader />
      <SubmitInvoice />
      <DownloadInvoice />
    </div>
  );
}

export default App;
