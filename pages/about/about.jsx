import React from "react";
import BreadCrumb from "../../components/banner/breadcrumb";

function About() {
  return (
    <div>
      <BreadCrumb name="About Us" />
      <div class="container">
        <div class="row">
          <div class="page-header history-block">
            <h1>About Us</h1>
          </div>

          <div class="page-content">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3>Our History</h3>
              </div>
              <div class="panel-body">
                <p>
                  LoadDispatch<sup>&reg;</sup> came online in 2021 as a way for
                  vehicle shippers to easily connect with car carriers. It has
                  since transformed the auto transport industry, taking it from
                  relying on paper, faxes, and phones, to utilizing an efficient
                  central database on the Internet.
                </p>
              </div>
            </div>

            <div class="panel panel-default">
              <div class="panel-heading">
                <h3>Today</h3>
              </div>
              <div class="panel-body">
                <p>
                  Thousands of transport brokers, dealers, auctions,
                  manufacturers, and other industry professionals access
                  LoadDispatch
                  <sup>&reg;</sup>
                  on a daily basis to move vehicles of all types. LoadDispatch
                  <sup>&reg;</sup> has grown into the world's largest real-time
                  auto transport marketplace. It enables shippers across North
                  America to save time and money when transporting vehicles by
                  providing access to virtually every car carrier in the United
                  States, more than 13,000 carriers.
                </p>
              </div>
            </div>

            <div class="panel panel-default">
              <div class="panel-heading">
                <h3>Easy to Use</h3>
              </div>
              <div class="panel-body">
                <p>
                  <strong>
                    Post and search for vehicles with the click of a button
                  </strong>
                  . Carriers get complete shipping information &mdash; origin,
                  destination, vehicle description, ship date, company name and
                  phone, etc. All members can
                  <strong>get details about any company</strong> in our system,
                  including contact information, equipment and insurance (for
                  carriers), ICC MC number, references, and much more.
                </p>
              </div>
            </div>

            <div class="panel panel-default">
              <div class="panel-heading">
                <h3>Pricing</h3>
              </div>
              <div class="panel-body">
                <ul class="list-unstyled">
                  <li>
                    Use LoadDispatch<sup>&reg;</sup> for{" "}
                    <strong>30-days</strong> at no-charge*.
                  </li>
                  <li>
                    Plans start as low as
                    <strong>
                      <span id="startingPrice">$89.95</span>/month
                    </strong>{" "}
                    plus tax for Shippers.
                  </li>
                  <li>
                    Carriers can get premium access for{" "}
                    <span id="unlimitedPrice">$115.95</span>/month plus tax.
                  </li>
                  <li>
                    No fees for 30-days* and no obligation to continue
                    membership.
                  </li>
                </ul>
              </div>
            </div>

            <div class="panel panel-default">
              <div class="panel-heading">
                <h3>Sign Up Now</h3>
              </div>
              <div class="panel-body">
                <p>
                  <strong>
                    Sign up today and use Load Dispatch for 30-days* at
                    no-charge!
                  </strong>{" "}
                  Car carriers, brokers, dealers, auto auctions, manufacturers
                  and rental agencies can apply for a LoadDispatch
                  <sup>&reg;</sup> username and password by going directly to
                  our
                  <a href="/register/">
                    <strong>sign up page</strong>
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <section class="action">
            <div class="container">
              <div class="row">
                <div class="col-sm-9 action-block">
                  <h2 class="title">do you need Carrier to lift your cargo?</h2>
                </div>
                <div class="col-sm-3 action-block text-right">
                  <a
                    href="/register"
                    class="sppb-btn sppb-btn-default sppb-btn-"
                  >
                    Sign UP
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
