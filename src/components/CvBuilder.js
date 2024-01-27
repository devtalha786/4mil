import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import img from "../assets/img/images.jpg";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
const disableCopy = () => {
    const elements = document.querySelectorAll(".disable-copy");

    elements.forEach((element) => {
        element.oncopy = (event) => {
            event.preventDefault();
        };
    });
};

const CvBuilder = ({
    aboutDetails,
    employments,
    education,
    skills,
    profile,
    projects,
    imagePreview,
}) => {
    const removeHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };
    //console.log(profile, "profile");
    const [update,setUpdate]=useState(true)
    const getWindowWidth = () => {
        if (typeof window !== "undefined") {
            return window.innerWidth;
        }
        return 0;
    };

    const isMobile = getWindowWidth() <= 991;
    const mystyle = {
        marginTop: "6px",
        fontSize: isMobile ? "20px" : "14px",
    };
     const handleResize=()=>{
        setUpdate(prevState=>!prevState)
     }
    // Media query for screens with max-width 1030px
    useEffect(() => {
        getWindowWidth();
    }, [isMobile]);
    useEffect(() => {
        window.addEventListener("resize",handleResize)
        disableCopy();
        return ()=>{
            window.removeEventListener("resize",handleResize)
        }
    }, []);
    return (
        <>
            <Row className="p-3 disable-copy">
                <Col md={12} className="p-3 m-0">
                    {/* <Row>
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                }}
                                alt=""
                            />
                        ) : (
                            <img
                                src={img}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                }}
                                alt=""
                            />
                        )}
                    </Row> */}
                    <Row className="my-4">
                        <Col md={12} lg={4}>
                            {/* <div className="d-flex align-items-center"> */}
                            {/* <i class="fa-solid fa-location-dot mr-2"></i> */}
                            <h2
                                className=" m-0 font-weight-bold about-name"
                            >
                                {aboutDetails?.name}
                            </h2>
                            <p className=" font-weight-bold about-role">
                                {aboutDetails?.role}
                            </p>
                            {/* </div> */}
                        </Col>
                        <Col md={12} lg={4} sm={12}>
                            {/* <div className="d-flex align-items-center ">
                                <i class="fa-solid fa-phone mr-2"></i> */}
                            <div className="  align-items-center mt-2 ">
                                <h6 className="about-detail link">
                                    {aboutDetails?.email}
                                </h6>
                                <h6 className="about-detail">
                                    {aboutDetails?.address}
                                </h6>
                            </div>
                            {/* </div> */}
                        </Col>
                        <Col md={12} lg={4}>
                            <div className="  mt-2  ">
                                <h6 className=" about-detail  link">
                                    {aboutDetails?.linkedIn}
                                </h6>
                                <h6
                                    className="about-detail"
                                    // style={{ marginLeft: "50px" }}
                                >
                                    {aboutDetails?.phone}
                                </h6>
                            </div>
                        </Col>

                        {/* <Col md={3}> */}
                        {/* <div className="d-flex align-items-center ">
                                <i class="fa-solid fa-envelope mr-2"></i> */}

                        {/* </div> */}
                        {/* </Col> */}
                    </Row>

                    <div>
                        <h6 className="font-weight-bold builder__rightCol-h4">
                            Profile
                        </h6>
                        <p className="text-justify">
                            {/* {removeHtmlTags(
                                profile?.statement?.ops
                                    ? profile?.statement?.ops[0]?.insert
                                    : profile?.statement != ""
                                    ? profile?.statement
                                    : "Please Select the Suggestions if AI Suggest otherwise type your suggestions manually for your profile statement."
                            )} */}
                            {removeHtmlTags(
                                aboutDetails?.statement
                                    ? aboutDetails?.statement
                                    : "Please Select the Suggestions if AI Suggest otherwise type your suggestions manually for your profile statement."
                            )}
                        </p>
                    </div>
                    <div className="my-4">
                        {" "}
                        <h6 className="font-weight-bold builder__rightCol-h4">
                            Key Skills
                        </h6>
                        <div className="mx-3">
                            {skills &&
                                skills?.map((skill) => {
                                    return (
                                        <ul>
                                            <li className="mb-0 text-justify">
                                                {" "}
                                                <b>{skill?.title}</b> {"-"}{" "}
                                                {skill.description}
                                            </li>
                                        </ul>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="my-4">
                        <h6 className="font-weight-bold builder__rightCol-h4">
                            Education & Professional Qualifications
                        </h6>
                        <div className="mx-3">
                            {education &&
                                education?.map((edu) => {
                                    return (
                                        <ul>
                                            <li className="mb-0 text-justify">
                                                {edu?.yearAcheived} -{" "}
                                                {edu?.level} - {edu?.degree}
                                            </li>
                                        </ul>
                                    );
                                })}
                        </div>
                    </div>
                    <div>
                        <h6 className="font-weight-bold builder__rightCol-h4">
                            Employment History
                        </h6>
                        {employments?.map((item) => {
                            const startDate = new Date(item?.startDate);
                            const endDate = new Date(item?.endDate);

                            const startDateFormatted = startDate
                                .toLocaleString("en-US", {
                                    // day: "2-digit",
                                    month: "short",
                                    year: "2-digit",
                                })
                                .replace(/,/g, "");

                            const endDateFormatted = endDate
                                .toLocaleString("en-US", {
                                    // day: "2-digit",
                                    month: "short",
                                    year: "2-digit",
                                })
                                .replace(/,/g, "");

                            return (
                                <>
                                    <div className="my-4">
                                        <p className="mb-0 font-weight-bold">
                                            {startDateFormatted} to{" "}
                                            {endDateFormatted}
                                        </p>
                                        <p className="mb-0 font-weight-bold">
                                            {item?.position} - {item?.company}
                                        </p>
                                        <p className="mb-0 text-justify mt-3">
                                            {item?.description != ""
                                                ? item?.description
                                                : "Please Select the Suggestions if AI Suggest otherwise type your suggestions manually for description."}
                                        </p>
                                        <div className="mt-3 mx-3">
                                            {item &&
                                                item?.points?.map((act) => {
                                                    return (
                                                        <ul>
                                                            <li className="text-justify">
                                                                {act?.activity}
                                                            </li>
                                                        </ul>
                                                    );
                                                })}
                                        </div>
                                        {/* <p className="mb-0">
            {item?.company} -{" "}
            {item?.employmentType}
        </p> */}
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    {/* <div>
                        <h4 className="font-weight-bold builder__rightCol-h4">
                            Projects
                        </h4>
                        {projects &&
                            projects?.map((edu) => {
                                return (
                                    <div className="">
                                        <b className="mb-0 pb-0">
                                            {edu?.projectName} -{" "}
                                            <Link to={`${edu?.projectUrl}`}>
                                                Preview
                                            </Link>
                                        </b>
                                        <p>{edu?.projectDescription}</p>
                                    </div>
                                );
                            })}
                    </div> */}
                </Col>
            </Row>
        </>
    );
};

export default CvBuilder;
