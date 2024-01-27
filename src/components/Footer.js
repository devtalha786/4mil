import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";


   
const Footer = () => {
    
    const icons = [
        // {
        //     class: "fa-brands fa-facebook-f",
        // },
        // {
        //     class: "fa-brands fa-facebook-messenger",
        // },
        // {
        //     class: "fa-brands fa-instagram",
        // },
        // {
        //     class: "fa-brands fa-pinterest",
        // },
        // {
        //     class: "fa-brands fa-youtube",
        // },
        {
            class: "fa-brands fa-linkedin",
        },
    ];
    const handleIconClick = () => {
        window.open('https://www.linkedin.com/company/4mil/', '_blank');
      };
    return (
        <>
            <Container className="footer " fluid>
                <Row>
                    <Col
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        className="footer__left__col"
                    >
                        <h4 className="text-white">
                            Connect with us on social media
                        </h4>
                        <Row className="footer__icons d-flex ">
                            {icons?.map((icon) => {
                                return (
                                    <div className="footer__icons__icon cursor-pointer">
                                        <i class={icon.class} onClick={handleIconClick}></i>
                                    </div>
                                );
                            })}
                        </Row>
                    </Col>
                    <Col
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        className="footer__right__col"
                    >
                        <p className="text-white">SUPPORT</p>
                        <div className="d-flex flex-column">
                            <Link
                                to="/about"
                                className="text-decoration-none text-white"
                            >
                                About
                            </Link>
                            <Link
                                to="/privacy-policy"
                                className="text-decoration-none text-white"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/term-conditions"
                                className="text-decoration-none text-white"
                            >
                                Terms and Conditions
                            </Link>
                            <Link
                                to="/faq"
                                className="text-decoration-none text-white"
                            >
                                FAQ
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Footer;
