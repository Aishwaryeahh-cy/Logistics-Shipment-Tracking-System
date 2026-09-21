import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    // Set customer role
    localStorage.setItem("userRole", "customer");

    // Go to customer portal
    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1>🚚 ShipTrack</h1>

          <p>
            Logistics Shipment Tracking System
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >
          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Customer Login
          </p>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>

        {/* OPERATIONS LOGIN */}

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            paddingTop: "18px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <p
            style={{
              color: "#6b7280",
              fontSize: "13px",
              marginBottom: "8px",
            }}
          >
            Are you ShipTrack Operations staff?
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/operations-login")
            }
            style={{
              background: "transparent",
              border: "none",
              color: "#123a5e",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Operations Login →
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;