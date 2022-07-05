import axios from "axios";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { yupResolver } from 'react-hook-form-resolvers';
import * as Yup from "yup";

import { useStateMachine } from "little-state-machine";
import { Country, State } from "country-state-city";

import BreadCrumb from "../../components/banner/breadcrumb";
import updateAction from "../../context/updateAction";
import { API_URL, LOG_IN } from "../../constants";
import { getError } from "../../utils/error";
import "./register.css";
import LoadingBox from "../../components/message/LoadingBox";

function Register() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [formStep, setFormStep] = useState(0);
  const { actions, state } = useStateMachine({ updateAction });

  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState([]);
  const [value, setValue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Paystack");
  const [currency, setCurrency] = useState("NGN");

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    FullName: Yup.string().required("Fullname is required"),
    Phone: Yup.string()
      .required("Phone is required")
      .min(6, "Email must be at least 6 characters")
      .max(20, "Email must not exceed 20 characters"),
    Email: Yup.string().required("Email is required").email("Email is invalid"),
    Password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    ConfirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("Password"), null], "Confirm Password does not match"),
    AcceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

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

  const {
    register,
    formState: { errors },
    handleSubmit: handleCompany,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handlePersonal,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubscribe,
  } = useForm();
  const {
    register: register4,
    formState: { errors: errors4 },
    handleSubmit: handleFinish,
  } = useForm();
  //{   resolver: yupResolver(validationSchema),
  // }
  const password = useRef({});
  password.current = watch("password", "");

  const completeFormStep = () => {
    setFormStep((currentStep) => currentStep + 1);
  };
  const goBack = () => {
    setFormStep((currentStep) => currentStep - 1);
  };

  function onChange(event) {
    setValue(event.target.value);
    state.companyUser.Specilaization =
      event.target.options[event.target.selectedIndex].text;
    console.log(
      "value:",
      event.target.options[event.target.selectedIndex].text
    );
  }

  // Messages
  const required = "This field is required";
  const maxLength = "Your input exceed maximum length";

  // Error Component
  const errorMessage = (error) => {
    return (
      <p class="invalid-feedback" style={{ color: "red" }}>
        {error}
      </p>
    );
  };

  const onSubmitCompany = (data) => {
    actions.updateAction(data);
    completeFormStep();
    // props.history.push("./step2");
  };

  const onSubmitPersonal = (data) => {
    actions.updateAction(data);
    completeFormStep();
    // props.history.push("./step2");
  };
  const onSubmitSubscribe = async (data) => {
    actions.updateAction(data);
    state.companyUser.PaymentMethod = paymentMethod;
    state.companyUser.Currency = currency;
    state.companyUser.CompanyType = data.RoleType;

    setLoading(true);
    setDisabled(true);
    try {
      const res = await axios.post(`${API_URL}auth/signup`, state.companyUser);

      if (res) {
        setLoading(false);
        setDisabled(false);
        // history.push(LOG_IN);
        completeFormStep();
        //  window.open(LOG_IN, "_blank");

        // window.location.href = LOG_IN;
      }
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
    // props.history.push("./step2");
  };

  return (
    <div>
      <BreadCrumb name="Register" />
      <section id="history" class="space-top">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 history-block">
              <h2>Sign Up Now</h2>
              <p>
                New users can enjoy LoadDispatch for 30-days at no-charge. After
                that, you hereby authorize LoadDispatch to charge you
                automatically every month until you cancel your subscription.
                After your application is accepted, we will contact you with a
                password. All fields marked with * are required..
              </p>

              <p>
                While LoadDispatch® is not a shipping company, we connect you to
                over 13,000 carriers ready to transport your vehicle. In
                addition, we provide access to Nigeria. DOT license information,
                insurance information and ratings for carriers as well as an
                online dispatching system to make dispatching faster and easier.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" class="space bg-color">
        <div class="container">
          {formStep === 0 && (
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <h3>Pricing Information</h3>
                <ul>
                  <li>
                    Use LoadDispatch<sup>&reg;</sup> for{" "}
                    <strong>30-days</strong> at no-charge.
                  </li>
                  <li>
                    After 30-days, you can continue to use. Plans start as low
                    as
                    <strong>
                      <span id="startingPrice">$79.95</span>/month
                    </strong>{" "}
                    plus tax for Shippers.
                  </li>
                  <li>
                    Carriers can get premium access for{" "}
                    <b>
                      <span id="unlimitedPrice">$99.95</span>/month
                    </b>{" "}
                    plus tax.
                  </li>
                  <li>
                    There is no obligation to continue membership and you will
                    not be charged until you sign up.
                  </li>
                </ul>
              </div>
              <div class="col-md-6 col-xs-12">
                <h3>Important Notice!</h3>
                <p>
                  If you have previously had an account, please{" "}
                  <a href="/contact-us">contact us</a> so that we can verify
                  your information and expedite your application.
                </p>
              </div>
            </div>
          )}
          {/* {loading && <LoadingBox/>} */}
          <div class="row">
            <div class="col-sm-12 about-block">
              <div className="col-sm-12">
                {formStep === 0 && (
                  <form onSubmit={handleCompany(onSubmitCompany)}>
                    <section id="Company">
                      <h3>Tell us about your company</h3>
                      <hr />

                      <div className="form-group col-sm-4">
                        <select
                          name="RoleType"
                          class="form-control"
                          id="RoleType"
                          {...register("RoleType", {
                            required: "* Please describe your business",
                          })}
                          onChange={onChange}
                          required="required"
                        >
                          <option value="">
                            {" "}
                            Please describe your business{" "}
                          </option>
                          <option value="carrier">Carrier </option>
                          <option value="shipper">Auction</option>
                          <option value="carrier">Corp. Relocation</option>
                          <option value="broker">Broker</option>
                          <option value="broker">Rental Agency</option>
                          <option value="shipper">Salvage</option>
                          <option value="broker">Dealer</option>
                          <option value="shipper">Manufacturer</option>
                          <option value="shipper">Import/Export</option>
                        </select>

                        <input
                          id="Role"
                          name="Role"
                          type="hidden"
                          value={value}
                          // ref={rolesRef}
                          {...register("Role")}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Company Name"
                          name="CompanyName"
                          {...register("CompanyName", {
                            maxLength: 100,
                          })}
                        />
                      </div>

                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Company Address"
                          name="CompanyAddress"
                          {...register("CompanyAddress")}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Contact Phone"
                          name="ContactPhone"
                          {...register("ContactPhone")}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control email"
                          type="email"
                          required="required "
                          placeholder="* Company Email"
                          name="ContactEmail"
                          {...register("ContactEmail")}
                        />
                      </div>

                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="url"
                          placeholder="http://your domain name"
                          name="Website"
                          {...register("Website")}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <select
                          name="Country"
                          class="form-control"
                          {...register("Country", {
                            required: "Select Country",
                          })}
                          onChange={selectCountry}
                        >
                          <option value="">Select Country</option>
                          {countries.map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group col-sm-4">
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
                      </div>

                      <div className="col-sm-12">
                        <div className="form-group row.center ">
                          <input
                            className="btn btn-primary  "
                            type="submit"
                            value="Continue"
                          />
                        </div>
                      </div>
                    </section>
                  </form>
                )}

                {formStep === 1 && (
                  <form onSubmit={handlePersonal(onSubmitPersonal)}>
                    <section id="Personal">
                      <h3>Contact Information</h3>
                      <hr />
                      <div className="form-group col-sm-4">
                        <input
                          className={`form-control ${
                            errors2.FullName ? "is-invalid" : ""
                          }`}
                          type="text"
                          placeholder="* Full Name"
                          required="required "
                          name="FullName"
                          {...register2("FullName")}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className={`form-control ${
                            errors2.Phone ? "is-invalid" : ""
                          }`}
                          type="tel"
                          placeholder="* Mobile number"
                          required="required "
                          name="Phone"
                          {...register2("Phone")}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className={`form-control ${
                            errors2.Email ? "is-invalid" : ""
                          }`}
                          type="email"
                          required="required "
                          placeholder="* Email"
                          name="Email"
                          {...register2("Email")}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className={`form-control ${
                            errors2.Password ? "is-invalid" : ""
                          }`}
                          type="password"
                          placeholder="* Password"
                          name="Password"
                          {...register2("Password")}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className={`form-control ${
                            errors2.ConfirmPassword ? "is-invalid" : ""
                          }`}
                          type="password"
                          placeholder="* Confirm Password"
                          name="ConfirmPassword"
                          {...register2("ConfirmPassword")}
                        />
                        {errorMessage(errors2.ConfirmPassword?.message)}
                      </div>

                      {/* onChange=
                      {(e) => {
                        const value = e.target.value;
                        if (value !== password)
                          return clearError("confirmPassword");
                        setError(
                          "confirmPassword",
                          "notMatch",
                          "passwords not mutch"
                        );
                      }} */}
                      <div className="form-group col-sm-12">
                        <textarea
                          className="form-control"
                          type="text"
                          placeholder="Address"
                          name="Address"
                          {...register2("Address")}
                        />
                      </div>
                      <div className="form-group col-sm-4 accept">
                        <input
                          name="AcceptTerms"
                          type="checkbox"
                          className={`form-check-input ${
                            errors2.AcceptTerms ? "is-invalid" : ""
                          }`}
                          style={{ paddingRight: "20px" }}
                          {...register2("AcceptTerms")}
                        />
                        <label
                          htmlFor="acceptTerms"
                          className="form-check-label"
                        >
                          I have read and agree to the Terms
                        </label>
                        {errorMessage(errors2.AcceptTerms?.message)}
                      </div>
                      {/* <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="datetime"

                          placeholder="Date of Birth"
                          name="DateofBirth"
                          {...register("DateofBirth", {
                            pattern:
                              /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i,
                          })}
                        />
                        {errors.DateofBirth &&
                          errorMessage(
                            "Please use the following format MM/DD/YYYY"
                          )}
                      </div> */}
                      <div class="row">
                        <div className="col-sm-9">
                          <input
                            className="btn btn-primary  "
                            type="button"
                            value="Back"
                            onClick={goBack}
                          />
                        </div>
                        <div class="col-sm-3 action-block text-right ">
                          <input
                            className="btn btn-primary  "
                            type="submit"
                            value="Continue"
                          />{" "}
                        </div>
                      </div>
                    </section>
                  </form>
                )}

                {formStep === 2 && (
                  <form onSubmit={handleSubscribe(onSubmitSubscribe)}>
                    <section id="Subscription">
                      <div class="row">
                        <div class="col-md-6 col-xs-6">
                          <h3>Subscription Information</h3>
                          <hr />
                          <p>
                            <b> Hello {state.companyUser.FullName}</b>
                            <br />
                            Thanks for your interest in our service.You have a
                            one month free subscription.
                            <br />
                            Kindly select preferred payment method to complete
                            your subscription.{" "}
                          </p>
                        </div>
                        <div class="col-md-6 col-xs-6 ">
                          {" "}
                          <div>
                            <h3>Payment Method</h3>
                          </div>
                          <div className="payment">
                            <label>PayStack</label>
                            <input
                              type="radio"
                              id="paystack"
                              value="PayStack"
                              name="rdlpaymentMethod"
                              checked
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                          </div>
                          <div className="payment">
                            <label>Stripe</label>
                            <input
                              type="radio"
                              id="stripe"
                              value="Stripe"
                              name="rdlpaymentMethod"
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                          </div>
                          <div className="payment">
                            <label>PayPal</label>
                            <input
                              type="radio"
                              id="paypal"
                              value="PayPal"
                              name="rdlpaymentMethod"
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                          </div>
                          <div>
                            <h3>Currency</h3>
                            <label>NGN</label>{" "}
                            <input
                              type="radio"
                              id="Currency"
                              value="NGN"
                              name="rdlCurrency"
                              checked
                              onChange={(e) => setCurrency(e.target.value)}
                            ></input>
                            <label>USD</label>{" "}
                            <input
                              type="radio"
                              id="Currency"
                              value="USD"
                              name="rdlCurrency"
                              onChange={(e) => setCurrency(e.target.value)}
                            ></input>
                          </div>
                        </div>
                      </div>

                      <hr />

                      <div className="col-sm-6">
                        <input
                          className="btn btn-primary  "
                          type="button"
                          value="Back"
                          onClick={goBack}
                        />
                      </div>
                      <div class="col-sm-6 text-right ">
                        {loading ? (
                          <button
                            type="submit"
                            class="btn  btn-primary"
                            disabled={disabled}
                          >
                            {" "}
                            <i className="fa fa-spinner fa-spin"></i>
                            &nbsp; Processing...{" "}
                          </button>
                        ) : (
                          <button
                            type="submit"
                            class="btn  btn-primary"
                            disabled={disabled}
                          >
                            Submit{" "}
                          </button>
                        )}
                      </div>
                    </section>
                  </form>
                )}

                {formStep === 3 && (
                  <section id="Thanks">
                    <div class="row">
                      <div class="col-md-6 col-xs-6">
                        <h3>You are done</h3>
                        <hr />
                        <p>
                          <h4>
                            <b> Hello {state.companyUser.FullName}</b>
                            <br />
                            Your Registration is completed.
                          </h4>
                          <br />
                          if not redirected to your personal login restriceted
                          area Kindly <a href={LOG_IN}>click</a> to access.
                        </p>
                      </div>
                      <div class="col-md-6 col-xs-6 "> </div>
                    </div>

                    <hr />
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="action">
        <div class="container">
          <div class="row">
            <div class="col-sm-9 action-block">
              <h2 class="title">Do you need a Carrier to lift your cargo?</h2>
            </div>
            <div class="col-sm-3 action-block text-right ">
              <a
                href="/register"
                class="sppb-btn sppb-btn-default sppb-btn-right"
              >
                Sign UP
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
