import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getCandidatesById } from "../store/actions/candidateAction";

import {
    Button,
    Col,
    Container,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
} from "reactstrap";
import CvBuilder from "../components/CvBuilder";
import LoadingOverlay from "react-loading-overlay";
import { useReactToPrint } from "react-to-print";
import {
    checkPaymentAction,
    clearState,
} from "../store/actions/checkoutAction";

import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    HeadingLevel,
    TabStopType,
    TabStopPosition,
} from "docx";
import fileDownload from "js-file-download";

// import htmlToDocx from "html-to-docx";
import { PDFDocument, rgb } from "pdf-lib";

export default function CV() {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const componentRef = useRef();

    const { getLoading, candidateById } = useSelector(
        (state) => state.candidate
    );
    const [downloadModal, setDownloadModal] = useState(false);
    const downloadtoggle = () => setDownloadModal(!downloadModal);
    const { checkPayment} = useSelector((state) => state.checkout);

    const createContactInfo = (name, profileUrl, email) => {
        const maxWidth = 500; // Total width of the paragraph
    
        // Calculate the widths for each element
        const nameWidth = 65;
        const profileUrlWidth = 65;
        const emailWidth = 65;
    
        // Calculate the padding for profile URL and email
        const profileUrlPadding = " ".repeat(
            (profileUrlWidth - profileUrl.length) / 2
        );
        const emailPadding = " ".repeat((emailWidth - email.length) / 2);
    
        return new Paragraph({
            children: [
                new TextRun({
                    text: name,
                    bold: true,
                    size: 30,
                    indent: { left: 0, hanging: nameWidth }, // Adjust the left and hanging values as needed
                }),
                new TextRun({
                    text: profileUrlPadding + profileUrl,
                    indent: { left: 0, hanging: profileUrlWidth }, // Adjust the left and hanging values as needed
                    color: "0000FF", // Blue color
                }),
                new TextRun({
                    text: emailPadding + email,
                    indent: { left: 0, hanging: emailWidth }, // Adjust the left and hanging values as needed
                    color: "0000FF", // Blue color
                }),
            ],
        });
    };
    
    const createHeaderBottom = (name, profileUrl, email) => {
        const maxWidth = 500; // Total width of the paragraph

        // Calculate the widths for each element
        const nameWidth = 85;
        const profileUrlWidth = 85;
        const emailWidth = 85;

        // Calculate the padding for profile URL and email
        const profileUrlPadding = " ".repeat(
            (profileUrlWidth - profileUrl.length) / 2
        );
        const emailPadding = " ".repeat((emailWidth - email.length) / 2);

        return new Paragraph({
            children: [
                new TextRun({
                    text: name,
                    bold: true,
                    width: nameWidth,
                    alignment: AlignmentType.LEFT,
                }),
                new TextRun({
                    text: profileUrlPadding + profileUrl,
                    width: profileUrlWidth,
                    alignment: AlignmentType.CENTER,
                }),
                new TextRun({
                    text: emailPadding + email,
                    width: emailWidth,
                    alignment: AlignmentType.RIGHT,
                }),
            ],
            spacing: {
                before: 100, // Adjust the value as needed
            },
        });
    };
    const createHeading = (text) => {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    color: "000000",
                    bold: true,
                    size: 25,
                }),
            ],
            spacing: {
                before: 200, // Adjust the value as needed
            },
        });
    };
    const createBottomHeading = (text) => {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    color: "000000",
                    bold: true,
                    size: 25,
                }),
            ],
            spacing: {
                before: 150, // Adjust the value as needed
            },
        });
    };
    const createPositionHeading = (text) => {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    color: "000000",
                    bold: true,
                    size: 25,
                }),
            ],
        });
    };
    const createSubHeading = (text) => {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    color: "000000",
                    size: 25,
                }),
            ],
            spacing: {
                before: 150, // Adjust the value as needed
            },
        });
    };

    const createQuaBullet = (text) => {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    size: 25,
                }),
            ],
            bullet: {
                level: 0,
            },
            indent: {
               left:400,
            },
            spacing: {
                before: 150, // Adjust the value as needed
            },
        });
    };
    const createBullet = (text, boldText) => {
        const boldIndex = text.indexOf(boldText);

        return new Paragraph({
            children: [
                new TextRun({
                    text: text.substring(0, boldIndex), // Text before bold part
                    size: 25,
                }),
                new TextRun({
                    text: boldText, // Bold part
                    size: 25,
                    bold: true,
                }),
                new TextRun({
                    text: text.substring(boldIndex + boldText.length), // Text after bold part
                    size: 25,
                }),
            ],
            bullet: {
                level: 0,
            },
            spacing: {
                before: 150, // Adjust the value as needed
            },
            indent: {
                left: 400, // Adjust the value as needed for left spacing
            },
        });
    };

    const splitParagraphIntoBullets = (text) => {
        return text.split("\n\n");
    };

    const generateDocument = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        createContactInfo(
                            candidateById?.detail?.about.name,
                            candidateById?.detail?.about.linkedIn,
                            candidateById?.detail?.about.email
                        ),
                        createHeaderBottom(
                            candidateById?.detail?.about.role,
                            candidateById?.detail?.about.address,
                            candidateById?.detail?.about.phone
                        ),
                        createHeading("Profile"),
                        createSubHeading(
                            candidateById?.detail?.about.statement
                                    ? candidateById?.detail?.about.statement
                                    : "Please Select the Suggestions if AI Suggest otherwise type your suggestions manually for your profile statement."
                        ),
                        createHeading("Key Skills"),

                        ...candidateById?.detail?.skills
                            .map((skill) => {
                                const arr = [];

                                const bulletPoints = splitParagraphIntoBullets(
                                    `${skill.title} - ${skill.description}`
                                );
                                bulletPoints.forEach((bulletPoint) => {
                                    arr.push(
                                        createBullet(bulletPoint, skill.title)
                                    );
                                });

                                return arr;
                            })
                            .reduce((prev, curr) => prev.concat(curr), []),
                        createHeading(
                            "Education & Professional Qualifications"
                        ),
                        ...candidateById?.detail?.qualification
                            .map((qua) => {
                                const arr = [];

                                const bulletPoints = splitParagraphIntoBullets(
                                    `${qua.yearAcheived} - ${qua.level} - ${qua.degree}`
                                );
                                bulletPoints.forEach((bulletPoint) => {
                                    arr.push(createQuaBullet(bulletPoint));
                                });

                                return arr;
                            })
                            .reduce((prev, curr) => prev.concat(curr), []),
                        createHeading("Employment History"),
                        ...candidateById?.detail?.employmentHistory?.flatMap(
                            (item) => {
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

                                return [
                                    createBottomHeading(
                                        `${startDateFormatted} to ${endDateFormatted}`
                                    ),
                                    createPositionHeading(item?.position),
                                    createSubHeading(
                                        item?.description != ""
                                            ? item?.description
                                            : "Please Select the Suggestions if AI Suggest otherwise type your suggestions manually for description."
                                    ),
                                    ...item?.points
                                        .map((point) => {
                                            const arr = [];

                                            const bulletPoints =
                                                splitParagraphIntoBullets(
                                                    point?.activity
                                                );
                                            bulletPoints.forEach(
                                                (bulletPoint) => {
                                                    arr.push(
                                                        createQuaBullet(
                                                            bulletPoint
                                                        )
                                                    );
                                                }
                                            );

                                            return arr;
                                        })
                                        .reduce(
                                            (prev, curr) => prev.concat(curr),
                                            []
                                        ),
                                ];
                            }
                        ),
                    ],
                },
            ],
        });

        const b64string = await Packer.toBase64String(doc);

        const link = document.createElement("a");
        link.href = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${b64string}`;
        link.download = "MyCV.docx";
        link.click();
    };
    const handlePrint = async () => {
        // Get the CV container element
        const cvContainer = componentRef.current;

        // // Create the watermark element
        // const watermarkElement = document.createElement("div");
        // watermarkElement.classList.add("watermark"); // Apply the watermark CSS class

        // // Set the watermark text
        // watermarkElement.innerText = "Formal";

        // // Append the watermark to the CV container
        // cvContainer.appendChild(watermarkElement);

        // Set the options for PDF generation
        const options = {
            margin: 10,
            filename: "CV.pdf",
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait",
                output: "save",
            },
            pagebreak: {
                mode: ["avoid-all", "css", "legacy"],
            },
        };

        try {
            // Convert the CV container to a PDF
            await html2pdf().from(cvContainer).set(options).save();
        } catch (error) {
            console.error("Error generating PDF:", error);
        }

        // Remove the watermark element after generating the PDF
        // cvContainer.removeChild(watermarkElement);
    };
    // function Export2Doc(element, filename = "") {
    //     var preHtml =
    //         "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9' crossorigin='anonymous'><style>body { font-family: Arial, sans-serif; } .about-name { font-size: 20px; margin-top: 6px !important; } @media (max-width: 1030px) { .about-name { font-size: 40px !important; } }</style></head><body>";
    //     var postHtml = "</body></html>";

    //     // var html = preHtml+document.getElementById(element).innerHTML+postHtml;
    //     var html = preHtml + element.current.innerHTML + postHtml;
    //     console.log(html, "html");
    //     // var html = preHtml+componentRef.current+postHtml;
    //     var blob = new Blob(["\ufeff", html], {
    //         type: "application/msword",
    //     });

    //     var url =
    //         "data:application/vnd.ms-word;charset=utf-8," +
    //         encodeURIComponent(html);

    //     filename = filename ? filename + ".doc" : "document.doc";

    //     var downloadLink = document.createElement("a");

    //     document.body.appendChild(downloadLink);

    //     if (navigator.msSaveOrOpenBlob) {
    //         navigator.msSaveOrOpenBlob(blob, filename);
    //     } else {
    //         downloadLink.href = url;

    //         downloadLink.download = filename;

    //         downloadLink.click();
    //     }

    //     document.body.removeChild(downloadLink);
    // }
    useEffect(() => {
        if (checkPayment == false) {
            history.push("/builder");
            dispatch(clearState());
        }
    }, [checkPayment]);
    useEffect(() => {
        dispatch(getCandidatesById(id));
        dispatch(checkPaymentAction(id));
    }, [id]);
    return (
        <Container>
            <Row className="my-2">
                <Col lg={12}>
                    <div className="print-btn-container d-flex justify-content-end mb-3">
                        <Button
                            onClick={() => {
                                downloadtoggle();
                            }}
                            className="btn-color btn  text-white"
                        >
                            Download CV
                        </Button>
                    </div>
                </Col>
            </Row>
            <LoadingOverlay active={getLoading} spinner text="CV Loading....">
                <Row className="d-flex align-items-center justify-content-center my-2">
                    <Col lg={8} md={12} sm={12} sx={10} className=" shadow-lg">
                        <div
                            className="cv-container"
                            id="exportContent"
                            ref={componentRef}
                        >
                            <CvBuilder
                                aboutDetails={candidateById?.detail?.about}
                                profile={candidateById?.detail?.about}
                                employments={
                                    candidateById?.detail?.employmentHistory
                                }
                                education={candidateById?.detail?.qualification}
                                skills={candidateById?.detail?.skills}
                            />
                        </div>
                    </Col>
                </Row>
            </LoadingOverlay>
            <Modal isOpen={downloadModal} toggle={downloadtoggle}>
                <ModalHeader toggle={downloadtoggle}>Download Box</ModalHeader>
                <ModalBody>
                    <h5 className="text-center ">Download As</h5>

                    <div className="d-flex justify-content-center align-items-center my-3">
                        <Button
                            onClick={() => {
                                handlePrint();
                                downloadtoggle();
                            }}
                            className="btn-color btn text-white"
                        >
                            Download as PDF
                        </Button>
                        <Button
                            onClick={() => {
                                // Export2Doc(componentRef, 'CV');
                                generateDocument();
                                downloadtoggle();
                            }}
                            className="btn-color mx-1 btn text-white"
                        >
                            Download as DOCX
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </Container>
    );
}
