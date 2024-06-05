import { Link } from "react-router-dom";
import "./style.css";

export default function Navbar() {
    return (
        <>
        <div className="container-navbar">
            <span className="navbar-text">Navbar</span>
            <span className="navbar-items">Início</span>
            <span className="navbar-items">Usuários</span>
            <span className="navbar-items">Serviços</span>
        </div>
        </>
    )
}