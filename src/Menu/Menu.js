import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome, faSignOutAlt, faPlus, faSearch, faUserAlt
} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { UserContext } from "../context/userContext";
import "./Menu.scss";
import {
  DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown,
} from "reactstrap";
import MenuAvatar from "./MenuAvatar/MenuAvatar";

function Menu() {
  const { user } = useContext(UserContext);

  return (
        <nav className="menu navbar navbar-expand navbar navbar-light align-items-baseline">
          <h2 className="instagramLogo navbar-brand headerLink">
            <FontAwesomeIcon aria-hidden={true} className={"mr-2"} icon={faInstagram} />
            picturama</h2>
            {user &&
            <ul className="actionButtons navbar-nav d-flex align-items-center">
              <li className="nav-item">
                <Link aria-label={"Go to home page"} className="nav-link headerLink" to="/">
                  <FontAwesomeIcon aria-hidden={true} className="homePageIcon" icon={faHome} />
                </Link>
              </li>
              <li className="nav-item">
                <Link aria-label={"Search on this page"} className="nav-link headerLink to" to="/search">
                  <FontAwesomeIcon aria-hidden={true} icon={faSearch} />
                </Link>
              </li>
              <li className="nav-item">
                {user
                && (
                <Link aria-label={"Go to create post page"} to="/post/create" className="nav-link headerLink">
                  <FontAwesomeIcon aria-hidden={true} className="createPostIcon" icon={faPlus} />
                </Link>
                )}
              </li>
              <li className="nav-item mr-4">
                {user
                && (
                <Link to="#" className="nav-link headerLink">
                  <FontAwesomeIcon aria-hidden={true} className="likesPostIcon" icon={faHeart} />
                </Link>
                )}
              </li>
            </ul>}
            {user &&
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle role={"button"} aria-label={"Open user menu"} className="headerLink" nav caret>
                  <MenuAvatar image={user.avatar}/>
                </DropdownToggle>
                <DropdownMenu right className={"dropdown-menu"}>
                  <DropdownItem>
                    <Link aria-label={"Go to profile page"} to={`/profile/${user._id}`} className="dropdown-item headerLink">
                      <FontAwesomeIcon aria-hidden={true} className="mr-2 headerLink" icon={faUserAlt} />Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link aria-label={"Logout user from app"} className="dropdown-item headerLink align-items-baseline" to="/logout">
                    <FontAwesomeIcon aria-hidden={true} className="logoutIcon mr-2 headerLink" icon={faSignOutAlt} />Logout
                  </Link>
                </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>}
        </nav>
  );
}

export default Menu;
