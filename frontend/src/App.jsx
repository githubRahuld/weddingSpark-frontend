import "./App.css";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components/index";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
