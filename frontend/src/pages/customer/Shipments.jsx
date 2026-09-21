
import { Link } from "react-router-dom";
import shipmentsData from "../../data/shipments";

function Shipments() {
  const savedShipments = localStorage.getItem("shipments");

  const shipments = savedShipments
    ? JSON.parse(savedShipments)
    : shipmentsData;

  function getStatusText(status) {
    if (status === "ORDER_CREATED") return "Pending";
    if (status === "PICKED_UP") return "Picked Up";
    if (status === "WAREHOUSE") return "Warehouse";
    if (status === "IN_TRANSIT") return "In Transit";
    if (status === "OUT_FOR_DELIVERY") return "Out for Delivery";
    if (status === "DELIVERED") return "Delivered";

    return status;
  }

  return (
    <div className="shipments-page">

      <div className="shipments-header">
        <div>
          <h1>Shipments</h1>
          <p>View and manage all your shipments.</p>
        </div>

        <Link to="/create-shipment" className="primary-button">
          + Create Shipment
        </Link>
      </div>


      <div className="shipment-filters">
        <span>All</span>
        <span>Pending</span>
        <span>In Transit</span>
        <span>Delivered</span>
      </div>


      <p className="shipment-count">
        <strong>{shipments.length}</strong> shipments found
      </p>


      <div className="shipments-list">

        {shipments.map((shipment) => (

          <div className="shipment-card" key={shipment.id}>

            <div className="shipment-card-top">

              <div>
                <p className="shipment-label">
                  SHIPMENT ID
                </p>

                <h2>{shipment.id}</h2>
              </div>

              <span
                className={`shipment-status ${
                  shipment.status === "DELIVERED"
                    ? "delivered"
                    : shipment.status === "IN_TRANSIT" ||
                      shipment.status === "OUT_FOR_DELIVERY"
                    ? "in-transit"
                    : "pending"
                }`}
              >
                {shipment.delayed
                  ? "⚠ Delayed"
                  : getStatusText(shipment.status)}
              </span>

            </div>


            <div className="shipment-details">

              <div>
                <p>From</p>
                <strong>{shipment.origin}</strong>
              </div>

              <div>
                <p>To</p>
                <strong>{shipment.destination}</strong>
              </div>

              <div>
                <p>Customer</p>
                <strong>{shipment.customer}</strong>
              </div>

              <div>
                <p>Delivery Date</p>
                <strong>{shipment.eta}</strong>
              </div>

              <div>
                <p>Shipment Type</p>
                <strong>Standard</strong>
              </div>

            </div>


            <div className="shipment-card-bottom">

              <span>
                Current Location: <strong>{shipment.location}</strong>
              </span>

              <Link to="/track">
                Track Shipment →
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Shipments;

