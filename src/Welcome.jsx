import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <div>Merhaba hosgeldin</div>
      <Link to="game" id="start">
        Basla
      </Link>
    </div>
  );
}

export default Welcome;
