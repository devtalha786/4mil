import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Row,
    Collapse,
    UncontrolledTooltip,
} from "reactstrap";
import { getEmploymentDescription } from "../../store/actions/builderAction";
import { useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";

const Employments = ({ employments, setEmployments }) => {
    const dispatch = useDispatch();
    const { employmentDescription, suggestionLoading } = useSelector(
        (state) => state.builder
    );
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(-1);
    const [specificIndex, setSpecificIndex] = useState("");
    const colors = [
        "bg-primary",
        "bg-success",
        "bg-danger",
        "bg-warning",
        "bg-info",
    ];
    const toggle = (index) => {
        if (selectedItem === index) {
            setSelectedItem(-1);
        } else {
            setSelectedItem(index);
        }
    };
    //console.log(employments, "employments");
    const handleChange = (index, event, todoIndex) => {
        //console.log(event.target.name);
        setSpecificIndex(index);
        if (event.target.name == "activity") {
            const { name, value } = event.target;
            const list = [...employments];
            list[index].points[todoIndex][name] = value;
            setEmployments(list);
            const storedEmployment =
                JSON.parse(localStorage.getItem("employments")) || employments;
            storedEmployment[index].points[todoIndex][name] = value;
            localStorage.setItem(
                "employments",
                JSON.stringify(storedEmployment)
            );
        } else {
            const { name, value } = event.target;

            const updatedEmployments = [...employments];
            updatedEmployments[index][name] = value;
            setEmployments(updatedEmployments);
            const storedEmployment =
                JSON.parse(localStorage.getItem("employments")) || employments;
            storedEmployment[index] = {
                ...storedEmployment[index],
                [name]: value,
            };
            localStorage.setItem(
                "employments",
                JSON.stringify(storedEmployment)
            );
        }
    };
    const handleFocusOut = (index) => {
        const params = {
            start: employments[index].startDate,
            end: employments[index].endDate,
            position: employments[index].position,
        };
        dispatch(getEmploymentDescription(params));
    };
    const handleSuggest = (item, index) => {
        let name = "description";
        const updatedEmployments = [...employments];
        updatedEmployments[index][name] = item;
        setEmployments(updatedEmployments);
        const storedEmployment =
            JSON.parse(localStorage.getItem("employments")) || employments;
        storedEmployment[index] = {
            ...storedEmployment[index],
            [name]: item,
        };
        localStorage.setItem("employments", JSON.stringify(storedEmployment));
    };
    const handleAddFields = () => {
        setEmployments([
            ...employments,
            {
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                points: [{ activity: "" }],
            },
        ]);
        setSelectedItem(employments.length);
        localStorage.setItem(
            "employments",
            JSON.stringify([
                ...employments,
                {
                    company: "",
                    position: "",
                    startDate: "",
                    endDate: "",
                    points: [{ activity: "" }],
                },
            ])
        );
    };

    const handleRemoveFields = (index) => {
        const updatedEmployments = [...employments];
        updatedEmployments.splice(index, 1);
        setEmployments(updatedEmployments);
        localStorage.setItem("employments", JSON.stringify(updatedEmployments));
    };
    const handleAddPoints = (topicIndex) => {
        const list = [...employments];
        list[topicIndex].points.push({ activity: "" });
        setEmployments(list);
        localStorage.setItem("employments", JSON.stringify(list));
    };

    const handleRemovePoints = (topicIndex, todoIndex) => {
        const list = [...employments];
        list[topicIndex].points.splice(todoIndex, 1);
        setEmployments(list);
        localStorage.setItem("employments", JSON.stringify(list));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(employments);
    };
    return (
        <>
            <div className="my-5 border border-1 p-2 shadow-sm">
                <h4 className="font-weight-bold">Employment History</h4>
                <sub className="text-justify">
                    Show your relevant experience (last 10 years). Provide 1 or
                    2 sentences describing your role. Use bullet points to note
                    your achievements (achieved X, measured by Y, doing Z).
                </sub>
                {employments?.length == 0 ? (
                    <div
                        className="d-flex alig-items-center cursor-pointer builder__employment-link"
                        onClick={handleAddFields}
                    >
                        <div>
                            <i className="fa-brands fa-plus"></i>
                        </div>
                        <label>Employment Details</label>
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit} className="my-2 ">
                        {employments.map((employment, index) => (
                            <div key={index}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="font-weight-bold ">
                                        Position -{" "}
                                        {employment?.position
                                            ? employment.position
                                            : index + 1}
                                    </h6>
                                    <div className="d-flex align-items-center">
                                        <i
                                            onClick={() => {
                                                toggle(index);
                                                setOpen(!open);
                                            }}
                                            className={`fas ${
                                                open
                                                    ? "fa-chevron-up"
                                                    : "fa-chevron-down"
                                            }`}
                                        ></i>

                                        <i
                                            className="fa-solid fa-trash mx-2 text-dark"
                                            onClick={() =>
                                                handleRemoveFields(index)
                                            }
                                        ></i>
                                    </div>
                                </div>
                                <Collapse isOpen={selectedItem === index}>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for={`company${index}`}>
                                                    Company
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="company"
                                                    className="builder__input"
                                                    id={`company${index}`}
                                                    value={employment.company}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event,
                                                            ""
                                                        )
                                                    }
                                                    placeholder="Employer"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for={`position${index}`}>
                                                    Position
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="position"
                                                    className="builder__input"
                                                    id={`position${index}`}
                                                    value={employment.position}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event,
                                                            ""
                                                        )
                                                    }
                                                    onBlur={() => {
                                                        handleFocusOut(index);
                                                    }}
                                                    placeholder="Job Title"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label
                                                    for={`startDate${index}`}
                                                >
                                                    Start Date
                                                </Label>
                                                <Input
                                                    type="date"
                                                    name="startDate"
                                                    className="builder__input"
                                                    id={`startDate${index}`}
                                                    value={employment.startDate}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event,
                                                            ""
                                                        )
                                                    }
                                                    onBlur={() => {
                                                        handleFocusOut(index);
                                                    }}
                                                    placeholder="Start Date"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for={`endDate${index}`}>
                                                    End Date
                                                </Label>
                                                <Input
                                                    type="date"
                                                    name="endDate"
                                                    className="builder__input"
                                                    id={`endDate${index}`}
                                                    value={employment.endDate}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event,
                                                            ""
                                                        )
                                                    }
                                                    onBlur={() => {
                                                        handleFocusOut(index);
                                                    }}
                                                    placeholder="End Date"
                                                />
                                            </FormGroup>
                                        </Col>
                                        {/* <Col md={12}>
                                            <FormGroup>
                                                <Label for={`position${index}`}>
                                                    Employement Type
                                                </Label>
                                                <Input
                                                    type="select"
                                                    name="employmentType"
                                                    className="builder__input"
                                                    id={`employmentType${index}`}
                                                    value={
                                                        employment.employmentType
                                                    }
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Employment Type
                                                    </option>
                                                    <option value="Full Time">
                                                        Full Time
                                                    </option>
                                                    <option value="Part Time">
                                                        Part Time
                                                    </option>
                                                    <option value="remote">
                                                        Remote
                                                    </option>
                                                    <option value="hybrid">
                                                        Hybrid
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                        </Col> */}

                                        <Col md={12} lg={12}>
                                            <LoadingOverlay
                                                active={suggestionLoading}
                                                spinner
                                                text="Suggestions Loading...."
                                            >
                                                <Label
                                                    for={`description${index}`}
                                                    style={{
                                                        display:
                                                            index ===
                                                            specificIndex
                                                                ? "block"
                                                                : "none",
                                                    }}
                                                >
                                                    Suggestions for description
                                                </Label>

                                                {employmentDescription?.length >
                                                    0 && (
                                                    <div
                                                        style={{
                                                            display:
                                                                index ===
                                                                specificIndex
                                                                    ? "block"
                                                                    : "none",
                                                        }}
                                                    >
                                                        {employmentDescription?.map(
                                                            (item, indexs) => (
                                                                <>
                                                                    <Button
                                                                        id={`suggestion_${indexs}`}
                                                                        key={
                                                                            indexs
                                                                        }
                                                                        className={`text-white rounded-pill my-2 ${
                                                                            colors[
                                                                                indexs %
                                                                                    colors.length
                                                                            ]
                                                                        }`}
                                                                        style={{
                                                                            paddingTop:
                                                                                "5px",
                                                                            paddingBottom:
                                                                                "5px",
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                        onClick={() => {
                                                                            handleSuggest(
                                                                                item,
                                                                                index
                                                                            );
                                                                        }}
                                                                    >
                                                                        {item.substring(
                                                                            0,
                                                                            20
                                                                        )}
                                                                        ...
                                                                    </Button>
                                                                    <UncontrolledTooltip
                                                                        placement="below"
                                                                        target={`#suggestion_${indexs}`}
                                                                        autohide={
                                                                            false
                                                                        }
                                                                        style={{
                                                                            zIndex: 9999,
                                                                            position:
                                                                                "absolute",
                                                                            top: "100%",
                                                                            left: "20%",
                                                                            width: "400px",
                                                                            maxHeight:
                                                                                "22vh",
                                                                            overflow:
                                                                                "auto",
                                                                            transform:
                                                                                "translate(-50%, 0)",
                                                                        }}
                                                                    >
                                                                        {item}
                                                                    </UncontrolledTooltip>
                                                                </>
                                                            )
                                                        )}
                                                    </div>
                                                )}

                                                <FormGroup>
                                                    <Label
                                                        for={`description${index}`}
                                                    >
                                                        Description
                                                    </Label>
                                                    <sub className="text-justify d-block text-danger">
                                                        Please change the
                                                        position, StartDate or
                                                        EndDate if you want the
                                                        (AI Suggestions).
                                                    </sub>
                                                    <Input
                                                        type="textarea"
                                                        name="description"
                                                        className="builder__input my-3"
                                                        id={`description${index}`}
                                                        value={
                                                            employment.description
                                                        }
                                                        onChange={(event) =>
                                                            handleChange(
                                                                index,
                                                                event,
                                                                ""
                                                            )
                                                        }
                                                        placeholder="Job Description"
                                                    />
                                                </FormGroup>
                                            </LoadingOverlay>
                                        </Col>

                                        <Col md={12}>
                                            {employment.points.map(
                                                (point, todoIndex) => (
                                                    <>
                                                        <FormGroup className="col-12">
                                                            <Label>
                                                                Key Acheivements{" "}
                                                                {todoIndex + 1}
                                                            </Label>
                                                            <Input
                                                                key={todoIndex}
                                                                required
                                                                type="text"
                                                                placeholder="Activity"
                                                                name="activity"
                                                                className="builder__input"
                                                                value={
                                                                    point.activity
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        e,
                                                                        todoIndex
                                                                    )
                                                                }
                                                            />
                                                        </FormGroup>
                                                        <FormGroup className="col-12 d-flex">
                                                            {employment.points
                                                                .length -
                                                                1 ===
                                                                todoIndex && (
                                                                <div
                                                                    className="d-flex alig-items-center cursor-pointer"
                                                                    onClick={() =>
                                                                        handleAddPoints(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <div>
                                                                        <i className="fa-brands fa-plus"></i>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {employment.points
                                                                .length !==
                                                                1 && (
                                                                <div
                                                                    className="mx-2 d-flex alig-items-center cursor-pointer"
                                                                    onClick={() =>
                                                                        handleRemovePoints(
                                                                            index,
                                                                            todoIndex
                                                                        )
                                                                    }
                                                                >
                                                                    <div>
                                                                        <i className="fa-solid fa-minus"></i>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </>
                                                )
                                            )}
                                        </Col>
                                        
                                    </Row>
                                    <div className="d-flex justify-content-between">
                                        {/* <Button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleRemoveFields(index)
                                        }
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </Button> */}
                                    </div>
                                </Collapse>
                            </div>
                        ))}
                    </Form>
                )}
                {employments?.length > 0 ? (
                <div
                    className="d-flex alig-items-center cursor-pointer"
                    onClick={() => {
                        handleAddFields();
                        // toggle(index);
                    }}
                >
                    <div>
                        <i className="fa-brands fa-plus"></i>
                    </div>
                    <label htmlFor="" className="mx-2">
                        ADD MORE
                    </label>
                </div>
                ):("")}
            </div>
        </>
    );
};

export default Employments;
