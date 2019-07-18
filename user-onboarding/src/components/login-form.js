import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "./login-form.css";

window.axios = axios;

function LoginForm({ errors, touched, isSubmitting }) {
  // console.log(errors);
  console.log(isSubmitting);
  // console.log(touched);
  return (
    <Form className="login-form">
      <h2>Create User</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <Field
          autoComplete="off"
          type="text"
          id="first_name"
          name="firstName"
          className={errors.firstName ? "invalid" : ""}
          // defaultValue="john"
        />
        <p className="error-text">
          {touched.firstName && errors.firstName}
        </p>
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <Field
          autoComplete="off"
          type="text"
          id="last_name"
          name="lastName"
        />
        <p className="error-text">
          {touched.lastName && errors.lastName}
        </p>

        <label className="formLabel" htmlFor="email">Email</label>
        <Field
          autoComplete="off"
          type="email"
          id="email"
          name="email"
        />
        <p className="error-text">
          {touched.email && errors.email}
        </p>

        <label className="formLabel" htmlFor="address">Address</label>
        <Field
          autoComplete="off"
          type="text"
          id="address"
          name="address"
        />
        <p className="error-text">
          {touched.address && errors.address}
        </p>

        <label className="formLabel" htmlFor="city">City</label>
        <Field
          autoComplete="off"
          type="text"
          id="city"
          name="city"
        />
        <p className="error-text">
          {touched.city && errors.city}
        </p>

        <label className="formLabel" htmlFor="state">State</label>
        <Field
          autoComplete="off"
          type="text"
          id="state"
          name="state"
        />
        <p className="error-text">
          {touched.state && errors.state}
        </p>

        <label className="formLabel" htmlFor="zip">Zip Code</label>
        <Field
          autoComplete="off"
          type="text"
          id="zip"
          name="zip"
        />
        <p className="error-text">
          {touched.zip && errors.zip}
        </p>

        <div className="termsCheck">
        <label htmlFor="terms">I accept the terms of service</label>
        <Field
          className="field"
          autoComplete="off"
          type="checkbox"
          id="terms"
          name="terms"
          value='terms'
      
        /> 
        </div>
        <p className="error-text">
          {errors.terms}
        </p>

      </div>
      {isSubmitting && <p>Loading...</p>}
      <button
        className="submit-button"
        disabled={isSubmitting}
      >
        Submit &rarr;
      </button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: () => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      check: false
    };
  },
  handleSubmit: (values, formikBag) => {
    formikBag.resetForm();
    console.log("FORM SUCCESSFULLY SUBMITTED");
    const url = "https://reqres.in/api/users";
    formikBag.setSubmitting(true);
    axios.post(url, values).then(response => {
      console.log(response.data);
      window.alert(
        "Form submitted " + response.data.firstName
      );
      formikBag.setSubmitting(false);
    });
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(
        3,
        "First Name should be at least 5 characters long"
      )
      .max(15, "First Name must be at most 15 characters long")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(3, "Last Name must be at least 3 characters long")
      .max(15, "Last Name must be at most 15 characters long")
      .required("Last Name is required"),
    email: Yup.string()
      .min(8, "Email must be at least 8 characters long")
      .max(30, "Email must be at most 30 characters long")
      .required("Email is required"),
    terms: Yup.boolean()
      .oneOf([true], 'Must Accept Terms of Service')
      .required('Must Accept Terms of Service'),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters long")
      .max(50, "Address must be at most 50 characters long"),    
    city: Yup.string()
      .min(4, "City must be at least 4 characters long")
      .max(40, "City must be at most 40 characters long"),
    state: Yup.string()
      .min(2, "State must be at least 2 characters long")
      .max(20, "State must be at most 20 characters long"),
    zip: Yup.string()
      .min(5, "State must be at least 5 characters long")
      .max(10, "State must be at most 10 characters long"),
  })
})(LoginForm);
