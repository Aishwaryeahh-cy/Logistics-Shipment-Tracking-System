
import { Link } from "react-router-dom";
import shipmentsData from "../../data/shipments";

function Dashboard() {
  const savedShipments = localStorage.getItem("shipments");

  const shipments = savedShipments
    ? JSON.parse(savedShipments)
    : shipmentsData;

  const totalShipments = shipments.length;

  const inTransit = shipments.filter(
    (shipment) =>
      shipment.status === "IN_TRANSIT" ||
      shipment.status === "OUT_FOR_DELIVERY"
  ).length;

  const delivered = shipments.filter(
    (shipment) => shipment.status === "DELIVERED"
  ).length;

  const pending = shipments.filter(
    (shipment) =>
      shipment.status === "ORDER_CREATED" ||
      shipment.status === "WAREHOUSE"
  ).length;

  return (
    <div className="dashboard-page">

      <section className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back! Here's an overview of your shipments.
          </p>
        </div>

        <Link to="/track" className="primary-button">
          Track Shipment
        </Link>
      </section>


      <section className="stats-grid">

        <div className="stat-card">
          <div>
            <p>Total Shipments</p>
            <h2>{totalShipments}</h2>
          </div>
          <span className="stat-icon blue">📦</span>
        </div>

        <div className="stat-card">
          <div>
            <p>In Transit</p>
            <h2>{inTransit}</h2>
          </div>
          <span className="stat-icon amber">🚚</span>
        </div>

        <div className="stat-card">
          <div>
            <p>Delivered</p>
            <h2>{delivered}</h2>
          </div>
          <span className="stat-icon green">✓</span>
        </div>

        <div className="stat-card">
          <div>
            <p>Pending</p>
            <h2>{pending}</h2>
          </div>
          <span className="stat-icon purple">⏳</span>
        </div>

      </section>


      <section className="dashboard-section">

        <div className="section-header">
          <div>
            <h2>Recent Shipments</h2>
            <p>Your latest shipment activity</p>
          </div>

          <Link to="/shipments" className="view-link">
            View All
          </Link>
        </div>


        <div className="shipment-table-wrapper">

          <table className="shipment-table">

            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Status</th>
                <th>ETA</th>
              </tr>
            </thead>

            <tbody>

              {shipments.map((shipment) => (
                <tr key={shipment.id}>

                  <td className="shipment-id">
                    {shipment.id}
                  </td>

                  <td>
                    {shipment.customer}
                  </td>

                  <td>
                    {shipment.destination}
                  </td>

                  <td>
                    <span className="status-badge">
                      {shipment.status}
                    </span>
                  </td>

                  <td>
                    {shipment.eta}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>


      <section className="quick-actions">

        <div>
          <h2>Quick Actions</h2>
          <p>Manage your shipments quickly.</p>
        </div>

        <div className="action-buttons">

          <Link
            to="/shipments"
            className="secondary-button"
          >
            View Shipments
          </Link>

          <Link
            to="/track"
            className="primary-button"
          >
            Track Shipment
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;

