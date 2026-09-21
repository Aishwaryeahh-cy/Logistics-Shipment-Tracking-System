import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OperationsLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    if (
      email === "ops@shiptrack.com" &&
      password === "ops123"
    ) {
      // Set operations role
      localStorage.setItem("userRole", "operations");

      // Go to operations portal
      navigate("/operations");
    } else {
      alert(
        "Invalid Operations login\n\nUse:\nops@shiptrack.com\nops123"
      );
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "400px",
          maxWidth: "100%",
          background: "white",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >

        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              color: "#123a5e",
              marginBottom: "8px",
            }}
          >
            🚚 ShipTrack
          </h1>

          <h2
            style={{
              marginBottom: "8px",
              color: "#1f2937",
            }}
          >
            Operations Login
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginTop: 0,
              marginBottom: "25px",
            }}
          >
            Login to manage shipments and drivers.
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "7px",
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="ops@shiptrack.com"
            style={inputStyle}
          />

          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "7px",
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="ops123"
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px",
              marginTop: "5px",
              background: "#123a5e",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Login to Operations
          </button>

        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            paddingTop: "18px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              border: "none",
              color: "#123a5e",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ← Back to Customer Login
          </button>
        </div>

        <div
          style={{
            marginTop: "18px",
            padding: "12px",
            background: "#f8fafc",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          Demo Operations Account
          <br />
          <strong>ops@shiptrack.com</strong>
          <br />
          <strong>ops123</strong>
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  marginBottom: "18px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
};

export default OperationsLogin;