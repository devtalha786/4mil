import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";

const HeroSection = () => {
    const history = useHistory();
    return (
        <Container>
            <Row className="hero-row">
                <Col
                    lg={8}
                    md={12}
                    className="d-flex flex-column m-auto justify-content-center align-items-center herosection "
                >
                    <h5 className="my-3 font-weight-bold herosection__headertext">Online CV Builder</h5>
                    <h1 className="herosection__heading herosection__headertext text-center">
                        4Mil’s CV Builder helps you get hired by top companies
                    </h1>

                    {/* <p className="text-center herosection__paragraph">
                        Use professional field-tested resume templates that
                        follow the exact ‘resume rules’ employers look for. Easy
                        to use and done within minutes - try now for free!
                    </p> */}
                    <Button
                        className="my-2 btn-color"
                        onClick={() => {
                            history.push("/builder");
                        }}
                        size="lg"
                    >
                        Create My CV
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HeroSection;
