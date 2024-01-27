import React, { useEffect, useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
} from "reactstrap";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
function TopBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar
            color="light"
            light
            expand="md"
            className="navbar px-2 px-sm-2 px-lg-5"
        >
            <NavbarBrand href="/home">
                <img src={logo} className="navbar__logo" alt="" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto my-3 d-flex align-items-center" navbar>
                    <NavItem>
                        <Link className="mr-3 navbar__links" to="/home/">
                            Home
                        </Link>
                    </NavItem>

                    <NavItem>
                        <Link className="mr-3 navbar__links" to="/about">
                            About
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link className="mr-3 navbar__links" to="/builder">
                            Builder
                        </Link>
                    </NavItem>
                    {/* <NavItem>
                        <Link className="mr-3 navbar__links" to="/pricing">
                            Pricing
                        </Link>
                    </NavItem> */}
                    <NavItem>
                        <a
                            className=" px-4 py-2  btn-color text-light"
                            href="mailto:support@4mil.co.uk"
                        >
                            Contact
                        </a>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default TopBar;
