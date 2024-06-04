import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <>
    <Navbar/>
    <Outlet />
    <p>Footer</p>
    </>
  )
}