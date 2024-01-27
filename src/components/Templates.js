import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import template from "../assets/img/cv.avif";
import OptimizedCv from "../assets/img/OptimizedCV.avif";
const Templates = () => {
    return (
        <Container className="mb-5 template d-flex justify-content-center">
            <Row className="d-flex justify-content-center align-items-center">
                <Col
                    md={6}
                    className="d-flex justify-content-center template__leftCol order-md-1 order-2"
                >
                    <img
                        src={OptimizedCv}
                        width="80%"
                        className="template__leftCol__img"
                        alt=""
                    />
                </Col>
                <Col
                    md={6}
                    className="d-flex justify-content-center flex-column template__rightCol order-md-2 order-1"
                >
                    {/* <h1 className="template__rightCol__heading mb-1">
                        Select Your Template
                    </h1>
                    <div className="border-bottom"></div> */}
                    <ol start={2} className="template__order-list">
                        <li className="">
                            CV's optimised with Artificial intelligence (AI) for
                            applicant tracking systems (ATS)
                        </li>
                    </ol>
                    <ul className="mx-4 own-list">
                        <li className="sub-list">
                            4Mil CVs are vigorously tested against major ATS
                            systems to ensure complete parsability
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default Templates;
