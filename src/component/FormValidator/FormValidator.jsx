import React, { useState } from "react";
import "./FormValidator.css";

function FormValidator() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    npiNumber: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    telephoneNumber: "",
    emailAddress: "",
  });

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSubmitError("");
    const formErrors = validate({ ...formData, [name]: value });
    setErrors(formErrors);
  };

  const validate = (fields) => {
    const errors = {};
    if (fields.zipcode && !/^\d{5}(-\d{4})?$/.test(fields.zipcode)) {
      errors.zipcode =
        "Invalid ZIP code format Enter Either 5 Digits or 5 digits - 4 digits";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate(formData);
    if (Object.keys(formErrors).length === 0) {
      console.log(formData);
      alert("Registration Submitted");
    } else {
      const errorMessages = Object.values(formErrors)
        .filter(Boolean)
        .join(", ");
      setSubmitError(
        `Please correct the following errors before submitting: ${errorMessages}`
      );
    }
  };

  return (
    <div className="form mx-auto">
      <form onSubmit={handleSubmit} className="col-md-8 mx-auto">
        <h2 className="text-center">Healthcare Provider Registration</h2>

        <div className="form-group">
          <label htmlFor="firstName">FirstName</label>
          <input
            className="form-control"
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">NPI Number</label>
          <input
            type="text"
            id="npiNumber"
            className="form-control"
            name="npiNumber"
            value={formData.npiNumber}
            onChange={handleChange}
            placeholder="NPI Number"
            required
          />
        </div>
        <div className="container-fluid mx-0 p-0">
          <label htmlFor="">Business Address</label>
          <div className="row">
            <div className="form-group col-md-3">
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                value={formData.city}
                onChange={handleChange}
                placeholder="St. Adreess"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <select
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select a State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-3">
              <input
                type="text"
                className="form-control"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                placeholder="Zipcode"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="telnumber">Telephone Number</label>
          <input
            type="tel"
            id="telnumber"
            className="form-control"
            name="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={handleChange}
            placeholder="Telephone Number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
        </div>
        {submitError && (
          <div className="alert alert-danger mt-5" role="alert">
            {submitError}
          </div>
        )}
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <button type="submit" className="btn btn-md btn-primary">
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormValidator;
