import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Col,
    Collapse,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Tooltip,
    UncontrolledTooltip,
} from "reactstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ReactQuill from "react-quill";
import { InputLabel, MenuItem, Select } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import ProfileStatement from "./ProfileStatement";
import { getProfileStatement } from "../../store/actions/builderAction";
import { useDispatch, useSelector } from "react-redux";
import badge from "../../assets/img/ibadge.png";
import LoadingOverlay from "react-loading-overlay";
const About = ({
    aboutDetails,
    setAboutDetails,
    // profile,
    // setProfile,
    errors,
    setErrors,
    // image,
    // setImage,
    // setImagePreview,
    // previewImage,
}) => {
    const [IsOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!IsOpen);
    };
    const [tooltipRoleOpen, setTooltipRoleOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipServiceOpen, setServiceTooltipOpen] = useState(false);
    const [tooltipAvailablityOpen, setAvailablityTooltipOpen] = useState(false);
    const { profileStatement, suggestionLoading } = useSelector(
        (state) => state.builder
    );
    //console.log(profileStatement, "profileStatement");
    const dispatch = useDispatch();
    const colors = [
        "bg-primary",
        "bg-success",
        "bg-danger",
        "bg-warning",
        "bg-info",
    ];
    //console.log(aboutDetails, "about");

    const handlePhoneNumberChange = (value) => {
        console.log(value, "value");

        let name = "phone";
        if (name === "phone" && value !== "") {
            const phoneRegex = /^\+?\d{1,16}$/; // Modify the regex pattern to {1,16}
            if (!phoneRegex.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    phone: "Invalid phone number",
                }));
            } else {
                setErrors((prev) => ({ ...prev, phone: "" }));
            }
        }
        const updatedAboutDetails = {
            ...aboutDetails,
            [name]: value,
        };
        setAboutDetails(updatedAboutDetails);
        const storedAboutDetails =
            JSON.parse(localStorage.getItem("aboutDetails")) || aboutDetails;
        localStorage.setItem(
            "aboutDetails",
            JSON.stringify({ ...storedAboutDetails, [name]: value })
        );
    };
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name, value);
        const updatedAboutDetails = {
            ...aboutDetails,
            [name]: value,
        };
        if (name === "email" && value !== "") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    email: "Invalid email address",
                }));
            } else {
                setErrors((prev) => ({ ...prev, email: "" }));
            }
        }

        if (name === "linkedIn" && value !== "") {
            const urlRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/;
            if (!urlRegex.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    linkedIn: "Invalid LinkedIn URL",
                }));
            } else {
                setErrors((prev) => ({ ...prev, linkedIn: "" }));
            }
        }
        setAboutDetails(updatedAboutDetails);
        const storedAboutDetails =
            JSON.parse(localStorage.getItem("aboutDetails")) || aboutDetails;
        localStorage.setItem(
            "aboutDetails",
            JSON.stringify({ ...storedAboutDetails, [name]: value })
        );
    };
    const handleFocusOut = () => {
        dispatch(getProfileStatement({ role: aboutDetails?.role }));
    };
    const handleSuggest = (item) => {
        let name = "statement";
        const updatedAboutDetails = {
            ...aboutDetails,
            [name]: item,
        };
        setAboutDetails(updatedAboutDetails);
        const storedAboutDetails =
            JSON.parse(localStorage.getItem("aboutDetails")) || aboutDetails;
        localStorage.setItem(
            "aboutDetails",
            JSON.stringify({ ...storedAboutDetails, [name]: item })
        );
    };
    // const handleImage = (event) => {
    //     const file = event.target.files[0];
    //     const validImageTypes = ["image/jpg", "image/png", "image/jpeg"];

    //     if (validImageTypes.includes(file.type)) {
    //         // Create a FileReader instance
    //         setImage(file);
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setImagePreview(reader.result);
    //         };
    //         // Read the image file as a data URL
    //         reader.readAsDataURL(file);
    //     } else {
    //         alert("Only png/jpg formats acceptable");
    //         event.target.value = "";
    //         setImage(null);
    //     }
    // };
    return (
        <>
            <div className="my-3 border border-2 p-2 shadow-sm">
                <Form className="my-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0 pb-0 font-weight-bold">About</h4>

                        <i
                            onClick={() => {
                                toggle();
                                setIsOpen(!IsOpen);
                            }}
                            className={`fas ${
                                IsOpen ? "fa-chevron-up" : "fa-chevron-down"
                            }`}
                        ></i>
                    </div>

                    <Collapse isOpen={IsOpen}>
                        <Row>
                            {/* <Col md={12}>
                                <FormGroup>
                                    <Label>Upload Your Image</Label>
                                    <Input type="file" onChange={handleImage} />
                                </FormGroup>
                            </Col> */}
                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <Label>
                                        Name{" "}
                                        <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        className="builder__input  "
                                        placeholder="Full Name"
                                        name="name"
                                        value={aboutDetails?.name}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <Label>
                                        Email{" "}
                                        <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                        type="email"
                                        className="builder__input"
                                        placeholder="Email address"
                                        name="email"
                                        value={aboutDetails?.email}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    {errors.email && (
                                        <span className="text-danger">
                                            {errors.email}
                                        </span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <div>
                                        <Label>
                                            Role{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Tooltip
                                            isOpen={tooltipRoleOpen}
                                            target="badge4"
                                            toggle={() =>
                                                setTooltipRoleOpen(
                                                    !tooltipRoleOpen
                                                )
                                            }
                                        >
                                            Current Role
                                        </Tooltip>
                                        <img
                                            id="badge4"
                                            src={badge}
                                            width="20px"
                                            className="ml-2 d-inline-block cursor-pointer"
                                        />
                                    </div>
                                    <Input
                                        type="text"
                                        className="builder__input"
                                        placeholder="Job Title"
                                        name="role"
                                        value={aboutDetails?.role}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        onBlur={() => {
                                            handleFocusOut();
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <Label>Location</Label>
                                    <Input
                                        type="text"
                                        className="builder__input"
                                        placeholder="County/Town"
                                        name="address"
                                        value={aboutDetails?.address}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <div>
                                        <Label>
                                            Date of Availability{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Tooltip
                                            isOpen={tooltipAvailablityOpen}
                                            target="badge3"
                                            toggle={() =>
                                                setAvailablityTooltipOpen(
                                                    !tooltipAvailablityOpen
                                                )
                                            }
                                        >
                                            These details will not be placed on
                                            your CV. These details remain on the
                                            4Mil database, so that we can align
                                            you to potential opportunities
                                        </Tooltip>
                                        <img
                                            id="badge3"
                                            src={badge}
                                            width="20px"
                                            className="ml-2 d-inline-block cursor-pointer"
                                        />
                                    </div>

                                    <Input
                                        type="date"
                                        className="builder__input"
                                        placeholder="DD/MM/YYYY"
                                        name="availablity"
                                        value={aboutDetails?.availablity}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <Label>LinkedIn</Label>
                                    <Input
                                        type="text"
                                        className="builder__input"
                                        placeholder="URL"
                                        name="linkedIn"
                                        value={aboutDetails?.linkedIn}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                    {errors.linkedIn && (
                                        <span className="text-danger">
                                            {errors.linkedIn}
                                        </span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <div>
                                        <Label className="">Clearence</Label>
                                        <Tooltip
                                            isOpen={tooltipOpen}
                                            target="badge"
                                            toggle={() =>
                                                setTooltipOpen(!tooltipOpen)
                                            }
                                        >
                                            These details will not be placed on
                                            your CV. These details remain on the
                                            4Mil database, so that we can align
                                            you to potential opportunities
                                        </Tooltip>
                                        <img
                                            id="badge"
                                            src={badge}
                                            width="20px"
                                            className="ml-2 d-inline-block cursor-pointer"
                                        />
                                    </div>

                                    {/* <Input
                                        type="text"
                                        className="builder__input"
                                        placeholder="your clearence"
                                        name="clearence"
                                        value={aboutDetails?.clearence}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    /> */}
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        style={{ width: "150px" }}
                                        name="clearence"
                                        required
                                        value={aboutDetails?.clearence}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    >
                                        <MenuItem value="SC">SC</MenuItem>
                                        <MenuItem value="DV">DV</MenuItem>
                                        <MenuItem value="N/A">N/A</MenuItem>
                                    </Select>
                                </FormGroup>
                            </Col>
                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <div>
                                        <Label>Service</Label>
                                        <Tooltip
                                            isOpen={tooltipServiceOpen}
                                            target="badge2"
                                            toggle={() =>
                                                setServiceTooltipOpen(
                                                    !tooltipServiceOpen
                                                )
                                            }
                                        >
                                            These details will not be placed on
                                            your CV. These details remain on the
                                            4Mil database, so that we can align
                                            you to potential opportunities
                                        </Tooltip>
                                        <img
                                            id="badge2"
                                            src={badge}
                                            width="20px"
                                            className="ml-2 d-inline-block cursor-pointer"
                                        />
                                    </div>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        style={{ width: "150px" }}
                                        name="service"
                                        required
                                        value={aboutDetails?.service}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    >
                                        <MenuItem value="Navy">Navy</MenuItem>
                                        <MenuItem value="RAF">RAF</MenuItem>
                                        <MenuItem value="Army">Army</MenuItem>
                                        <MenuItem value="N/A">N/A</MenuItem>
                                    </Select>
                                </FormGroup>
                            </Col>
                            <Col md={6} sm={12}>
                                <FormGroup>
                                    <Label>
                                        Phone{" "}
                                        <span className="text-danger">*</span>
                                    </Label>
                                    {/* <Input
                                        type="text"
                                        className="builder__input"
                                        placeholder="Phone"
                                        name="phone"
                                        value={aboutDetails?.phone}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    /> */}
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        defaultCountry="RU"
                                        value={aboutDetails?.phone}
                                        onChange={handlePhoneNumberChange}
                                    />
                                    {errors.phone && (
                                        <span className="text-danger">
                                            {errors.phone}
                                        </span>
                                    )}
                                </FormGroup>
                            </Col>
                            <LoadingOverlay
                                active={suggestionLoading}
                                spinner
                                text="Suggestions Loading...."
                            >
                                <Col md={12}>
                                    <Label className="d-block">
                                        Suggestions for Profile Statement
                                    </Label>

                                    {profileStatement?.length == 0 ? (
                                        <p className="text-danger">
                                            "Please change your Role and choose
                                            the Ai suggesstions!"
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                    {profileStatement?.length > 0 && (
                                        <div>
                                            {profileStatement?.map(
                                                (item, index) => (
                                                    <>
                                                        <Button
                                                            id={`suggestion_${index}`}
                                                            key={index}
                                                            className={`text-white rounded-pill my-2 ${
                                                                colors[
                                                                    index %
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
                                                                    item
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
                                                            target={`#suggestion_${index}`}
                                                            autohide={false}
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

                                    <h4 className="mt-2">
                                        Professional Statement
                                    </h4>
                                    <sub className="text-justify">
                                        Write 2-4 short & energetic sentences to
                                        interest the reader! Mention your role,
                                        experience & most importantly - your
                                        biggest achievements, best qualities and
                                        skills.
                                    </sub>
                                    <FormGroup>
                                        <Input
                                            type="textarea"
                                            name="statement"
                                            className="builder__input mt-2"
                                            value={aboutDetails?.statement}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                    </FormGroup>

                                    {/* <ProfileStatement
                                        profile={profile}
                                        setProfile={setProfile}
                                    /> */}
                                </Col>
                            </LoadingOverlay>
                        </Row>
                    </Collapse>
                </Form>
            </div>
        </>
    );
};

export default About;
