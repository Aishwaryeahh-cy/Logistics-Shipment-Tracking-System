
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import shipmentsData from "../../data/shipments";


// Fix Leaflet marker icons

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


function TrackShipment() {

  const [searchId, setSearchId] = useState("");

  const [shipment, setShipment] = useState(null);

  const [shipments, setShipments] = useState([]);


  // Load shared shipment data

  useEffect(() => {

    const savedShipments =
      localStorage.getItem("shipments");

    if (savedShipments) {
      setShipments(JSON.parse(savedShipments));
    } else {
      setShipments(shipmentsData);
    }

  }, []);


  const lifecycle = [
    "ORDER_CREATED",
    "PICKED_UP",
    "WAREHOUSE",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];


  // Track shipment

  const handleTrack = () => {

    const id = searchId
      .trim()
      .toUpperCase();

    const foundShipment = shipments.find(
      (item) => item.id === id
    );

    if (foundShipment) {

      setShipment(foundShipment);

    } else {

      setShipment(null);

      alert(
        "Shipment not found. Try SHP1001, SHP1002, SHP1003 or SHP1004."
      );
    }
  };


  const currentIndex = shipment
    ? lifecycle.indexOf(shipment.status)
    : -1;


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >

      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
        }}
      >

        {/* HEADER */}

        <h1
          style={{
            margin: 0,
            color: "#123a5e",
            fontSize: "32px",
          }}
        >
          Track Shipment
        </h1>


        <p
          style={{
            color: "#6b7280",
            marginTop: "8px",
          }}
        >
          Enter your shipment ID to view real-time
          tracking information.
        </p>


        {/* SEARCH */}

        <div
          style={{
            marginTop: "25px",
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            display: "flex",
            gap: "12px",
            border: "1px solid #e5e7eb",
          }}
        >

          <input
            value={searchId}
            onChange={(e) =>
              setSearchId(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                handleTrack();
              }

            }}
            placeholder="Enter Shipment ID e.g. SHP1001"
            style={{
              flex: 1,
              padding: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "9px",
              fontSize: "15px",
              outline: "none",
            }}
          />


          <button
            onClick={handleTrack}
            style={{
              background: "#123a5e",
              color: "white",
              border: "none",
              padding: "0 28px",
              borderRadius: "9px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            🔍 Track Shipment
          </button>

        </div>


        {/* EXAMPLE IDS */}

        <p
          style={{
            fontSize: "13px",
            color: "#9ca3af",
            marginTop: "10px",
          }}
        >
          Try: SHP1001 · SHP1002 · SHP1003 · SHP1004
        </p>


        {/* TRACKING RESULT */}

        {shipment && (

          <div style={{ marginTop: "30px" }}>

            {/* SUMMARY */}

            <div
              style={{
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

                  <p
                    style={{
                      margin: 0,
                      color: "#6b7280",
                      fontSize: "13px",
                    }}
                  >
                    Shipment ID
                  </p>

                  <h2
                    style={{
                      margin: "5px 0 0",
                      color: "#123a5e",
                    }}
                  >
                    {shipment.id}
                  </h2>

                </div>


                <div
                  style={{
                    background: shipment.delayed
                      ? "#fee2e2"
                      : "#dcfce7",

                    color: shipment.delayed
                      ? "#b91c1c"
                      : "#15803d",

                    padding: "9px 14px",
                    borderRadius: "20px",
                    fontWeight: "700",
                    fontSize: "13px",
                  }}
                >

                  {shipment.delayed
                    ? "⚠ DELAYED"
                    : shipment.status.replaceAll(
                        "_",
                        " "
                      )}

                </div>

              </div>


              {/* ROUTE */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 60px 1fr",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >

                <div>

                  <small
                    style={{
                      color: "#9ca3af",
                    }}
                  >
                    FROM
                  </small>

                  <h3
                    style={{
                      margin: "6px 0",
                    }}
                  >
                    📦 {shipment.origin}
                  </h3>

                </div>


                <div
                  style={{
                    textAlign: "center",
                    fontSize: "25px",
                  }}
                >
                  →
                </div>


                <div>

                  <small
                    style={{
                      color: "#9ca3af",
                    }}
                  >
                    TO
                  </small>

                  <h3
                    style={{
                      margin: "6px 0",
                    }}
                  >
                    🏠 {shipment.destination}
                  </h3>

                </div>

              </div>

            </div>


            {/* MAP */}

            <div
              style={{
                marginTop: "25px",
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            >

              <h2
                style={{
                  marginTop: 0,
                  color: "#123a5e",
                }}
              >
                📍 Live Shipment Location
              </h2>


              <div
                style={{
                  height: "400px",
                  marginTop: "15px",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >

                <ShipmentMap
                  shipment={shipment}
                />

              </div>


              {/* COORDINATES */}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "30px",
                  marginTop: "18px",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >

                <span>
                  Latitude:{" "}
                  <strong>
                    {shipment.lat}
                  </strong>
                </span>


                <span>
                  Longitude:{" "}
                  <strong>
                    {shipment.lng}
                  </strong>
                </span>


                <span>
                  Current Location:{" "}
                  <strong>
                    {shipment.location}
                  </strong>
                </span>

              </div>

            </div>


            {/* PROGRESS */}

            <div
              style={{
                marginTop: "25px",
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            >

              <h2
                style={{
                  marginTop: 0,
                  color: "#123a5e",
                }}
              >
                Shipment Progress
              </h2>


              <div
                style={{
                  height: "10px",
                  background: "#e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginTop: "20px",
                }}
              >

                <div
                  style={{
                    width:
                      `${shipment.progress}%`,
                    height: "100%",
                    background: "#123a5e",
                    borderRadius: "10px",
                  }}
                />

              </div>


              <div
                style={{
                  marginTop: "10px",
                  textAlign: "right",
                  fontWeight: "700",
                  color: "#123a5e",
                }}
              >
                {shipment.progress}% complete
              </div>

            </div>


            {/* TIMELINE */}

            <div
              style={{
                marginTop: "25px",
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            >

              <h2
                style={{
                  marginTop: 0,
                  color: "#123a5e",
                }}
              >
                Shipment Timeline
              </h2>


              <div
                style={{
                  marginTop: "20px",
                }}
              >

                {lifecycle.map(
                  (status, index) => {

                    const completed =
                      index <= currentIndex;

                    return (
                      <div
                        key={status}
                        style={{
                          display: "flex",
                          gap: "15px",
                          minHeight: "60px",
                        }}
                      >

                        <div
                          style={{
                            display: "flex",
                            flexDirection:
                              "column",
                            alignItems:
                              "center",
                          }}
                        >

                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              background:
                                completed
                                  ? "#123a5e"
                                  : "#e5e7eb",
                              color:
                                completed
                                  ? "white"
                                  : "#94a3b8",
                              display: "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              fontWeight: "700",
                            }}
                          >
                            {completed
                              ? "✓"
                              : index + 1}
                          </div>


                          {index <
                            lifecycle.length -
                              1 && (

                            <div
                              style={{
                                width: "2px",
                                flex: 1,
                                background:
                                  index <
                                  currentIndex
                                    ? "#123a5e"
                                    : "#e5e7eb",
                              }}
                            />

                          )}

                        </div>


                        <div>

                          <strong
                            style={{
                              color:
                                completed
                                  ? "#123a5e"
                                  : "#94a3b8",
                            }}
                          >
                            {status.replaceAll(
                              "_",
                              " "
                            )}
                          </strong>


                          <p
                            style={{
                              marginTop: "5px",
                              color: "#9ca3af",
                              fontSize: "13px",
                            }}
                          >

                            {index <
                            currentIndex
                              ? "Completed"
                              : index ===
                                currentIndex
                                ? "Current shipment status"
                                : "Upcoming"}

                          </p>

                        </div>

                      </div>
                    );

                  }
                )}

              </div>

            </div>


            {/* DELIVERY INFORMATION */}

            <div
              style={{
                marginTop: "25px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, 1fr)",
                gap: "20px",
              }}
            >

              <InfoCard
                title="Driver"
                value={shipment.driver}
              />

              <InfoCard
                title="Estimated Delivery"
                value={
                  shipment.eta ||
                  shipment.estimatedDelivery
                }
              />

            </div>

          </div>

        )}

      </div>

    </div>
  );
}


// ================================
// SHIPMENT MAP
// ================================

function ShipmentMap({ shipment }) {

  const locations = {

    Hyderabad: [
      17.385,
      78.4867,
    ],

    Mumbai: [
      19.076,
      72.8777,
    ],

    Bangalore: [
      12.9716,
      77.5946,
    ],

    Chennai: [
      13.0827,
      80.2707,
    ],

    Delhi: [
      28.6139,
      77.209,
    ],

    Pune: [
      18.5204,
      73.8567,
    ],

  };


  const origin =
    locations[shipment.origin] ||
    [shipment.lat, shipment.lng];

  const destination =
    locations[shipment.destination] ||
    [shipment.lat, shipment.lng];

  const current = [
    shipment.lat,
    shipment.lng,
  ];


  const route = [
    origin,
    current,
    destination,
  ];


  return (

    <MapContainer
      center={current}
      zoom={6}
      scrollWheelZoom={true}
      style={{
        height: "100%",
        width: "100%",
      }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      <MapUpdater
        positions={route}
      />


      {/* Origin */}

      <Marker position={origin}>

        <Popup>

          <strong>
            Origin
          </strong>

          <br />

          {shipment.origin}

        </Popup>

      </Marker>


      {/* Current Location */}

      <Marker position={current}>

        <Popup>

          <strong>
            🚚 Current Location
          </strong>

          <br />

          {shipment.location}

          <br />

          Latitude: {shipment.lat}

          <br />

          Longitude: {shipment.lng}

        </Popup>

      </Marker>


      {/* Destination */}

      <Marker position={destination}>

        <Popup>

          <strong>
            Destination
          </strong>

          <br />

          {shipment.destination}

        </Popup>

      </Marker>


      {/* Route */}

      <Polyline
        positions={route}
        pathOptions={{
          color: "#123a5e",
          weight: 5,
        }}
      />

    </MapContainer>

  );
}


// ================================
// MAP UPDATER
// ================================

function MapUpdater({ positions }) {

  const map = useMap();

  useEffect(() => {

    map.fitBounds(positions, {
      padding: [30, 30],
    });

  }, [map, positions]);

  return null;
}


// ================================
// INFO CARD
// ================================

function InfoCard({
  title,
  value,
}) {

  return (

    <div
      style={{
        background: "white",
        padding: "22px",
        borderRadius: "15px",
        border: "1px solid #e5e7eb",
      }}
    >

      <div
        style={{
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        {title}
      </div>


      <strong
        style={{
          display: "block",
          marginTop: "8px",
          color: "#123a5e",
          fontSize: "18px",
        }}
      >
        {value}
      </strong>

    </div>

  );
}


export default TrackShipment;

