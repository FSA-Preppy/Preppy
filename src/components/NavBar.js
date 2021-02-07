import React from "react";
import { Link } from "react-router-dom";
import { authService } from "../fbase";
import "../styles/navbarstyle.css";

import { Icon } from "@iconify/react";
import fridgeIcon from "@iconify-icons/mdi/fridge";
import silverwareForkKnife from "@iconify-icons/mdi/silverware-fork-knife";
import barcodeScan from "@iconify-icons/mdi/barcode-scan";
import cameraIcon from "@iconify-icons/mdi/camera";
import offIcon from "@iconify-icons/el/off";

const NavBar = () => {
  const onClick = () => {
    authService.signOut();
  };

  return (
    <div className="navbar-container">
      <Link to="/image" className="link">
        <Icon icon={cameraIcon} className="navbar-icon"></Icon>
      </Link>
      <Link to="/search" className="link">
        <Icon icon={barcodeScan} className="navbar-icon" />
      </Link>
      <Link to="/fridge" className="link">
        <Icon icon={fridgeIcon} className="navbar-icon" />
      </Link>
      <Link to="/recipe" className="link">
        <Icon icon={silverwareForkKnife} className="navbar-icon" />
      </Link>
      <Link to="/auth" className="link">
        <Icon icon={offIcon} className="navbar-icon" onClick={onClick} />
      </Link>
    </div>
  );
};

export default NavBar;
