import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">

      <div className="profile-header">

        <div>
          <span className="page-eyebrow">
            ACCOUNT
          </span>

          <h1>My Profile</h1>

          <p>
            View and manage your account information.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

      </div>

      <div className="profile-card">

        <div className="profile-top">

          <div className="profile-avatar">
            AS
          </div>

          <div>
            <h2>Aishwarya Sharma</h2>
            <p>Customer</p>
          </div>

        </div>

        <div className="profile-details">

          <div className="profile-detail">
            <span>Full Name</span>
            <strong>Aishwarya Sharma</strong>
          </div>

          <div className="profile-detail">
            <span>Email</span>
            <strong>aishwarya@example.com</strong>
          </div>

          <div className="profile-detail">
            <span>Phone</span>
            <strong>+91 98765 43210</strong>
          </div>

          <div className="profile-detail">
            <span>Account Type</span>
            <strong>Customer</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;