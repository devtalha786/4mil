import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import CvBuilder from "../assets/img/cvBuilder.avif";
const RightSkills = () => {
    return (
        <Container className="mb-5 template d-flex justify-content-center">
            <Row className="d-flex justify-content-center align-items-center">
                <Col
                    md={6}
                    className="d-flex justify-content-center template__leftCol order-md-1 order-2"
                >
                    <img
                        src={CvBuilder}
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

                    <ol start={4} className="template__order-lists-skill">
                        <li className="">
                            The CV builder that puts your skills right in front
                            of employers
                        </li>
                    </ol>
                    <ul className="mx-4 own-list">
                        <li className="sub-list">
                            Our CV builder and its pre-generated content are
                            tested by recruiters and IT experts. We help your CV
                            become truly competitive in the hiring process
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default RightSkills;
