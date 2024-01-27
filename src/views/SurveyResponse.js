import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Spinner,
} from "reactstrap";
import { checkCandidates, clearState, deleteCandidate } from "../store/actions/candidateAction";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";

export default function SurveyResponse() {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [survey, setSurvey] = useState("");
    const [confirmModal, setConfirmModal] = useState(false);
    const { getLoading,checkCandidate,deleteLoading } = useSelector((state) => state.candidate);
    const confirmtoggle = () => setConfirmModal(!confirmModal);
    useEffect(() => {
        if (checkCandidate == false) {
            history.push("/");
            dispatch(clearState());
        }
    }, [checkCandidate]);
    useEffect(()=>{
        dispatch(checkCandidates(id))
    },[id])
    return (
        <LoadingOverlay active={getLoading} spinner text="Loading....">
        <Container>
            <Row className="d-flex align-items-center justify-content-center">
                <Col md={6} sm={12}>
                    <Card className="shadow mt-3">
                        <CardBody>
                            <h4 className="text-center">
                                Do you want to be present in 4mil platform?
                            </h4>
                            <div className="d-flex align-items-center justify-content-center">
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="radio1"
                                            value={survey}
                                            onChange={() => {
                                                setSurvey("yes");
                                            }}
                                        />
                                        Yes
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="mx-1">
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="radio1"
                                            value={survey}
                                            onChange={() => {
                                                setSurvey("no");
                                            }}
                                        />
                                        No
                                    </Label>
                                </FormGroup>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <Button
                                    className="bg-success mt-2 px-5"
                                    onClick={() => {
                                        if (survey != "") {
                                            confirmtoggle();
                                        } else {
                                            alert("Please fill your response");
                                        }
                                    }}
                                >
                                    Save
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={confirmModal} toggle={confirmtoggle}>
                <ModalHeader toggle={confirmtoggle}>
                    Confirmation Box
                </ModalHeader>
                <ModalBody>
                    <h5 className="text-center ">
                        Do you agree with your decision?
                    </h5>

                    <div className="d-flex justify-content-center align-items-center my-3">
                        <Button
                            className="bg-primary text-white w-25 mx-2"
                            onClick={() => {
                                dispatch(
                                    deleteCandidate(survey,id, () => {
                                        confirmtoggle();
                                        history.push("/")
                                    })
                                );
                            }}
                        >
                            {" "}
                            {deleteLoading ? <Spinner size="md" /> : "Yes"}
                        </Button>

                        <Button
                            className="bg-danger text-white w-25"
                            onClick={confirmtoggle}
                        >
                            No
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </Container>
        </LoadingOverlay>
    );
}
