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
          <a className="navbar-brand headerLink" href="#">
            <FontAwesomeIcon className={"mr-2"} icon={faInstagram} />
            Instagram</a>
            {user &&
            <ul className="actionButtons navbar-nav d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link headerLink" to="/">
                  <FontAwesomeIcon className="homePageIcon" icon={faHome} />
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link  className="nav-link headerLink to" to="#">
                  <FontAwesomeIcon icon={faSearch} />
                </Link>
              </li>
              <li className="nav-item">
                {user
                && (
                <Link to="/post/create" className="nav-link headerLink">
                  <FontAwesomeIcon className="createPostIcon" icon={faPlus} />
                </Link>
                )}
              </li>
              <li className="nav-item mr-4">
                {user
                && (
                <Link to="#" className="nav-link headerLink">
                  <FontAwesomeIcon className="likesPostIcon" icon={faHeart} />
                </Link>
                )}
              </li>
            </ul>}
            {user &&
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="headerLink" nav caret>
                  <MenuAvatar image={user.avatar} user={user}/>
                </DropdownToggle>
                <DropdownMenu right className={"dropdown-menu"}>
                  <DropdownItem>
                    <Link to="/profile" className="dropdown-item headerLink">
                      <FontAwesomeIcon className="mr-2 headerLink" icon={faUserAlt} />Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link className="dropdown-item headerLink align-items-baseline" to="/logout">
                    <FontAwesomeIcon className="logoutIcon mr-2 headerLink" icon={faSignOutAlt} />Logout
                  </Link>
                </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>}
          {/*</div>*/}
        </nav>
  );
}

export default Menu;
