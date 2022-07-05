import NavBar from "../navbar/navbar";
import TopContactBar from "./top-contact-bar";
import TopHeaderBar from "./top-header-bar";

import React from "react";

function Header() {
  return (
    <div>
      <TopContactBar />
      <TopHeaderBar />
      <NavBar />
    </div>
  );
}

export default Header;
