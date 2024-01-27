import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import pricing from "../assets/img/pricing.jpg";
const Pricing = () => {
    return (
        <Container className="mb-5 pricing">
            <Row className="d-flex justify-content-center align-items-center">
                <Col
                    md={6}
                    className="d-flex justify-content-center flex-column pricing__leftCol"
                >
                    {/* <h1 className="pricing__leftCol__heading mb-1">Pricing</h1> */}
                    {/* <div className="border-bottom"></div> */}
                    <ol className="pricing__order-list ">
                        <li className="text-justify">
                            {/* Unlock Your Professional Potential as You Transition
                        from Military Service. Empowering Your Career Journey
                        with an Exceptional Resume. Lorem ipsum dolor sit, amet
                        consectetur adipisicing elit. Voluptatum expedita magnam
                        quae quibusdam, molestiae cupiditate totam doloribus
                        facilis perspiciatis ad quis doloremque? Qui dignissimos
                        voluptates, reiciendis quidem tenetur iste laboriosam. */}
                            We understand the full scope of Veterans' skills,
                            and believe they should be front and centre, to help
                            organisations achieve their business needs
                        </li>
                    </ol>
                </Col>
                <Col
                    md={6}
                    className="d-flex justify-content-center pricing__rightCol"
                >
                    <img
                        src={pricing}
                        className="pricing__rightCol__img"
                        alt=""
                    />
                </Col>
            </Row>
        </Container>
    );
};
export default Pricing;
