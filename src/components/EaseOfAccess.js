import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import ease from "../assets/img/ease.avif";
import facingDatabase from "../assets/img/facingDatabase.avif";
const EaseOfAccess = () => {
    return (
        <Container className="mb-5 ease">
            <Row className="d-flex justify-content-center align-items-center">
                <Col
                    md={6}
                    className="d-flex justify-content-center flex-column ease__leftCol"
                >
                    {/* <h1 className="ease__leftCol__heading mb-1">
                        Ease Of Access
                    </h1>
                    <div className="border-bottom"></div> */}

                    <ol start={3} className="ease__order-list">
                        <li className="">Access to 4Mil database</li>
                    </ol>
                    <ul className="mx-4 own-list">
                        <li className="sub-list">&nbsp;
                            Connecting you to employers that value your
                            transferable skills
                        </li>
                        <li className="sub-list">&nbsp;AI matches your CV to vacancies</li>
                    </ul>
                </Col>
                <Col
                    md={6}
                    className="d-flex justify-content-center ease__rightCol"
                >
                    <img
                        src={facingDatabase}
                        className="ease__rightCol__img"
                        alt=""
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default EaseOfAccess;
