import React from "react";

function TopContactBar() {
  return (
    <section id="sp-top-info">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 top-base no-padding">
            <div className="col-sm-6 top-block">
              <p>
                <i className="fa fa-map-marker">
                  <i className="hidden">address</i>
                </i>{" "}
                52A Ikorodu Road Jibowu,Lagos.
              </p>
            </div>
            <div className="col-sm-6 top-block text-right">
              <ul className="social-icons">
                <li>
                  <a target="_blank" href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <i className="fa fa-skype"></i>
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
