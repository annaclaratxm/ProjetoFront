import { Link } from "react-router-dom";
import "./style.css";

export default function Navbar() {
    return (
        <>
        <div className="container-navbar">
            <span className="navbar-text">Navbar</span>
            <span className="navbar-items"><Link to={'/app/home'}>Início</Link></span>
            <span className="navbar-items"><Link to={'/app/users'}>Usuários</Link></span>
            <span className="navbar-items"><Link to={'/app/services'}>Serviços</Link></span>
        </div>
        </>
    )   
}