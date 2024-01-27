import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Row,
    Collapse,
} from "reactstrap";

const Education = ({ education, setEducation }) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(-1);
    const [storageEducation, setStorageEducation] = useState([]);
    const toggle = (index) => {
        if (selectedItem === index) {
            setSelectedItem(-1);
        } else {
            setSelectedItem(index);
        }
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedEmployments = [...education];
        updatedEmployments[index][name] = value;
        setEducation(updatedEmployments);
        const storedEducation =
            JSON.parse(localStorage.getItem("education")) || education;

        storedEducation[index] = {
            ...storedEducation[index],
            [name]: value,
        };
        localStorage.setItem("education", JSON.stringify(storedEducation));
    };

    const handleAddFields = () => {
        setEducation([
            ...education,
            {
                // school: "",
                degree: "",
                level: "",
                yearAcheived: "",
            },
        ]);
        setSelectedItem(education.length);
        localStorage.setItem(
            "education",
            JSON.stringify([
                ...education,
                {
                    // school: "",
                    degree: "",
                    level: "",
                    yearAcheived: "",
                },
            ])
        );
    };

    const handleRemoveFields = (index) => {
        const updatedEmployments = [...education];
        updatedEmployments.splice(index, 1);
        setEducation(updatedEmployments);
        localStorage.setItem("education", JSON.stringify(updatedEmployments));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(education);
    };
    useEffect(() => {
        const storedEducation = JSON.parse(localStorage.getItem("education"));
        if (storedEducation) {
            setStorageEducation(storedEducation);
        }
    }, [education]);
    return (
        <>
            <div className="my-5 p-2 shadow-sm border border-1">
                <h4 className="font-weight-bold">Qualifications </h4>

                {education?.length == 0 ? (
                    <div
                        className="d-flex alig-items-center cursor-pointer builder__employment-link"
                        onClick={handleAddFields}
                    >
                        <div>
                            <i className="fa-brands fa-plus"></i>
                        </div>
                        <label>Add Qualifications</label>
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit} className="my-2">
                        {education.map((item, index) => (
                            <div key={index}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="font-weight-bold ">
                                        Degree -{" "}
                                        {item?.degree ? item.degree : index + 1}
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
                                                <Label for={`level${index}`}>
                                                    Level of Qualification
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="level"
                                                    className="builder__input"
                                                    id={`level${index}`}
                                                    value={item.level}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="Degree/Level 7/Diploma"
                                                />
                                            </FormGroup>
                                            {/* <FormGroup>
                                                <Label for={`school${index}`}>
                                                    School
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="school"
                                                    className="builder__input"
                                                    id={`school${index}`}
                                                    value={item.school}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="School"
                                                />
                                            </FormGroup> */}
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for={`position${index}`}>
                                                    Name of Qualification
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="degree"
                                                    className="builder__input"
                                                    id={`degree${index}`}
                                                    value={item.degree}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="Agile Project Management - Practitioner"
                                                />
                                            </FormGroup>
                                        </Col>
                                        {/* <Col md={6}>
                                            <FormGroup>
                                                <Label for={`city${index}`}>
                                                    City
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="city"
                                                    className="builder__input"
                                                    id={`city${index}`}
                                                    value={item.city}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="city"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for={`grade${index}`}>
                                                    Grade
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="grade"
                                                    className="builder__input"
                                                    id={`grade${index}`}
                                                    value={item.grade}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="Grade"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for={`position${index}`}>
                                                    Description
                                                </Label>
                                                <Input
                                                    type="textarea"
                                                    name="description"
                                                    placeholder="Description about school"
                                                    className="builder__input"
                                                    id={`description${index}`}
                                                    value={item.description}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                />
                                            </FormGroup>
                                        </Col> */}

                                        {/* <Col md={6}>
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
                                                    value={item.startDate}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="Start Date"
                                                />
                                            </FormGroup>
                                        </Col> */}
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label
                                                    for={`yearAcheived${index}`}
                                                >
                                                    Year Achieved
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="yearAcheived"
                                                    className="builder__input"
                                                    id={`yearAcheived${index}`}
                                                    value={item.endDate}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="YYYY"
                                                />
                                            </FormGroup>
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
                {education?.length > 0 ? (
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
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Education;
