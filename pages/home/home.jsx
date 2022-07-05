import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/banner";
import Offer from "../../components/home/offer";
import Service from "../../components/home/service";

function Home() {
  return (
    <div>
      <Banner />

      <section class="action">
        <div class="container">
          <div class="row">
            <div class="col-sm-9 action-block">
              <h2 class="title">We connect Shippers to Carriers </h2>
              <h4 style={{ color: "#fff", paddingLeft: "10px" }}>
                Use LoadDispatch at no cost for 30 days
              </h4>
            </div>
            <div class="col-sm-3 action-block text-right">
              <a
                target="_parent"
                href="/Register"
                class="sppb-btn sppb-btn-default sppb-btn-"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </section>

      <Service />
      <Offer />
    </div>
  );
}

export default Home;
