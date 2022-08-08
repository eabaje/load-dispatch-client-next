import axios from "axios";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { yupResolver } from 'react-hook-form-resolvers';
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStateMachine } from "little-state-machine";
import { Country, State } from "country-state-city";
import ImageUpload from "../../components/upload/uploadImage";
import BreadCrumb from "../../components/banner/breadcrumb";
import CustomButton from "../../components/button/customButton";
import updateAction from "../../context/updateAction";
import { API_URL, LOG_IN } from "../../constants";
import { getError } from "../../utils/error";

import LoadingBox from "../../components/message/LoadingBox";
import { fetchData } from "../../helpers/query";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

function DriverRegister({ query }) {
  const { companyId } = query;

  const [formStep, setFormStep] = useState(0);
  const { actions, state } = useStateMachine({ updateAction });

  const [region, setRegion] = useState([]);
  //  const [value, setValue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Paystack");
  const [currency, setCurrency] = useState("NGN");

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();

  const [IsEdit, setEdit] = useState(false);
  const [country, setCountry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [countries, setCountries] = useState([]);
  const [pickUpRegion, setPickUpRegion] = useState([]);
  const [picFile, setpicFile] = useState(null);
  const [docFile, setdocFile] = useState(null);
  const [docUrl, setdocUrl] = useState(null);
  const [doc, setdoc] = useState(null);
  const [url, setUrl] = useState(null);
  const [selPickUpRegion, setselpickUpRegion] = useState("");
  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  const onChangePicHandler = async (e) => {
    setpicFile((picFile) => e.target.files[0]);
  };
  console.log(`picFile`, picFile);

  const onChangeDocHandler = async (e) => {
    setdocFile((docFile) => e.target.files[0]);
  };

  const selectPickUpCountry = async (e) => {
    setCountry((country) => e.target.value);

    setPickUpRegion(
      (pickUpRegion) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (pickUpRegion = State.getStatesOfCountry(e.target.value))
    );
  };

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
    // alert(companyId);
    setCountries((countries) => (countries = Country.getAllCountries()));

    fetchData(
      "user/findCompany",
      companyId
    )((company) => {
      //  console.log(`shipment`, shipment);
      setCompanyName(company.CompanyName);
    })((err) => {});
  }, [companyId]);

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
    handleSubmit,
    setValue,
    control,
  } = useForm();

  //{   resolver: yupResolver(validationSchema),
  // }
  const password = useRef({});
  //password.current = watch("password", "");

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

  const onSubmit = async (form) => {
    // actions.updateAction(data);
    // state.companyUser.PaymentMethod = paymentMethod;
    // state.companyUser.Currency = currency;
    // state.companyUser.CompanyType = data.RoleType;
    const data = new FormData();

    data.append("CompanyId", form.CompanyId);
    data.append("DriverName", form.DriverName);
    data.append("Email", form.Email);
    data.append("Phone", form.Phone);
    data.append("DOB", form.DOB);
    data.append("Address", form.Address);
    data.append("City", form.City);
    data.append("Region", form.Region);
    data.append("Country", form.Country);
    data.append("LicenseNo", form.LicenseNo);
    data.append("Password", form.Password);
    data.append("filePicUrl", picFile);
    data.append("fileLicenseUrl", docFile);

    // if (file1 !== null) data.append("filePicUrl", file1);
    // if (file2 !== null) data.append("fileLicenseUrl", file2);
    setLoading(true);
    setDisabled(true);
    try {
      const res = await axios.post(`${API_URL}driver/create`, data);

      if (res) {
        setLoading(false);
        setDisabled(false);
        toast.success(res.data.message);
        // history.push(LOG_IN);

        //  window.open(LOG_IN, "_blank");

        // window.location.href = LOG_IN;
      }
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
    // props.history.push("./step2");
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div className="input-group mb-3">
        <input
          ref={ref}
          type="text"
          className="form-control datepicker"
          value={value}
          onClick={onClick}
          placeholder="Click to enter date"
          required
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <i className="fa fa-calendar"></i>
          </span>
        </div>
      </div>
    );
  });
  CustomInput.displayName = "CustomInput";

  return (
    <div>
      <BreadCrumb name="Driver Registration " />

      <section id="about" class="space bg-color">
        <div class="container">
          <div class="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header alert alert-info">
                  <h2>Driver Information Collection Form</h2>
                </div>
                <div className="card-body">
                  <div className="col-md-12 ">
                    <form
                      encType="multipart/form-data"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <input
                        type="hidden"
                        name="CompanyId"
                        value={companyId}
                        className="form-control"
                        {...register("CompanyId")}
                      />
                      <input
                        type="hidden"
                        name="PicUrl"
                        className="form-control"
                        {...register("PicUrl")}
                      />
                      <input
                        type="hidden"
                        name="LicenseUrl"
                        className="form-control"
                        {...register("LicenseUrl")}
                      />
                      <div className="form-group row">
                        <div className="col-md-12 ">
                          <span>
                            {" "}
                            <ImageUpload
                              refId={companyId}
                              fieldName="PicUrl"
                              show={true}
                              onChangePicHandler={onChangePicHandler}
                            />
                          </span>
                        </div>
                        <div className="col-md-2">
                          <span> </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-12">
                          <h5 className="alert alert-info"> </h5>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Company Name
                        </label>

                        <div className="col-sm-4">
                          <input
                            name="CompanyName"
                            className="form-control"
                            readOnly="readonly"
                            value={companyName}
                            placeholder="Company Name"
                            {...register("CompanyName")}
                          />
                        </div>
                        <label className="col-sm-2 col-form-label">
                          Driver Name
                        </label>

                        <div className="col-sm-4">
                          <input
                            name="DriverName"
                            className="form-control"
                            placeholder="Driver Name"
                            {...register("DriverName", {
                              required: true,
                            })}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-4">
                          <input
                            name="Email"
                            className="form-control"
                            placeholder="Email"
                            {...register("Email", {
                              required: true,
                            })}
                            required
                          />
                        </div>

                        <label className="col-sm-2 col-form-label">Phone</label>
                        <div className="col-sm-4">
                          <input
                            name="Phone"
                            className="form-control"
                            placeholder="Phone"
                            {...register("Phone", {
                              required: true,
                            })}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Password
                        </label>
                        <div className="col-sm-4">
                          <input
                            name="Password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            {...register("Password", {
                              required: true,
                            })}
                            required
                          />
                        </div>

                        <label className="col-sm-2 col-form-label">
                          Confirm Password
                        </label>
                        <div className="col-sm-4">
                          <input
                            name="ConfirmPassword"
                            className={`form-control ${
                              errors.ConfirmPassword ? "is-invalid" : ""
                            }`}
                            type="password"
                            placeholder="Confirm Password"
                            {...register("ConfirmPassword", {
                              required: true,
                            })}
                          />
                          {errorMessage(errors.ConfirmPassword?.message)}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">DOB</label>
                        <div className="col-sm-4">
                          <input
                            type="date"
                            class="form-control"
                            required
                            {...register("DOB")}
                          />
                        </div>

                        <label className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-4">
                          <input
                            name="Phone"
                            className="form-control"
                            placeholder="City"
                            {...register("City")}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Country
                        </label>
                        <div className="col-md-4">
                          <select
                            name="Country"
                            className="form-control"
                            {...register("Country")}
                            onChange={selectPickUpCountry}
                          >
                            <option value="">Select Country</option>
                            {countries.map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <label className="col-form-label col-md-2">
                          Region/State
                        </label>
                        <div className="col-md-4">
                          <select
                            name="Region"
                            className="form-control"
                            id="Region"
                            {...register("Region", {
                              required: true,
                            })}
                          >
                            <option value=""> Select Region/State </option>
                            {pickUpRegion.map((item) => (
                              <option
                                key={item.isoCode}
                                selected={selPickUpRegion === item.isoCode}
                                value={item.isoCode}
                              >
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Address
                        </label>
                        <div className="col-md-10">
                          <input
                            name="Address"
                            className="form-control"
                            placeholder="Address"
                            {...register("Address", {
                              required: true,
                            })}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Drivers License No
                        </label>
                        <div className="col-md-4">
                          <input
                            name="LicenseNo"
                            className="form-control"
                            placeholder="License No"
                            {...register("LicenseNo", {
                              required: true,
                            })}
                          />
                        </div>{" "}
                        <label className="col-form-label col-md-2">
                          Attach Drivers License
                        </label>
                        <div className="col-md-4">
                          <input
                            className="form-control"
                            type="file"
                            id="fileLicenseUrl"
                            name="fileLicenseUrl"
                            {...register("fileLicenseUrl")}
                            onChange={(e) => onChangeDocHandler(e)}
                          />
                        </div>
                      </div>

                      <div className="form-group row alert alert-info">
                        <div className="col-md-8 "></div>
                        <div className="col-md-4 "></div>
                      </div>
                      <div className="form-group"></div>

                      <div className="form-group row">
                        <div className="col-sm-12 ">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="invalidCheck"
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="invalidCheck"
                            >
                              I confirm all information entered are accurate
                            </label>
                          </div>
                        </div>
                        <div className="right" style={{ float: "right" }}>
                          <CustomButton loading={loading} isAddMode={"true"} />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

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
                      if not redirected to your personal login restriceted area
                      Kindly <a href={LOG_IN}>click</a> to access.
                    </p>
                  </div>
                  <div class="col-md-6 col-xs-6 "> </div>
                </div>

                <hr />
              </section>
            )}
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

//export default DriverRegister;
export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default dynamic(() => Promise.resolve(DriverRegister), { ssr: false });
