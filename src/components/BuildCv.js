import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import tycoon from "../assets/img/4mil.jpg";
import { useHistory } from "react-router-dom";
const BuildCv = () => {
    const history = useHistory();

    return (
        <Container className="mb-5 tycoon d-flex justify-content-center">
            <Row className="d-flex justify-content-center align-items-center">
                <Col
                    md={6}
                    className="d-flex justify-content-center tycoon__leftCol order-md-1 order-2"
                >
                    <img
                        src={tycoon}
                        width="80%"
                        className="tycoon__leftCol__img"
                        alt=""
                    />
                </Col>
                <Col
                    md={6}
                    className="d-flex justify-content-center flex-column tycoon__rightCol order-md-2 order-1"
                >
                    <h1 className="tycoon__rightCol__heading mb-1">
                        Build your CV with Ease!
                    </h1>
                    <div className="border-bottom"></div>
                    <p className="my-3">
                        Unlock your professional potential as you transition
                        from military service. Empower your career journey with
                        an exceptional CV.
                    </p>
                    <Button
                        className="btn-color tycoon__rightCol__btn"
                        size="lg"
                        onClick={() => {
                            history.push("/builder");
                        }}
                    >
                        Build CV
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default BuildCv;
