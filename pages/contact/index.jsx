import React from "react";
import { useState, useEffect } from "react";
import BreadCrumb from "../../components/banner/breadcrumb";
import { useForm } from "react-hook-form";
import { Country, State } from "country-state-city";
import {
  REACT_APP_EMAILJS_RECEIVER,
  REACT_APP_EMAILJS_SERVICEID,
  REACT_APP_EMAILJS_TEMPLATEID,
  REACT_APP_EMAILJS_TO_NAME,
  REACT_APP_EMAILJS_USERID,
} from "../../constants";
function Contact() {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [formSubmitSuccessful, setFormSubmitSuccessful] = useState(false);

  useEffect(() => {
    setCountries((countries) => (countries = Country.getAllCountries()));
  }, []);

  const selectCountry = async (e) => {
    setCountry((country) => e.target.value);

    setRegion(
      (region) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (region = State.getStatesOfCountry(e.target.value))
    );
  };

  const onSubmitContactForm = (data, r) => {
    alert(`Thank you for your message from ${data.FullName}`);
    setLoading(true);
    const templateId = REACT_APP_EMAILJS_TEMPLATEID;
    const serviceID = REACT_APP_EMAILJS_SERVICEID;
    const message = `Company :${data.CompanyName} <br/>
    Name:${data.FullName} <br/>
    
    Phone:${data.Phone} <br/>
    
    Email:${data.Email} <br/>
    
    Country:${data.Country} <br/>

    Reason:${data.Reason} <br/>

    Question/Feedback:${data.Question} <br/>

    
    
    `;
    sendFeedback(serviceID, templateId, {
      from_name: data.FullName,
      to_name: REACT_APP_EMAILJS_TO_NAME,
      message_html: message,
      reply_to: REACT_APP_EMAILJS_RECEIVER,
    });
    r.target.reset();
  };

  const sendFeedback = (serviceID, templateId, variables) => {
    window.emailjs
      .send(serviceID, templateId, variables)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setFormSubmitSuccessful(true);
        }
        console.log("Email successfully sent!");
      })
      .catch((err) =>
        console.error(
          "There has been an error.  Here some thoughts on the error that occured:",
          err
        )
      );
  };
  return (
    <div>
      <BreadCrumb name="Contact Us" />
      <div class="container">
        <div class="page-header">
          <h1>Contact Us</h1>
        </div>

        <div class="row">
          <div class="col-sm-8">
            <p class="lead">
              {!formSubmitSuccessful ? (
                <> Submit a question or comment to LoadDispatch&reg; support.</>
              ) : (
                <h2>Thank You! Your submission was sent.</h2>
              )}
            </p>
          </div>

          <div class="col-sm-4">
            <address>
              <strong>LoadDispatch</strong>
              <br />
              52A Ikorodu Road Jibowu,Lagos.
              <br />
              Nigeria
            </address>

            <p>
              <a href="tel:">
                <i class="fa fa-phone"></i>
              </a>
              <br />
            </p>
          </div>
        </div>

        <hr />
        {!formSubmitSuccessful && (
          <form onSubmit={handleSubmit(onSubmitContactForm)}>
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group ">
                  <label for="name">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="FullName"
                    id="FullName"
                    maxlength="150"
                    required
                    {...register("FullName")}
                  />
                  <span
                    class="glyphicon form-control-feedback"
                    aria-hidden="true"
                  ></span>
                  <div class="help-block with-errors"></div>
                </div>

                <div class="form-group has-feedback">
                  <label for="company_name">Company Name</label>
                  <input
                    type="text"
                    class="form-control"
                    required="required"
                    name="CompanyName"
                    id="CompanyName"
                    maxlength="64"
                    {...register("CompanyName")}
                  />
                  <span
                    class="glyphicon form-control-feedback"
                    aria-hidden="true"
                  ></span>
                  <div class="help-block with-errors"></div>
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group has-feedback">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    required="required "
                    class="form-control email"
                    name="Email"
                    id="Email"
                    maxlength="50"
                    data-phoneoremail="true"
                    email
                    {...register("Email")}
                  />
                  <span
                    class="glyphicon form-control-feedback"
                    aria-hidden="true"
                  ></span>
                  <div class="help-block with-errors"></div>
                </div>

                <div class="form-group has-feedback">
                  <label for="phone">Phone</label>
                  <input
                    type="text"
                    class="form-control"
                    name="Phone"
                    id="Phone"
                    maxlength="20"
                    data-phoneoremail="true"
                    required
                    {...register("Phone")}
                  />
                  <span
                    class="glyphicon form-control-feedback"
                    aria-hidden="true"
                  ></span>
                  <div class="help-block with-errors"></div>
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group has-feedback">
                  <label for="timezone">Country</label>
                  <select
                    name="Country"
                    class="form-control"
                    {...register("Country", {
                      required: "Select Country",
                    })}
                    onChange={selectCountry}
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <span
                    class="glyphicon form-control-feedback"
                    aria-hidden="true"
                  ></span>
                  <div class="help-block with-errors"></div>
                </div>

                <div class="form-group has-feedback">
                  <label for="State">State</label>
                  <select
                    name="Region"
                    class="form-control"
                    id="Region"
                    {...register("Region", {
                      required: true,
                    })}
                  >
                    <option value=""> Select Region/State </option>
                    {region.map((item) => (
                      <option value={item.isoCode}>{item.name}</option>
                    ))}
                  </select>
                  <span
                    class="glyphicon form-control-feedback"
                    aria-hidden="true"
                  ></span>
                  <span class="help-block with-errors"></span>
                </div>
              </div>
            </div>

            <hr />

            <div class="row">
              <div class="col-sm-4">
                <div class="form-group has-feedback">
                  <label for="nature_of_question">Nature of Question</label>
                  <select
                    id="NatureOfQuestion"
                    name="NatureOfQuestion"
                    class="form-control"
                    required="required"
                    {...register("NatureOfQuestion")}
                  >
                    <option value="">--Select One--</option>
                    <option value="app_status">
                      Status of Application (3-5 business days to process)
                    </option>
                    <option value="billing">
                      LoadDispatch Billing + Billing Address Change
                    </option>
                    <option value="classifieds_and_resources">
                      Classifieds and Resources
                    </option>
                    <option value="doc_packet">Document Packet</option>
                    <option value="logon_expired">
                      Logon Trouble - Account Expired
                    </option>
                    <option value="logon_password">
                      Logon Trouble - Password Does Not Work
                    </option>
                    <option value="other">Other</option>
                    <option value="other_trouble">
                      Other Trouble Using LoadDispatch.com
                    </option>
                    <option value="suggestions">
                      Suggestions for LoadDispatch.com
                    </option>
                  </select>
                  <span
                    class="glyphicon form-control-feedback"
                    aria-hidden="true"
                  ></span>
                  <div class="help-block with-errors"></div>
                </div>
              </div>
            </div>

            <div class="form-group has-feedback">
              <label for="question">
                <strong>Question/Comment</strong>
              </label>
              <textarea
                rows="6"
                class="form-control"
                name="Question"
                id="Question"
                cols="40"
                required
                {...register("Question")}
              ></textarea>
              <span
                class="glyphicon form-control-feedback"
                aria-hidden="true"
              ></span>
              <div class="help-block with-errors"></div>
            </div>

            <input
              type="submit"
              class="btn btn-primary"
              name="submit"
              id="jsSubmitContactUs"
              value="Send Question or Comment"
              disabled={loading}
              {...(loading && (
                <i
                  className="fa fa-refresh fa-spin"
                  style={{ marginRight: "5px" }}
                />
              ))}
            />
          </form>
        )}
        <hr />

        <div class="modal fade" id="company-search" style={{ display: "none" }}>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span area-hidden="true">&times;</span>
                </button>

                <h3>Select Company</h3>
              </div>
              <div class="modal-body"></div>
              <div class="modal-footer">
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-default"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
