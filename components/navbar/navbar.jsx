import React from "react";
import { useContext, useState } from "react";
//import "./navbar.scss";
import Link from "next/link";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
//import { AuthContext } from "../context/authContext/AuthContext";
//import { logout } from "../context/authContext/AuthActions";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  //  const { dispatch } = useContext(AuthContext);

  //Javascript split method href get the name of the path in array

  console.log("useRouter.pathname", useRouter);
  // const splitLocation = useRouter.pathname.split("/");

  const scrollPage = () => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  };
  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };
  typeof window !== "undefined" || scrollPage;
  return (
    <header id="sp-header">
      <div class="container">
        <div class="row">
          <div id="sp-menu" class="col-sm-12 col-md-12">
            <div class="sp-column ">
              <div class="sp-megamenu-wrapper">
                <a id="offcanvas-hrefggler" href="#">
                  <i class="fa fa-bars"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

//export default NavBar;
export default dynamic(() => Promise.resolve(NavBar), { ssr: false });
