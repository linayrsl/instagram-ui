import React from "react";
import Menu from "./Menu/Menu";
import { Link } from "react-router-dom";
import {UserContext} from "../context/userContext";

import "./Header.scss";

function Header() {
    return (
        <UserContext.Consumer>
            {(user) => {
                return (
                    <nav className="navbar navbar-expand-lg navbar navbar-light colorHeader">
                        <a className="navbar-brand" href="#">Instagram</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <Menu />
                            <div className="form-inline my-2 my-lg-0">
                                {!user && <>
                                    <Link to={"/register"} className={"nav-link header-link"}>Register</Link>
                                    <Link to={"/login"} className={"nav-link header-link"}>Login</Link>
                                </>}
                                {user && <>
                                    <Link to={"/post/create"} className={"nav-link header-link"}>Create post</Link>
                                    <span>Hello, {user.username}!</span>
                                    <Link to={"/logout"}>Logout</Link>
                                </>}
                            </div>
                        </div>
                    </nav>
                );
            }}
        </UserContext.Consumer>

    );
}

export default Header;