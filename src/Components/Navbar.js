import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const handleHomeClick = () => {
    const resetEvent = new Event("resetFilters");
    window.dispatchEvent(resetEvent);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/home"
          onClick={handleHomeClick}
        >
          NewsMonkey
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Add more links here if needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
