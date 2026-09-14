import { Link, Outlet, useNavigate } from "react-router-dom";

function AppLayout() {
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          background: "#123a5e",
          color: "white",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
        }}
      >
        {/* LOGO */}

        <Link
          to={
            role === "operations"
              ? "/operations"
              : "/dashboard"
          }
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          🚚 ShipTrack
        </Link>

        {/* CUSTOMER NAVBAR */}

        {role === "customer" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <Link to="/dashboard" style={navLinkStyle}>
              Dashboard
            </Link>

            <Link to="/shipments" style={navLinkStyle}>
              Shipments
            </Link>

            <Link to="/track" style={navLinkStyle}>
              Track Shipment
            </Link>

            <Link
              to="/create-shipment"
              style={navLinkStyle}
            >
              Create Shipment
            </Link>

            <Link to="/history" style={navLinkStyle}>
              History
            </Link>

            <Link to="/profile" style={navLinkStyle}>
              Profile
            </Link>

            <button
              onClick={handleLogout}
              style={logoutStyle}
            >
              Logout
            </button>
          </div>
        )}

        {/* OPERATIONS NAVBAR */}

        {role === "operations" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <Link
              to="/operations"
              style={operationsLinkStyle}
            >
              Operations Dashboard
            </Link>

            <button
              onClick={handleLogout}
              style={logoutStyle}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* PAGE CONTENT */}

      <main>
        <Outlet />
      </main>
    </div>
  );
}

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "500",
};

const operationsLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "700",
  background: "rgba(255,255,255,0.15)",
  padding: "9px 14px",
  borderRadius: "8px",
};

const logoutStyle = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "9px 15px",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
};

export default AppLayout;