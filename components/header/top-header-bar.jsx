import React from "react";
import { LOG_IN } from "../../constants";

function TopHeaderBar() {
  return (
    <section id="sp-top-bar">
      <div className="container">
        <div className="row">
          <div id="sp-logo" className="col-sm-3 col-md-3">
            <a className="logo" href="/">
              <h5>
                <img
                  className="sp-default-logo"
                  src="/images/logo-small-prod.png"
                  alt="Load Dispatch"
                />
                <br />
                <br />
                <b> Global Load Dispatch</b>
              </h5>
            </a>
          </div>
          <div id="sp-top2" className="col-sm-9 col-md-9 hidden-xs">
            <ul className="sp-contact-info">
              <li className="sp-contact-time">
                <i className="icon-login"></i>
                <p className="contact-content">
                  {" "}
                  <a href={LOG_IN}>
                    <span className="contact-title">Sign In</span>{" "}
                  </a>
                </p>
              </li>
              <li className="sp-contact-phone">
                <i className="icon-user"></i>
                <p className="contact-content">
                  {" "}
                  <a href="/register">
                    {" "}
                    <span className="contact-title">Sign Up</span>
                  </a>{" "}
                </p>
              </li>
              <li className="sp-contact-email">
                <i className="icon-envelope-letter"></i>
                <p className="contact-content">
                  {" "}
                  <span>contact@loaddispatch.com.ng</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopHeaderBar;
