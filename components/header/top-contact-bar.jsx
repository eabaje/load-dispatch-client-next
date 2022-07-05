import React from "react";

function TopContactBar() {
  return (
    <section id="sp-top-info">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 top-base no-padding">
            <div class="col-sm-6 top-block">
              <p>
                <i class="fa fa-map-marker">
                  <i class="hidden">address</i>
                </i>{" "}
                52A Ikorodu Road Jibowu,Lagos.
              </p>
            </div>
            <div class="col-sm-6 top-block text-right">
              <ul class="social-icons">
                <li>
                  <a target="_blank" href="#">
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <i class="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <i class="fa fa-google-plus"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <i class="fa fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <i class="fa fa-skype"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopContactBar;
