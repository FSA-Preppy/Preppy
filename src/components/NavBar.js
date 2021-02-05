import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbarstyle.css";

import { Icon } from "@iconify/react";
import fridgeIcon from "@iconify-icons/mdi/fridge";
import silverwareForkKnife from "@iconify-icons/mdi/silverware-fork-knife";
import barcodeScan from "@iconify-icons/mdi/barcode-scan";
import cameraIcon from "@iconify-icons/mdi/camera";

const NavBar = () => (
  <div className="navbar-container">
    <Link to="/home" className="link">
      <Icon icon={cameraIcon} className="navbar-icon"></Icon>
    </Link>
    <Link to="/home" className="link">
      <Icon icon={barcodeScan} className="navbar-icon" />
    </Link>
    <Link to="/fridge" className="link">
      <Icon icon={fridgeIcon} className="navbar-icon" />
    </Link>
    <Link to="/recipe" className="link">
      <Icon icon={silverwareForkKnife} className="navbar-icon" />
    </Link>
  </div>
);
export default NavBar;
