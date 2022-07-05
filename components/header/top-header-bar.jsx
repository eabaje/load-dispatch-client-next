import React from "react";
import { LOG_IN } from "../../constants";

function TopHeaderBar() {
  return (
    <section id="sp-top-bar">
      <div class="container">
        <div class="row">
          <div id="sp-logo" class="col-sm-3 col-md-3">
            <a class="logo" href="/">
              <h5>
                <img
                  class="sp-default-logo"
                  src="images/logo-small-prod.png"
                  alt="Load Dispatch"
                />
                <br />
                <br />
                <b> Global Load Dispatch</b>
              </h5>
            </a>
          </div>
          <div id="sp-top2" class="col-sm-9 col-md-9 hidden-xs">
            <ul class="sp-contact-info">
              <li class="sp-contact-time">
                <i class="icon-login"></i>
                <p class="contact-content">
                  {" "}
                  <a href={LOG_IN}>
                    <span class="contact-title">Sign In</span>{" "}
                  </a>
                </p>
              </li>
              <li class="sp-contact-phone">
                <i class="icon-user"></i>
                <p class="contact-content">
                  {" "}
                  <a href="/register">
                    {" "}
                    <span class="contact-title">Sign Up</span>
                  </a>{" "}
                </p>
              </li>
              <li class="sp-contact-email">
                <i class="icon-envelope-letter"></i>
                <p class="contact-content">
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
