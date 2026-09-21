import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/customer/Login";
import OperationsLogin from "./pages/auth/OperationsLogin";

import Dashboard from "./pages/customer/Dashboard";
import Shipments from "./pages/customer/Shipments";
import TrackShipment from "./pages/customer/TrackShipment";
import CreateShipment from "./pages/customer/CreateShipment";
import Profile from "./pages/customer/Profile";
import History from "./pages/customer/History";

import Operations from "./pages/ops/Operations";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}

        <Route path="/" element={<Login />} />

        <Route
          path="/operations-login"
          element={<OperationsLogin />}
        />

        {/* CUSTOMER PORTAL */}

        <Route
          element={
            <ProtectedRoute allowedRole="customer">
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/shipments"
            element={<Shipments />}
          />

          <Route
            path="/track"
            element={<TrackShipment />}
          />

          <Route
            path="/create-shipment"
            element={<CreateShipment />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>

        {/* OPERATIONS PORTAL */}

        <Route
          element={
            <ProtectedRoute allowedRole="operations">
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/operations"
            element={<Operations />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;