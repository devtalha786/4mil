import React from "react";
import { Col, Container, Row } from "reactstrap";
import PricingCards from "../components/PricingCards";

export default function Pricing() {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <PricingCards />
                </Col>
            </Row>
        </Container>
    );
}
