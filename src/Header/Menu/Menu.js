import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

function Menu() {
    return (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link header-link" to="/">Home
                    <span className="sr-only">(current)</span>
                </Link>
            </li>
        </ul>
    );
}

export default Menu;