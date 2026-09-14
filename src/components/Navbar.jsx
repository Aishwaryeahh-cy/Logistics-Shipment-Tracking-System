import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>ShipTrack</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/shipments">Shipments</Link>
        <Link to="/track">Track Shipment</Link>
      </div>
    </nav>
  );
}

export default Navbar;