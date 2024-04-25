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
import store from "./store/store.js";
import Search from "./pages/Search.jsx";
import VendorHome from "./pages/VendorHome.jsx";
import VendorList from "./pages/VendorList.jsx";
import Booking from "./pages/Booking.jsx";
import VDashboard from "./pages/VDashboard.jsx";
import VendorAllListing from "./pages/VendorAllListing.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import VAbout from "./pages/VAbout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", // This is the default route for the root URL
        element: <Login />,
      },
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
        path: "/users/about",
        element: <AboutPage />,
      },
      {
        path: "/users/uDashboard",
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
        path: "/users/booking",
        element: <Booking />,
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
        path: "/vendors/vDashboard",
        element: <VDashboard />,
      },
      {
        path: "/vendors/logout",
        element: <VendorLogin />,
      },
      {
        path: "/vendors/allListing",
        element: <VendorAllListing />,
      },
      {
        path: "/vendors/about",
        element: <VAbout />,
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
