import React, { useState } from "react";
import { useEffect } from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Row,
    Collapse,
    Badge,
    UncontrolledTooltip,
} from "reactstrap";
import { getSkillDescription } from "../../store/actions/builderAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

const Skills = ({ setSkills, skills }) => {
    const dispatch = useDispatch();
    const { skillDescription, suggestionLoading } = useSelector(
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

    const addNewFields = () => {
        setSkills([...skills, { title: "", description: "" }]);
        setSelectedItem(skills.length);
        localStorage.setItem(
            "skills",
            JSON.stringify([...skills, { title: "", description: "" }])
        );
    };

    const handleChange = (index, event) => {
        setSpecificIndex(index);
        const { name, value } = event.target;
        const updatedSkills = [...skills];
        updatedSkills[index][name] = value;
        setSkills(updatedSkills);
        const storedSkills =
            JSON.parse(localStorage.getItem("skills")) || skills;

        storedSkills[index] = {
            ...storedSkills[index],
            [name]: value,
        };
        localStorage.setItem("skills", JSON.stringify(storedSkills));
    };
    const handleFocusOut = (index) => {
        dispatch(getSkillDescription({ skill: skills[index].title }));
    };
    const handleSuggest = (item, index) => {
        let name = "description";
        const updatedSkills = [...skills];
        updatedSkills[index][name] = item;
        setSkills(updatedSkills);
        const storedSkills =
            JSON.parse(localStorage.getItem("skills")) || skills;
        storedSkills[index] = {
            ...storedSkills[index],
            [name]: item,
        };
        localStorage.setItem("skills", JSON.stringify(storedSkills));
    };
    const removeSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
        localStorage.setItem("skills", JSON.stringify(updatedSkills));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="my-5 p-2 border border-1 shadow-sm">
                <h4 className="font-weight-bold">Skills</h4>
                <sub className="text-justify">
                    We are looking for 6 skills which are relevant to your role
                    (eg Analytical, Ability to work under pressure, Work ethic,
                    Teamwork, Leadership, Management, Python, C++) with a brief
                    one-sentence example of when you have performed each of
                    these skills.
                </sub>
                <Row className=" py-0 m-0  border border-2">
                    {skills?.map((skill, index) => (
                        // <Col
                        //     key={index}
                        //     lg={6}
                        //     md={12}
                        //     sm={12}
                        //     xs={12}
                        //     className="my-2"
                        // >
                        <div className="d-flex align-items-center flex-wrap mx-2 my-2">
                            <Badge className="p-2 btn-color rounded-none w-auto text-nowrap">
                                {skill.title}
                                <i
                                    className="fa-solid fa-trash mx-2 cursor-pointer"
                                    onClick={() => removeSkill(index)}
                                ></i>
                            </Badge>
                        </div>
                        // </Col>
                    ))}
                </Row>
                {skills?.length == 0 ? (
                    <div
                        className="d-flex alig-items-center cursor-pointer builder__employment-link"
                        onClick={addNewFields}
                    >
                        <div>
                            <i className="fa-brands fa-plus"></i>
                        </div>
                        <label>Add Skills</label>
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit} className="my-2 ">
                        {skills?.map((item, index) => (
                            <div key={index}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="font-weight-bold ">
                                        Skill -{" "}
                                        {item?.title ? item.title : index + 1}
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
                                            onClick={() => removeSkill(index)}
                                        ></i>
                                    </div>
                                </div>
                                <Collapse isOpen={selectedItem === index}>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for={`title${index}`}>
                                                    Skill
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="title"
                                                    className="builder__input"
                                                    id={`title${index}`}
                                                    value={item.title}
                                                    onChange={(event) =>
                                                        handleChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    placeholder="Title"
                                                    onBlur={() => {
                                                        handleFocusOut(index);
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
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

                                                {skillDescription?.length >
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
                                                        {skillDescription?.map(
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
                                                        Please change the skill
                                                        if you want the (AI
                                                        Suggestions).
                                                    </sub>
                                                    <Input
                                                        type="textarea"
                                                        name="description"
                                                        className="builder__input my-3"
                                                        id={`description${index}`}
                                                        value={item.description}
                                                        onChange={(event) =>
                                                            handleChange(
                                                                index,
                                                                event
                                                            )
                                                        }
                                                        placeholder="Description"
                                                    />
                                                </FormGroup>
                                            </LoadingOverlay>
                                        </Col>
                                    </Row>
                                </Collapse>
                            </div>
                        ))}
                    </Form>
                )}
                {skills?.length > 0 ? (
                    <div className="d-flex justify-content-between">
                        <div
                            className="d-flex alig-items-center cursor-pointer"
                            onClick={() => {
                                addNewFields();
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
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Skills;
