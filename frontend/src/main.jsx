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
import VendorLogin from "./pages/VendorLogin.jsx";
import VendorRegister from "./pages/VendorRegister.jsx";
import VendorDashboard from "./pages/VendorHome.jsx";
import store from "./store/store.js";
import Search from "./pages/Search.jsx";
import VendorHome from "./pages/VendorHome.jsx";
import VendorList from "./pages/VendorList.jsx";

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
        path: "/vendors/login",
        element: <VendorLogin />,
      },
      {
        path: "/vendors/register",
        element: <VendorRegister />,
      },
      {
        path: "/vendors/home",
        element: <VendorHome />,
      },
      {
        path: "/vendors/listing",
        element: <VendorList />,
      },
      {
        path: "/vendors/dashboard",
        element: <VendorDashboard />,
      },
      {
        path: "/vendors/logout",
        element: <VendorLogin />,
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
