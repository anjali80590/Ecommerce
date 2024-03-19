import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../Navigation/Navigation";
import "./Login.css";
import Baseurl from "../BaseUrl/BaseUrl";
function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setLoginDetails({
      ...loginDetails,
      showPassword: !loginDetails.showPassword,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${Baseurl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      if (response.ok) {
        setIsSubmitting(false);
        const data = await response.json();
        localStorage.setItem("token", data.token);
        toast.success("Login Successfully");
        navigate("/protected-page");
      } else if (response.status === 400) {
        const responseData = await response.json();
        if (responseData.message === "Please verify your email first.") {
          toast.error("Email not verified.");
        } else if (responseData.message === "Password mismatch.") {
          toast.error("Password mismatch.");
        }
      } else {
        setIsSubmitting(false);
        toast.error("Email or password incorrect");
      }
    } catch (error) {
      console.error("There was a problem with your login operation:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <Navigation />
      <div className="login-container">
        <ToastContainer />
        <div className="login-section">
          <h2>Login</h2>
          <div className="pt">
            <div className="h2">Welcome back to ECOMMERCE</div>
            <div className="small">The next gen business marketplace</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginDetails.email}
                onChange={handleInputChange}
                placeholder="Enter"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={loginDetails.showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={loginDetails.password}
                onChange={handleInputChange}
                placeholder="Enter"
                required
              />
              <button
                type="button"
                className="show-password"
                onClick={toggleShowPassword}
              >
                {loginDetails.showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* <button type="submit" className="login-btn">
              LOGIN
            </button> */}
            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? "WAIT..." : "LOGIN"}
            </button>
          </form>
          <hr className="hr"/>
          <div className="signup-link">
            Don't have an Account? <Link to="/">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
