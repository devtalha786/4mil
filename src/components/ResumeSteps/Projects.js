import React, { useState } from "react";
import { Col, Collapse, Form, FormGroup, Input, Label, Row } from "reactstrap";

const Projects = ({ projects, setProjects }) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(-1);
    const toggle = (index) => {
        if (selectedItem === index) {
            setSelectedItem(-1);
        } else {
            setSelectedItem(index);
        }
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedProjects = [...projects];
        updatedProjects[index][name] = value;
        setProjects(updatedProjects);
    };

    const handleAddFields = () => {
        setProjects([
            ...projects,
            {
                projectName: "",
                projectUrl: "",
                projectDescription: "",
            },
        ]);
        setSelectedItem(projects.length);
    };

    const handleRemoveFields = (index) => {
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
       // console.log(projects);
    };
    return (
        <>
            <div className="my-5 p-2 shadow-sm border border-1">
                <h4 className="font-weight-bold">Projects </h4>
                {projects?.length == 0 ? (
                    <div
                        className="d-flex alig-items-center cursor-pointer builder__employment-link"
                        onClick={handleAddFields}
                    >
                        <div>
                            <i className="fa-brands fa-plus"></i>
                        </div>
                        <label>ADD PROJECTS DETAILS</label>
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit} className="my-2">
                        {projects.map((item, index) => (
                            <div key={index}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="font-weight-bold ">
                                        Project -{" "}
                                        {item?.projectName
                                            ? item.projectName
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
                                                <Label
                                                    for={`projectName${index}`}
                                                >
                                                    Project Name
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="projectName"
                                                    className="builder__input"
                                                    id={`projectName${index}`}
                                                    value={item.projectName}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="Project Name"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label
                                                    for={`project-url${index}`}
                                                >
                                                    Project Url
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="projectUrl"
                                                    className="builder__input"
                                                    id={`projectUrl${index}`}
                                                    value={item.projectUrl}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="Project Url"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label
                                                    for={`projectDescription${index}`}
                                                >
                                                    Project Description
                                                </Label>
                                                <Input
                                                    type="textarea"
                                                    name="projectDescription"
                                                    className="builder__input"
                                                    id={`projectDescription${index}`}
                                                    value={
                                                        item.projectDescription
                                                    }
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="Project Description"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-between">
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
                                    </div>
                                </Collapse>
                            </div>
                        ))}
                    </Form>
                )}
            </div>
        </>
    );
};

export default Projects;
