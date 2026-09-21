import { useState } from "react";
import shipmentsData from "../../data/shipments";

function Operations() {
  const [shipments, setShipments] = useState(() => {
    const savedShipments = localStorage.getItem("shipments");

    return savedShipments
      ? JSON.parse(savedShipments)
      : shipmentsData;
  });

  const [selectedShipment, setSelectedShipment] = useState(null);

  const drivers = [
    "Arjun Kumar",
    "Vikram Singh",
    "Rahul Sharma",
    "Priya Reddy",
  ];

  const statuses = [
    "ORDER_CREATED",
    "PICKED_UP",
    "WAREHOUSE",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];

  // Save updated shipment data
  const saveShipments = (updatedShipments) => {
    setShipments(updatedShipments);

    localStorage.setItem(
      "shipments",
      JSON.stringify(updatedShipments)
    );
  };

  // Update driver
  const updateDriver = (id, driver) => {
    const updatedShipments = shipments.map((shipment) =>
      shipment.id === id
        ? {
            ...shipment,
            driver,
          }
        : shipment
    );

    saveShipments(updatedShipments);
  };

  // Update status
  const updateStatus = (id, status) => {
    const updatedShipments = shipments.map((shipment) =>
      shipment.id === id
        ? {
            ...shipment,
            status,
            delayed: false,
          }
        : shipment
    );

    saveShipments(updatedShipments);
  };

  // Update location
  const updateLocation = (id) => {
    const location = prompt(
      "Enter current shipment location:"
    );

    if (!location) return;

    const updatedShipments = shipments.map((shipment) =>
      shipment.id === id
        ? {
            ...shipment,
            location,
          }
        : shipment
    );

    saveShipments(updatedShipments);
  };

  // Statistics
  const totalShipments = shipments.length;

  const inTransit = shipments.filter(
    (shipment) =>
      shipment.status === "IN_TRANSIT" ||
      shipment.status === "OUT_FOR_DELIVERY"
  ).length;

  const pending = shipments.filter(
    (shipment) =>
      shipment.status === "ORDER_CREATED" ||
      shipment.status === "WAREHOUSE"
  ).length;

  const delivered = shipments.filter(
    (shipment) =>
      shipment.status === "DELIVERED"
  ).length;

  const delayed = shipments.filter(
    (shipment) => shipment.delayed
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f5f7fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#123a5e",
              fontSize: "32px",
            }}
          >
            Operations Dashboard
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: "8px",
            }}
          >
            Shipment operations control center
          </p>
        </div>

        <div
          style={{
            background: "#123a5e",
            color: "white",
            padding: "12px 18px",
            borderRadius: "10px",
            fontWeight: "600",
          }}
        >
          LIVE OPERATIONS
        </div>
      </div>

      {/* STAT CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "18px",
          marginBottom: "30px",
        }}
      >
        <StatCard
          title="Total Shipments"
          value={totalShipments}
          subtitle="All shipments"
        />

        <StatCard
          title="In Transit"
          value={inTransit}
          subtitle="Currently moving"
        />

        <StatCard
          title="Pending"
          value={pending}
          subtitle="Needs attention"
        />

        <StatCard
          title="Delivered"
          value={delivered}
          subtitle="Completed"
        />

        <StatCard
          title="Delayed"
          value={delayed}
          subtitle="Requires attention"
        />
      </div>

      {/* SHIPMENT TABLE */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 5px 20px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: "#123a5e",
              }}
            >
              Shipment Operations
            </h2>

            <p
              style={{
                marginTop: "6px",
                color: "#6b7280",
              }}
            >
              Assign drivers and manage shipment status
            </p>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1100px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                }}
              >
                <th style={thStyle}>Shipment</th>
                <th style={thStyle}>Route</th>
                <th style={thStyle}>Driver</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td style={tdStyle}>
                    <strong>{shipment.id}</strong>
                  </td>

                  <td style={tdStyle}>
                    {shipment.route}
                  </td>

                  <td style={tdStyle}>
                    <select
                      value={shipment.driver}
                      onChange={(e) =>
                        updateDriver(
                          shipment.id,
                          e.target.value
                        )
                      }
                      style={selectStyle}
                    >
                      <option>
                        Not Assigned
                      </option>

                      {drivers.map((driver) => (
                        <option
                          key={driver}
                          value={driver}
                        >
                          {driver}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td style={tdStyle}>
                    <div>
                      <strong>
                        {shipment.location}
                      </strong>

                      <div
                        style={{
                          fontSize: "12px",
                          color: "#9ca3af",
                          marginTop: "4px",
                        }}
                      >
                        {shipment.lat},{" "}
                        {shipment.lng}
                      </div>
                    </div>
                  </td>

                  <td style={tdStyle}>
                    <select
                      value={shipment.status}
                      onChange={(e) =>
                        updateStatus(
                          shipment.id,
                          e.target.value
                        )
                      }
                      style={{
                        ...selectStyle,
                        fontWeight: "600",
                      }}
                    >
                      {statuses.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>

                    {shipment.delayed && (
                      <div
                        style={{
                          marginTop: "7px",
                          display: "inline-block",
                          background: "#fee2e2",
                          color: "#b91c1c",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        ⚠ DELAYED
                      </div>
                    )}
                  </td>

                  <td style={tdStyle}>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateLocation(
                            shipment.id
                          )
                        }
                        style={buttonStyle}
                      >
                        📍 Location
                      </button>

                      <button
                        onClick={() =>
                          setSelectedShipment(
                            shipment
                          )
                        }
                        style={{
                          ...buttonStyle,
                          background: "#123a5e",
                          color: "white",
                        }}
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SHIPMENT DETAILS */}

      {selectedShipment && (
        <div
          style={{
            marginTop: "25px",
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#123a5e",
                }}
              >
                {selectedShipment.id}
              </h2>

              <p style={{ color: "#6b7280" }}>
                {selectedShipment.route}
              </p>
            </div>

            <button
              onClick={() =>
                setSelectedShipment(null)
              }
              style={{
                border: "none",
                background: "#f1f5f9",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ✕ Close
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, 1fr)",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <InfoBox
              title="Driver"
              value={selectedShipment.driver}
            />

            <InfoBox
              title="Status"
              value={selectedShipment.status}
            />

            <InfoBox
              title="Location"
              value={selectedShipment.location}
            />

            <InfoBox
              title="Coordinates"
              value={`${selectedShipment.lat}, ${selectedShipment.lng}`}
            />
          </div>

          {/* LIFECYCLE */}

          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "#123a5e" }}>
              Shipment Lifecycle
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                gap: "8px",
              }}
            >
              {statuses.map((status, index) => {
                const active =
                  statuses.indexOf(
                    selectedShipment.status
                  ) >= index;

                return (
                  <div
                    key={status}
                    style={{
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        margin: "auto",
                        background: active
                          ? "#123a5e"
                          : "#e5e7eb",
                        color: active
                          ? "white"
                          : "#6b7280",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </div>

                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "11px",
                        color: active
                          ? "#123a5e"
                          : "#9ca3af",
                        fontWeight: "600",
                      }}
                    >
                      {status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "14px",
        border: "1px solid #e5e7eb",
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.03)",
      }}
    >
      <span
        style={{
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        {title}
      </span>

      <div
        style={{
          fontSize: "30px",
          fontWeight: "700",
          color: "#123a5e",
          marginTop: "8px",
        }}
      >
        {value}
      </div>

      <small
        style={{
          color: "#9ca3af",
        }}
      >
        {subtitle}
      </small>
    </div>
  );
}

function InfoBox({ title, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: "12px",
        }}
      >
        {title}
      </div>

      <strong
        style={{
          display: "block",
          marginTop: "6px",
          color: "#123a5e",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px",
  color: "#64748b",
  fontSize: "13px",
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle = {
  padding: "16px 14px",
  borderBottom: "1px solid #f1f5f9",
  color: "#334155",
  fontSize: "14px",
};

const selectStyle = {
  padding: "8px",
  borderRadius: "7px",
  border: "1px solid #d1d5db",
  background: "white",
  cursor: "pointer",
};

const buttonStyle = {
  border: "1px solid #d1d5db",
  background: "white",
  padding: "8px 10px",
  borderRadius: "7px",
  cursor: "pointer",
  fontSize: "12px",
};

export default Operations;