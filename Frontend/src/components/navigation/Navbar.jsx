import React from "react";
import { NavLink } from "react-router-dom";

//services
import authorization from "../../services/authorization";

// styles
import '../styles/Navbar.css'

function NavBar() {

    const nav_links = [{
        title: "Barbers",
        link: '/users/barbers'
    }]


    const rightSection = authorization.isAuthorizied() ?
        <>
            {/*
TODO: Pass the notifications functions*/}

            <div className="d-flex align-items-center">
                <div className="dropdown">
                    <NavLink
                        className="text-reset me-3 dropdown-toggle hidden-arrow"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="fas fa-bell"></i>
                        <span className="badge rounded-pill badge-notification bg-danger">1</span>
                    </NavLink>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuLink"
                    >
                        <li>
                            <NavLink className="dropdown-item" >Something else here</NavLink>
                        </li>
                    </ul>
                </div>

                <div className="dropdown">
                    <NavLink className="dropdown-toggle d-flex align-items-center hidden-arrow nav-link"
                        id="navbarDropdownMenuAvatar"
                        role="button"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="https://cdn.vectorstock.com/i/preview-1x/53/48/trendy-barber-man-vector-35975348.jpg"
                            className="rounded-circle"
                            height="25"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                        />
                    </NavLink>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuAvatar"
                    >
                        <li>
                            <NavLink className="dropdown-item" to='/me'>My profile</NavLink>
                        </li>
                        <li>
                            <NavLink className="dropdown-item" to='/settings'>Settings</NavLink>
                        </li>

                        <li>
                            <NavLink className="dropdown-item" onClick={e => authorization.Logout(e)}>Logout</NavLink>
                        </li>
                    </ul>
                </div>

            </div>
        </>
        :

        <>
            <NavLink className="nav-link" to='/login'>Login</NavLink>
        </>


    return <>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">

                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <NavLink className=" navbar-toggle navbar-brand mt-2 mt-lg-0 home-title" to='/'>
                        {/*
                   TODO: Add image of the logo
                    <img
                        src="CutCornerMainLogo.png"                        
                        height="15"
                        alt="Home"
                        loading="lazy"
/>*/}
                        HOME
                    </NavLink>

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {nav_links.map((linkItem) => (
                            <li className="nav-item" key={linkItem.link}>
                                <NavLink className="nav-link" to={linkItem.link}>{linkItem.title}</NavLink>
                            </li>
                        ))}
                    </ul>

                </div>

                {rightSection}

            </div>

        </nav>
    </>

}

export default NavBar;