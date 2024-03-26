import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import VenderLogin from "./pages/VenderLogin.jsx";
import VenderRegister from "./pages/VenderRegister.jsx";
import VenderDashboard from "./pages/VenderDashboard.jsx";
import store from "./store/store.js";
import Search from "./pages/Search.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/users/login",
        element: <Login />,
      },
      {
        path: "/users/register",
        element: <Register />,
      },
      {
        path: "/users/home",
        element: <Home />,
      },
      {
        path: "/users/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users/logout",
        element: <Login />,
      },
      {
        path: "/users/search",
        element: <Search />,
      },
      {
        path: "/venders/login",
        element: <VenderLogin />,
      },
      {
        path: "/venders/register",
        element: <VenderRegister />,
      },
      {
        path: "/venders/dashboard",
        element: <VenderDashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
