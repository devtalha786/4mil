import ProgressBar from "@ramonak/react-progress-bar";
import ReactDOMServer from "react-dom/server";

import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import About from "../components/ResumeSteps/About";
import Employments from "../components/ResumeSteps/Employments";
import Skills from "../components/ResumeSteps/Skills";
import Education from "../components/ResumeSteps/Education";
import CvBuilder from "../components/CvBuilder";
import { useReactToPrint } from "react-to-print";
import Projects from "../components/ResumeSteps/Projects";
import { useHistory } from "react-router-dom";
import CheckOut from "./CheckOut";
import { useDispatch, useSelector } from "react-redux";
import { addCandidates, clearState } from "../store/actions/candidateAction";
import { getProfileStatement } from "../store/actions/builderAction";

const Builder = (props) => {
    const history = useHistory();
    const { getLoading } = useSelector((state) => state.candidate);
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [page, setPage] = useState("");
    const initialErrors = {
        email: "",
        phone: "",
        linkedIn: "",
    };
    const [errors, setErrors] = useState(initialErrors);
    console.log(errors.email, "Error");
    const [aboutDetails, setAboutDetails] = useState({
        name: "Beresford Johnson ",
        email: "4milProcess@gmail.com",
        phone: "06234234324",
        address: "4Mil Process Uk, Street#3",
        role: "Senior Management...",
        linkedIn: "www.linkedin.com/bjohnson",
        clearence: "SC",
        availablity: "2023-07-14",
        service: "Navy",
        statement:""
    });
    const [profile, setProfile] = useState({
        statement: "",
    });
    const [employments, setEmployments] = useState([
        {
            company: "NextPak",
            position: "Full Stack...",
            startDate: "2021-02-11",
            endDate: "2023-07-18",
            description: "",
            points: [
                {
                    activity:
                        "Established a Project Traceability Matrix, defining the ‘link through’ from the User Requirements to the System Requirements. This ‘flow through’ gave all stakeholders confidence that the Project was on track to deliver a service with no capability loss. ",
                },
            ],
        },
        {
            company: "Inception",
            position: "Senior...",
            startDate: "2022-07-14",
            endDate: "2022-12-14",
            description: "",
            points: [
                {
                    activity:
                        "Established a Project Traceability Matrix, defining the ‘link through’ from the User Requirements to the System Requirements. This ‘flow through’ gave all stakeholders confidence that the Project was on track to deliver a service with no capability loss. ",
                },
            ],
        },
    ]);
    const [skills, setSkills] = useState([
        {
            title: "Leadership",
            description:
                "I enjoy building strong relationships and recognise that it is vital to engage with all stakeholders, ensuring that their views and concerns are managed effectively.",
        },
        {
            title: "Analytical",
            description:
                "I always consider timing critical, so regularly evaluate timelines and resources, to ensure products/artefacts are released to the client at the agreed time with technical integrity. ",
        },
        {
            title: "Project Management ",
            description:
                "I have managed multiple successful products from 'initial idea to deliverable'. This has been done by implementing the structured approach to Project Management.",
        },
        {
            title: "Relationship and stakeholder management",
            description:
                "I have had the opportunity to lead and manage in many different environments. The experiences in my career have made me understand the key to good leadership is to be a role model, be calm and collected under pressure, invest and empower your team and embrace change.  ",
        },
        {
            title: "Collaboration",
            description:
                "I enjoy collaborating and finding a solution that benefits all parties. Through successful collaborating, I am always able to meet requirements set and forge new and innovative relationships.",
        },
        {
            title: "Ability to work under pressure ",
            description:
                "Many of my roles have required me to firstly conduct analysis on the proposed line of development, then secondly conduct the work with a focused view. Recently working in role as a Business Analyst, I’ve spent most of my time in low level detail, ensuring technical understanding from all parties.",
        },
    ]);
    const [education, setEducation] = useState([
        {
            // school: "Arid Agriculture University Rawalpindi",
            degree: "BSCS",
            level: "City & Guilds Level 7",
            yearAcheived: "2023",
        },
        {
            // school: "Punjab College Chakwal",
            degree: "ICS",
            level: "Ofqual Level 4",
            yearAcheived: "2016",
        },
        {
            // school: "Al-Rehman School Sadwal",
            degree: "Metric",
            level: "City & Guilds Level 4",
            yearAcheived: "2015",
        },
    ]);

    const [projects, setProjects] = useState([
        {
            projectName: "Google Clone",
            projectUrl: "https://www.google.com",
            projectDescription:
                "Developed and implemented TaskMaster, a full stack web application that facilitated task management and streamlined workflow for individuals and teams.",
        },
    ]);

    useEffect(() => {
        const calculateProgress = () => {
            const sections = [aboutDetails, employments, skills, education];
            const totalSections = sections.length;
            let completedSections = 0;
            //console.log(sections, "sections");
            sections?.forEach((section) => {
                if (Object?.keys(section)?.length > 0) {
                    completedSections++;
                }
            });

            const completionPercentage =
                (completedSections / totalSections) * 100;
            setProgress(completionPercentage);
        };

        calculateProgress();
    }, [aboutDetails, employments, skills, education]);
    const componentRef = useRef();
    const handleDownloadPdf = (e) => {
        e.preventDefault();
        history.push({
            pathname: "/pricing",
            state: {
                aboutDetails: aboutDetails,
                skills: skills,
                employments: employments,
                education: education,
                imagePreview: imagePreview,
            },
        });
    };
    const handlePrint = useReactToPrint({
        content: () => {
            const watermarkElement = document.createElement("div");
            watermarkElement.style.position = "fixed";
            watermarkElement.style.top = "50%";
            watermarkElement.style.left = "50%";
            watermarkElement.style.transform = "translate(-50%, -50%)";
            watermarkElement.style.color = "rgba(0, 0, 0, 0.3)";
            watermarkElement.style.fontSize = "24px";
            watermarkElement.innerText = "4Mil Watermark ";
            const printContent = componentRef?.current.cloneNode(true);
            printContent.appendChild(watermarkElement);
            return history.push({
                pathname: "/pricing",
                state: printContent.outerHTML,
            });
        },
    });
    const countTotalWords = () => {
        const aboutDetailsWords = Object.values(aboutDetails)
            .join(" ")
            .match(/\S+/g);
        const profileWords = Object.values(profile).join(" ").match(/\S+/g);
        const employmentsWords = employments
            .flatMap((employment) => {
                const employmentWords = Object.values(employment)
                    .join(" ")
                    .match(/\S+/g);
                const pointsWords = employment.points.flatMap((point) =>
                    Object.values(point).join(" ").match(/\S+/g)
                );
                return employmentWords.concat(pointsWords);
            })
            .flat();
        //console.log(profileWords, "profileWords");
        const skillsWords = skills
            .flatMap((skill) => Object.values(skill))
            .join(" ")
            .match(/\S+/g);
        const educationWords = education
            .flatMap((educationItem) => Object.values(educationItem))
            .join(" ")
            .match(/\S+/g);
        const totalWords =
            (aboutDetailsWords ? aboutDetailsWords.length : 0) +
            (profileWords ? profileWords.length : 0) +
            (employmentsWords ? employmentsWords.length : 0) +
            (skillsWords ? skillsWords.length : 0) +
            (educationWords ? educationWords.length : 0);
        return totalWords;
    };
    useEffect(() => {
        const totalWords = countTotalWords();
        //console.log(totalWords, "total");
        if (totalWords <= 515) {
            setPage("1");
        } else if (totalWords > 515) {
            setPage("2");
        } else if (totalWords >= 1030) {
            setPage("3");
        }
    }, [aboutDetails, profile, employments, skills, education]);
    useEffect(() => {
        const storedAboutDetails = JSON.parse(
            localStorage.getItem("aboutDetails")
        );
        if (storedAboutDetails) {
            setAboutDetails(storedAboutDetails);
        }
        const storedprofile = JSON.parse(localStorage.getItem("profile"));
        if (storedprofile) {
            setProfile(storedprofile);
        }
        const storedSkills = JSON.parse(localStorage.getItem("skills"));
        if (storedSkills) {
            setSkills(storedSkills);
        }
        const storedEducation = JSON.parse(localStorage.getItem("education"));
        if (storedEducation) {
            setEducation(storedEducation);
        }
        const storedEmployment = JSON.parse(
            localStorage.getItem("employments")
        );

        if (storedEmployment) {
            setEmployments(storedEmployment);
        }
    }, []);
    return (
        <Container fluid className="builder fsp-12">
            <Row className="my-2">
                <Col>
                    <div className="print-btn-container d-flex justify-content-end mb-3">
                        <Button
                            disabled={getLoading}
                            onClick={() => {
                                // handlePrint();
                                let obj = {
                                    name: aboutDetails.name,
                                    email: aboutDetails.email,
                                    role: "candidate",
                                    detail: {
                                        // about: {
                                        //     ...aboutDetails,
                                        //     statement: profile?.statement?.ops
                                        //         ? profile?.statement?.ops[0]
                                        //               ?.insert
                                        //         : profile?.statement,
                                        // },
                                        about:aboutDetails,
                                        employmentHistory: employments,
                                        qualification: education,
                                        skills: skills,
                                    },
                                };
                                if (aboutDetails.email != "" &&aboutDetails.name != ""&&aboutDetails.phone != ""&&aboutDetails.role != ""&&aboutDetails.availablity != "") {
                                    if (
                                        errors.email == "" &&
                                        errors.phone == "" &&
                                        errors.linkedIn == ""
                                    ) {
                                        dispatch(
                                            addCandidates(
                                                obj,
                                                aboutDetails.email,
                                                history
                                            )
                                        );
                                    } else {
                                        alert(
                                            "Please fill in all the fields correctly in About Section."
                                        );
                                    }
                                } else {
                                    alert(
                                        "Please must fill the mandatory fields in About Section"
                                    );
                                }
                            }}
                            className="btn-color btn  text-white"
                        >
                            {getLoading ? (
                                <Spinner size="sm" />
                            ) : (
                                `${"Download CV"}`
                            )}
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6}>
                    <div className="builder__leftCol">
                        <h4>CV status {progress}% completed</h4>
                        <ProgressBar
                            completed={progress}
                            bgColor="#38a169"
                            className="builder__progressbar"
                            height="5px"
                            width="60%"
                            isLabelVisible={false}
                        />
                        <About
                            aboutDetails={aboutDetails}
                            setAboutDetails={setAboutDetails}
                            // profile={profile}
                            // setProfile={setProfile}
                            errors={errors}
                            setErrors={setErrors}
                            image={image}
                            setImage={setImage}
                            imagePreview={imagePreview}
                            setImagePreview={setImagePreview}
                        />
                        <Skills skills={skills} setSkills={setSkills} />
                        <Education
                            education={education}
                            setEducation={setEducation}
                        />
                        <Employments
                            employments={employments}
                            setEmployments={setEmployments}
                            className="border border-2"
                        />
                    </div>
                    <div className="builder__print-btn-desktop mt-3 mb-1">
                        <Button
                            onClick={() => {
                                // handlePrint();
                                let obj = {
                                    name: aboutDetails.name,
                                    email: aboutDetails.email,
                                    role: "candidate",
                                    detail: {
                                        // about: {
                                        //     ...aboutDetails,
                                        //     statement: profile?.statement?.ops
                                        //         ? profile?.statement?.ops[0]
                                        //               ?.insert
                                        //         : profile?.statement,
                                        // },
                                        about:aboutDetails,
                                        employmentHistory: employments,
                                        qualification: education,
                                        skills: skills,
                                    },
                                };
                                if (aboutDetails.email != "" &&aboutDetails.name != ""&&aboutDetails.phone != ""&&aboutDetails.role != ""&&aboutDetails.availablity != "") {
                                    if (
                                        errors.email == "" &&
                                        errors.phone == "" &&
                                        errors.linkedIn == ""
                                    ) {
                                        dispatch(
                                            addCandidates(
                                                obj,
                                                aboutDetails.email,
                                                history
                                            )
                                        );
                                    } else {
                                        alert(
                                            "Please fill in all the fields correctly in About Section."
                                        );
                                    }
                                } else {
                                    alert(
                                        "Please must fill the mandatory fields in About Section"
                                    );
                                }
                            }}
                            className="btn-color btn  text-white"
                        >
                            Download CV
                        </Button>
                    </div>
                    {/* <Projects projects={projects} setProjects={setProjects} /> */}
                </Col>
                <Col lg={6} md={6} className="builder__rightCol shadow-lg">
                    <p className="text-center mt-2">1/{page}</p>
                    <div className="cv-container mt-n5" ref={componentRef}>
                        <CvBuilder
                            aboutDetails={aboutDetails}
                            profile={profile}
                            imagePreview={imagePreview}
                            employments={employments}
                            education={education}
                            skills={skills}
                            projects={projects}
                        />
                    </div>
                    <div className="builder__print-btn-mobile mt-3 mb-1">
                        <Button
                            onClick={() => {
                                // handlePrint();
                                let obj = {
                                    name: aboutDetails.name,
                                    email: aboutDetails.email,
                                    role: "candidate",
                                    detail: {
                                        // about: {
                                        //     ...aboutDetails,
                                        //     statement: profile?.statement?.ops
                                        //         ? profile?.statement?.ops[0]
                                        //               ?.insert
                                        //         : profile?.statement,
                                        // },
                                        about:aboutDetails,
                                        employmentHistory: employments,
                                        qualification: education,
                                        skills: skills,
                                    },
                                };
                                if (aboutDetails.email != "" &&aboutDetails.name != ""&&aboutDetails.phone != ""&&aboutDetails.role != ""&&aboutDetails.availablity != "") {
                                    if (
                                        errors.email == "" &&
                                        errors.phone == "" &&
                                        errors.linkedIn == ""
                                    ) {
                                        dispatch(
                                            addCandidates(
                                                obj,
                                                aboutDetails.email,
                                                history
                                            )
                                        );
                                    } else {
                                        alert(
                                            "Please fill in all the fields correctly in About Section."
                                        );
                                    }
                                } else {
                                    alert(
                                        "Please must fill the mandatory fields in About Section"
                                    );
                                }
                            }}
                            className="btn-color btn  text-white"
                        >
                            Download CV
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Builder;
