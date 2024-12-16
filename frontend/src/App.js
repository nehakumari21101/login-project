import React from "react";
import ReactDOM from "react-dom/client";
import LoginForm from "./components/LoginForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import Home from "./components/Home"

const Applayout = () => {
  return (
    <>
    <Home/>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path:"/home",
    element: <Applayout/>
  },
  {
    path:"/",
    element: <LoginForm/>
  },
  {
    path:"/login",
    element: <LoginForm/>
  },
  {
    path:"/signup",
    element: <SignupForm/>
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
