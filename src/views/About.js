import React from "react";
import { Col, Container, Row } from "reactstrap";
import StripeCheckout from "../components/StripeCheckout";
import { useHistory } from "react-router-dom";
import shake from "../assets/img/shaking.jpg";
import database from "../assets/img/4MillDatabase.jpg";
const About = () => {
    const history = useHistory();
    return (
        <Container className="my-5 about">
            <Row>
                <Col md={6} className="text-justify ">
                    <h5 className="font-weight-bold about__font">
                        How it began
                    </h5>
                    <div>
                        <p className="text-justify about__font">
                            At 4Mil, we discovered that there is an art to
                            translating military experience into civilian
                            skills. The better this is done, the easier it is to
                            find a job that is aligned to your unique skill set
                            and values and financial worth.
                        </p>
                        <p className="text-justify about__font">
                            After our founder successfully left the military in
                            2020. Matt went from having a career as a soldier to
                            fulfilling his earning potential in the civilian
                            world.
                        </p>
                        <p className="text-justify about__font">
                            After many ex-colleagues and friends reached out to
                            Matt for guidance and advice, it became clear that
                            others could benefit from this service.
                        </p>
                        <p className="about__font">
                            Join us today to earn your worth.{" "}
                        </p>
                    </div>

                    {/* <h1 className="about__heading">
                        About Our CV Transition Site
                    </h1> */}
                    {/* <p className="about__paragraph">
                        Once upon a time, there were a group of brave
                        individuals who served in the military. After years of
                        dedicated service, they decided to transition to
                        civilian life and embark on a new journey.
                    </p>
                    <p className="about__paragraph">
                        During their transition, they faced various challenges,
                        including translating their military experience into a
                        language that civilian employers could understand. They
                        realized the importance of having well-crafted CVs
                        (resumes) to showcase their skills and experiences in a
                        way that resonated with potential employers.
                    </p>
                    <p className="about__paragraph">
                        Determined to help others in a similar situation, they
                        came together and created this CV Transition Site. Their
                        mission was to provide resources, guidance, and support
                        to fellow military individuals transitioning to civilian
                        careers.
                    </p>
                    <p className="about__paragraph">
                        On this site, you will find a range of tools and
                        templates to help create professional CVs that highlight
                        your military accomplishments and demonstrate your
                        potential value to civilian employers. Whether you are a
                        veteran, reservist, or active-duty military personnel
                        preparing for your transition, we are here to assist you
                        every step of the way.
                    </p>
                    <p className="about__paragraph">
                        We understand the unique challenges you may face during
                        this transition, and we are committed to providing the
                        resources and support needed to help you succeed in your
                        civilian career.
                    </p>
                    <p className="about__paragraph">
                        Thank you for visiting our CV Transition Site, and we
                        wish you the best of luck in your journey from military
                        service to civilian employment!
                    </p> */}
                </Col>
                <Col md={6}>
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={shake} width="60%" />
                    </div>
                </Col>
            </Row>
            <Row className="d-flex align-items-center justify-content-center">
                <Col md={6}>
                    <h5 className="font-weight-bold my-4 about__font">
                        Get onto the 4Mil Employer Database
                    </h5>
                    <p className="about__font">
                        Match your knowledge, Skills and Experience (KSE) with
                        TOP JOBS
                    </p>
                    <p className="about__font">
                        Artificial Intelligence (AI) will match your skills to
                        job specs
                    </p>
                    <button
                        onClick={() => {
                            history.push("/builder");
                        }}
                        className="btn-color btn  text-white mt-2"
                    >
                        Build a CV
                    </button>
                </Col>
                <Col md={6}>
                    <div className="d-flex align-items-center justify-content-center">
                        <img
                            src={database}
                            width="70%"
                            className="database_img img-fluid"
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
