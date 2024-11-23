import { useState } from "react";
import { handleError } from "../utils";
import { handleSuccess } from "../utils";

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  let handleInputChange = (event) => {
    let fieldName = event.target.name;
    let newValue = event.target.value;

    setLoginInfo((currData) => {
      currData[fieldName] = newValue;
      return { ...currData };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log(loginInfo);
    setLoginInfo({
      username: "",
      password: "",
    });
    try {
      const url = "http://localhost:8080/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="contents">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="input-label">
            What's your e-mail?
          </label>
          <input
            type="text"
            className="input input-text"
            name="username"
            placeholder="Enter your username"
            value={loginInfo.username}
            onChange={handleInputChange}
            required
          />

          <br />

          <label htmlFor="password" className="input-label">
            Your password
          </label>
          <input
            type="password"
            className="input input-pass"
            name="password"
            value={loginInfo.password}
            placeholder="Enter your password"
            onChange={handleInputChange}
            required
          />

          <button className="button ">Login</button>
          {/* <p className="right">
            <a href="/signup">Forgot Your Password?</a>
          </p> */}
          <p className="right">
            Don't have an account?
            <a href="/signup">Signup</a>
          </p>
        </form>

        {/* <Link></Link> */}
      </div>

      {/* <form action="/submit_login" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required/>
    
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required/>
    
            <button type="submit">Login</button>
        </form> */}
    </div>
  );
};

export default LoginForm;
