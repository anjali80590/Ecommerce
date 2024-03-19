import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Baseurl from "../BaseUrl/BaseUrl";
function SignUp() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  const validateForm = () => {
    const { name, email, password } = userDetails;
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${Baseurl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      setIsSubmitting(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", userDetails.email);
        toast.success("Sign Up Succesfully");
        navigate("/verify-email");
      } else {
        if (response.status === 400) {
          toast.error("User already exists");
        } else {
          toast.error("Registration failed");
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("There was an error registering the user");
      console.error("There was an error registering the user:", error);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <header>
        <Navigation />
      </header>
      <main>
        <section className="signup-section">
          <div className="heading">Create your Account</div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                placeholder="Enter "
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="Enter  "
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                placeholder="Enter "
                required
              />
            </div>

            <button
              type="submit"
              className="signup-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wait..." : "Create Account"}
            </button>
          </form>

          <div className="login-link">
            Have an Account? <a href="/login">LOGIN</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
