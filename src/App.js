import "./App.css";
import React from "react";
import DownloadInvoice from "./components/downloadInvoice";
import AppHeader from "./components/header";
import Invoice from "./components/invoice";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import AuthProvider from "./auth/auth";
import ProtectedRoute from "./auth/protectedRoute";
import PublicRoute from "./auth/publicRoute";

function App() {
  return (
    <div>
      <AuthProvider>
        <AppHeader />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="submit"
            element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="download"
            element={
              <ProtectedRoute>
                <DownloadInvoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
