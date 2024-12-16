import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import { handleSuccess } from "../utils";

const SignupForm = () => {

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleInputsChange = (event) => {
    let fieldName = event.target.name;
    let newValue = event.target.value;

    setSignupInfo((currData) => {
      currData[fieldName] = newValue;
      return { ...currData };
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const {name, email,password, phone} = signupInfo;
    if(!name || !email || !password || !phone){
      return handleError("name, email, password, phone are required");
    }
    console.log(signupInfo);
    setSignupInfo({
      name: "",
      email: "",
      password: "",
      phone: "",
    });

    try {
      const url = "http://localhost:8080/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate("/login")
        }, 1000)
      }else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
      console.log(err);
    }
  };

  return (
    <div className="reg-container">
      <h1>Registration Form</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name" className="input-label">
          What's your name?
        </label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          value={signupInfo.name}
          onChange={handleInputsChange}
          required
        />{" "}
        <br />
        <br />
        <label htmlFor="email" className="input-label">
          What's your e-mail?
        </label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          value={signupInfo.email}
          onChange={handleInputsChange}
          required
        />
        <br />
        <br />
        <label htmlFor="password" className="input-label">
          Your password?
        </label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={signupInfo.password}
          onChange={handleInputsChange}
          // required
        />
        <br />
        <br />
        <label htmlFor="phone" className="input-label">
          Phone Number
        </label>
        <br />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Your phone number"
          value={signupInfo.phone}
          onChange={handleInputsChange}
          required
        />
        <br />
        <br />
        <button className="btn-register">Submit</button>
        <a href="/">cancel</a>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default SignupForm;
