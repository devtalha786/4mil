import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { CardBody, CardFooter, CardHeader, Col, Row } from "reactstrap";
import { checkCandidates, clearState } from "../store/actions/candidateAction";
import LoadingOverlay from "react-loading-overlay";

export default function PricingCards() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    console.log(location, "location");
    const { id } = useParams();
    const { checkCandidate, getLoading } = useSelector(
        (state) => state.candidate
    );
    useEffect(() => {
        if (checkCandidate == false) {
            dispatch(clearState());
            history.push("/builder");
        }
    }, [checkCandidate]);
    useEffect(() => {
        dispatch(checkCandidates(id));
    }, [id]);
    return (
        <>
            <LoadingOverlay active={getLoading} spinner text="Loading....">
                <div class="row d-flex align-items-center justify-content-center">
                    <div class="col-md-12 col-sm-6">
                        <div class="pricing-table-3 basic">
                            <div class="pricing-table-header">
                                <h4>
                                    <strong>4Mil CV</strong>
                                </h4>
                                <p className="para">
                                Access to 4Mil database
                                </p>
                            </div>
                            <div class="price">
                                <strong>£65</strong>
                            </div>
                            <div class="pricing-body">
                                <ul class="pricing-table-ul ulist">
                                    <li>Editable CV</li>
                                    <li>Intelligent job matching</li>
                                    <li class="not-avail">ATS Checked</li>
                                    <li class="not-avail">
                                        Access to 4Mil database
                                    </li>
                                    <li class="not-avail">Email Support</li>
                                    <li class="not-avail">
                                        Non-recurring payment. Pay once
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button
                                    disabled={id != "" ? false : true}
                                    className="view-more px-5"
                                    onClick={() => {
                                        history.push({
                                            pathname: `/checkout/${id}`,
                                            state: {
                                                price: 65,
                                                email: location?.state,
                                            },
                                        });
                                    }}
                                >
                                    Pay now
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div class="col-md-4 col-sm-6">
                        <div class="pricing-table-3 premium">
                            <div class="pricing-table-header ">
                                <h4>
                                    <strong>Bolt-on</strong>
                                </h4>
                                <p className="para"> remain on the database</p>
                            </div>
                            <div class="price my-2">
                                <strong>£6</strong> / MONTH
                            </div>
                            <div class="pricing-body my-5">
                                <ul class="pricing-table-ul ulist ">
                                    <li>1 month access to the 4Mil Database</li>
                                    <li class="not-avail">Email Support</li>
                                </ul>
                            </div>
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ marginTop: "110px" }}
                            >
                                <button
                                    disabled={id != "" ? false : true}
                                    className="view-more px-5 "
                                    onClick={() => {
                                        history.push({
                                            pathname: `/checkout/${id}`,
                                            state: {
                                                price: 6,
                                                email: location?.state,
                                            },
                                        });
                                    }}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div> */}
                    <div className="pricing-order">
                        <p className="d-flex align-items-center text-justify justify-content-center text-secondary font-italic">
                            By placing an order you waive your right of
                            withdrawal and agree to immediate delivery of the
                            services and related digital products.
                        </p>
                    </div>
                </div>
            </LoadingOverlay>
        </>
    );
}
