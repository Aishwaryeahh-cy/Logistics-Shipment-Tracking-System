
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import shipmentsData from "../../data/shipments";

function CreateShipment() {
  const navigate = useNavigate();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [customer, setCustomer] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !origin ||
      !destination ||
      !customer
    ) {
      alert("Please fill all required fields.");
      return;
    }


    const savedShipments =
      localStorage.getItem("shipments");

    const shipments = savedShipments
      ? JSON.parse(savedShipments)
      : shipmentsData;


    const newNumber =
      shipments.length + 1001;

    const newShipment = {
      id: `SHP${newNumber}`,
      customer: customer,
      origin: origin,
      destination: destination,
      route: `${origin} → ${destination}`,
      driver: "Not Assigned",
      status: "ORDER_CREATED",
      location: origin,
      lat: getLatitude(origin),
      lng: getLongitude(origin),
      eta: "20 Sep 2026",
      progress: 10,
      delayed: false,
    };


    const updatedShipments = [
      ...shipments,
      newShipment,
    ];


    localStorage.setItem(
      "shipments",
      JSON.stringify(updatedShipments)
    );


    setMessage(
      `Shipment ${newShipment.id} created successfully!`
    );


    setOrigin("");
    setDestination("");
    setCustomer("");
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f5f7fa",
        fontFamily: "Arial, sans-serif",
      }}
    >

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
        }}
      >

        <h1 style={{ color: "#123a5e" }}>
          Create Shipment
        </h1>

        <p style={{ color: "#6b7280" }}>
          Create a new shipment and start tracking it.
        </p>


        {message && (

          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              background: "#dcfce7",
              color: "#166534",
              borderRadius: "8px",
              fontWeight: "600",
            }}
          >
            {message}
          </div>

        )}


        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "25px",
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
          }}
        >

          <label style={labelStyle}>
            Customer Name
          </label>

          <input
            value={customer}
            onChange={(e) =>
              setCustomer(e.target.value)
            }
            placeholder="Enter customer name"
            style={inputStyle}
          />


          <label style={labelStyle}>
            Origin
          </label>

          <select
            value={origin}
            onChange={(e) =>
              setOrigin(e.target.value)
            }
            style={inputStyle}
          >
            <option value="">
              Select origin
            </option>

            <option value="Hyderabad">
              Hyderabad
            </option>

            <option value="Bangalore">
              Bangalore
            </option>

            <option value="Chennai">
              Chennai
            </option>

            <option value="Delhi">
              Delhi
            </option>

            <option value="Mumbai">
              Mumbai
            </option>

            <option value="Pune">
              Pune
            </option>
          </select>


          <label style={labelStyle}>
            Destination
          </label>

          <select
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
            style={inputStyle}
          >
            <option value="">
              Select destination
            </option>

            <option value="Hyderabad">
              Hyderabad
            </option>

            <option value="Bangalore">
              Bangalore
            </option>

            <option value="Chennai">
              Chennai
            </option>

            <option value="Delhi">
              Delhi
            </option>

            <option value="Mumbai">
              Mumbai
            </option>

            <option value="Pune">
              Pune
            </option>
          </select>


          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "13px",
              background: "#123a5e",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Create Shipment
          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/shipments")
            }
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "13px",
              background: "#f1f5f9",
              color: "#123a5e",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            View Shipments
          </button>

        </form>

      </div>

    </div>
  );
}


function getLatitude(city) {
  const locations = {
    Hyderabad: 17.385,
    Bangalore: 12.9716,
    Chennai: 13.0827,
    Delhi: 28.6139,
    Mumbai: 19.076,
    Pune: 18.5204,
  };

  return locations[city] || 17.385;
}


function getLongitude(city) {
  const locations = {
    Hyderabad: 78.4867,
    Bangalore: 77.5946,
    Chennai: 80.2707,
    Delhi: 77.209,
    Mumbai: 72.8777,
    Pune: 73.8567,
  };

  return locations[city] || 78.4867;
}


const labelStyle = {
  display: "block",
  marginBottom: "7px",
  marginTop: "18px",
  fontWeight: "600",
  color: "#334155",
};


const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  background: "white",
};


export default CreateShipment;

