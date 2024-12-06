import React from "react";
import { useCart } from "./CartProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { sum } from "../utils";


export const NavBar = ({ screen }) => {

    const { cart } = useCart();

    return (
        <div className="main-container">
            <nav className={`navbar navbar-expand-lg`}>
                <div className="container">
                    <img src='vite.svg' width="40" height="auto" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ marginLeft: "15px", justifyContent: "space-between" }}>
                        <ul className="navbar-nav mr-auto justify-content-center flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/more">Productos</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item navbar-btn-container">
                                <Link className="bi bi-bag navbar-btn shopping-cart-icon" bag-items={`${sum(cart, 'cantidad')}`} to="/cart"></Link>
                            </li>
                            <li className="nav-item navbar-btn-container">
                                <Link className="bi bi-person-fill navbar-btn login-icon" to="/login"></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {screen}
        </div>
    )
}