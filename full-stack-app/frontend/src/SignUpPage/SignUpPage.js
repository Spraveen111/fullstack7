import React, { useState } from "react";
import "./signup.css";
import { useNavigate,Outlet, Link } from "react-router-dom";


export default function SignUpPage() {
  const [signupData, setSignupData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
    setError("");
  };

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !signupData.name ||
      !signupData.phoneNumber ||
      !signupData.email ||
      !signupData.password
    ) {
      setError("All Fields are Required");
      return;
    }

    if (!/^\d+$/.test(signupData.phoneNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!signupData.email.includes("@")) {
      setError("Valid email Required");
      return;
    }

    if (signupData.password.length <= 5) {
      setError("Password should be greater than 5 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:3820/signupDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      console.log("Response data from backend:", data);
      if (data.message === "Succesfully inserted") {
        navigate("/signin");
      }
      // Optionally handle success response here, e.g., redirect to login page
    } catch (error) {
      console.error("Fetch error:", error.message);
      setError("Failed to communicate with the server.");
    }
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-container-image">
          <h1>Sign Up</h1>
        </div>
        <div className="input-container">
          <label className="label-element-name">Name</label>
          <input
            className="input-element"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="input-container">
          <label className="label-element-phone">Phone Number</label>
          <input
            className="input-element"
            type="text"
            placeholder="Phone Number"
            onChange={handleChange}
            name="phoneNumber"
          />
        </div>
        <div className="input-container">
          <label className="label-element-email">Email</label>
          <input
            className="input-element"
            type="text"
            placeholder="Email"
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="input-container">
          <label className="label-element-password">Password</label>
          <input
            className="input-element"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <button className="button-css" type="submit">
            Sign Up
          </button>
          <Link to="/signin">
            <button className="button-css">Sign In</button>
          </Link>
        </div>
      </form>
      <Outlet />
    </div>
  );
}
