import React, { useEffect } from "react";
import StripeCheckout from "../components/StripeCheckout";
import { Col, Container, Row } from "reactstrap";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { checkCandidates, clearState } from "../store/actions/candidateAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
// import { useReactToPrint } from "react-to-print";
const CheckOut = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { id } = useParams();
    const { checkCandidate, getLoading } = useSelector(
        (state) => state.candidate
    );
    useEffect(() => {
        if (checkCandidate == false) {
            history.push("/builder");
            dispatch(clearState());
        }
    }, [checkCandidate]);
    useEffect(() => {
        dispatch(checkCandidates(id));
    }, [id]);
    //console.log(id,location.state, "id");
    // const handlePrint = useReactToPrint({
    //     content: () => {
    //         const parser = new DOMParser();
    //         const html = parser.parseFromString(location.state, "text/html");
    //         const body = html.body;
    //         return body;
    //     },
    // });
    return (
        <LoadingOverlay active={getLoading} spinner text="Loading....">
            <Container className="mb-5">
                {/* <Row className="my-2">
                <Col>
                    <div className="print-btn-container d-flex justify-content-end mb-3">
                        <button
                            onClick={handlePrint}
                            className="btn-color btn  text-white"
                            disabled={id != "" ? false : true}
                        >
                            Print Your CV
                        </button>
                    </div>
                </Col>
            </Row> */}
                <Row>
                    <Col
                        md={4}
                        className="d-flex flex-column justify-content-center align-items-center"
                    >
                        <p className="mb-0 pb-0 font-weight-bold">CV</p>
                        <span>
                            <small>Powered by 4mil</small>
                        </span>
                    </Col>
                    <Col className="m-auto" md={6}>
                        <StripeCheckout docID={id} detail={location?.state} />
                    </Col>
                </Row>
            </Container>
        </LoadingOverlay>
    );
};

export default CheckOut;
