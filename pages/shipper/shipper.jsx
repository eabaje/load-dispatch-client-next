import React from "react";
import BreadCrumb from "../../components/banner/breadcrumb";

function Shipper() {
  return (
    <div>
      <BreadCrumb name="Shipper" />

      <section id="history" class="space-top">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 history-block">
              <h2>How It Works For Shippers</h2>
              <p>
                You post the vehicles you want to ship, where they are going,
                and what you are willing to pay to have each of them shipped.
                Carriers, who are already traveling your route and want to fill
                their trucks, contact you directly to transport your vehicle.
              </p>

              <p>
                {" "}
                While LoadDispatch® is not a shipping company, we connect you to
                over 13,000 carriers ready to transport your vehicle. In
                addition, we provide access to U.S. DOT license information,
                insurance information and ratings for carriers as well as an
                online dispatching system to make dispatching faster and easier.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="space bg-color">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 about-block">
              <h2>Our process</h2>
              <ul>
                <li>
                  <i class="icon-check"></i> Post vehicle(s) on LoadDispatch.
                  Interested Carriers will contact you by phone.
                </li>
                <li>
                  <i class="icon-check"></i>Review the Carrier profile on
                  LoadDispatch to verify Carrier meets criteria.
                </li>
                <li>
                  <i class="icon-check"></i>Assign Carrier to your vehicle
                  shipment.
                </li>
                <li>
                  <i class="icon-check"></i>Receive your vehicle(s) and rate the
                  Carrier who fulfilled the job.
                </li>
                <li>
                  <i class="icon-check"></i>Drive Continuous Improvement
                </li>
                <li>
                  <i class="icon-check"></i>Freight Security
                </li>
                <li>
                  <i class="icon-check"></i>Air & Ocean Cargo Insurance
                </li>
                <li>
                  <i class="icon-check"></i>Our highly efficient customs
                  brokerage
                </li>
                <li>
                  <i class="icon-check"></i>Clearance and compliance service
                </li>
                <li>
                  <i class="icon-check"></i>We ensure complete security
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="action">
        <div class="container">
          <div class="row">
            <div class="col-sm-9 action-block">
              <h2 class="title">do you need Carrier to lift your cargo?</h2>
            </div>
            <div class="col-sm-3 action-block text-right">
              <a href="/register" class="sppb-btn sppb-btn-default sppb-btn-">
                Sign UP
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shipper;
