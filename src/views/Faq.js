import { useEffect, useState } from "react";
import { Col, Collapse, Container, Row } from "reactstrap";

export default function Faq() {
    const [IsOpenJob, setIsOpenJob] = useState(false);
    const [IsOpenCvBuilder, setIsOpenCvBuilder] = useState(false);
    const [IsOpenMyData, setIsOpenMyData] = useState(false);
    const [IsOpenBenefits, setIsOpenBenefits] = useState(false);
    const [IsOpenTips, setIsOpenTips] = useState(false);
    const toggleJobApplication = () => {
        setIsOpenJob(!IsOpenJob);
    };
    const toggleCvBuilder = () => {
        setIsOpenCvBuilder(!IsOpenCvBuilder);
    };
    const toggleMyData = () => {
        setIsOpenMyData(!IsOpenMyData);
    };
    const toggleBenefits = () => {
        setIsOpenBenefits(!IsOpenBenefits);
    };
    const toggleTips = () => {
        setIsOpenTips(!IsOpenTips);
    };

    return (
        <Container className="my-4">
            <Row className="border border-2 shadow-sm p-3">
                <Col>
                    <div
                        className="d-flex justify-content-between align-items-center pointer"
                     
                        onClick={() => {
                            toggleJobApplication();
                            setIsOpenJob(!IsOpenJob);
                        }}
                    >
                        <h6 className="mb-0 pb-0 font-weight-bold">
                            What makes 4Mil the perfect tool to prepare your job
                            application?
                        </h6>
                        <i
                            className={`fas ${
                                IsOpenJob ? "fa-chevron-up" : "fa-chevron-down"
                            }`}
                        ></i>
                    </div>
                    <Collapse isOpen={IsOpenJob}>
                        <Row>
                            <Col>
                                <p className="text-justify my-3">
                                    4Mil helps you create a CV to be proud of.
                                    It's modern and people remember it. The tool
                                    guides you every step of the process, so you
                                    can highlight your achievements, attitude,
                                    and personality. It's easy. By using 4Mil,
                                    you can take advantage of:
                                </p>
                                <div className="mx-3">
                                    <ul className="mx-5 mx-md-5  d-block ">
                                        <li>Easy to use CV Builder.</li>
                                        <li className="text-justify">
                                            Built-in content improvements
                                            according to your job title and
                                            experience, as well as proofing
                                            suggestions.
                                        </li>
                                        <li>
                                            CV Tailoring feature that helps you
                                            customise your CV to the job
                                            application.
                                        </li>
                                        <li>
                                            A CV Builder that creates a CV that
                                            is ATS-friendy.
                                        </li>
                                        <li>
                                            Downloading your CV in PDF or
                                            Word.doc formats.
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Collapse>
                </Col>
            </Row>
            <Row className="my-4 border border-2 shadow-sm p-3">
                <Col>
                    <div
                        className="d-flex justify-content-between align-items-center pointer"
                        onClick={() => {
                            toggleCvBuilder();
                            setIsOpenCvBuilder(!IsOpenCvBuilder);
                        }}
                    >
                        <h6 className="mb-0 pb-0 font-weight-bold">
                            How do I use 4Mil CV Builder?
                        </h6>
                        <i
                            className={`fas ${
                                IsOpenCvBuilder
                                    ? "fa-chevron-up"
                                    : "fa-chevron-down"
                            }`}
                        ></i>
                    </div>
                    <Collapse isOpen={IsOpenCvBuilder}>
                        <Row>
                            <Col>
                                <p className="text-justify my-3">
                                    To create a CV with 4Mil, follow the
                                    simple steps below:
                                </p>
                                <div className="mx-3">
                                    <ul className="mx-5 mx-md-5  d-block ">
                                        <li>
                                            Fill in your basic{" "}
                                            <b>about me information</b>, as well
                                            as your <b>CV role headline.</b>
                                        </li>
                                        <li className="text-justify">
                                            Write/choose a memorable{" "}
                                            <b>CV Professional Summary.</b>
                                        </li>
                                        <li className="text-justify">
                                            Don’t forget to include your
                                            <b>education and qualification</b>,
                                            with details such as{" "}
                                            <b>
                                                course and level of
                                                qualification.
                                            </b>
                                        </li>
                                        <li>
                                            Your CV should be around 2-3 pages.
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Collapse>
                </Col>
            </Row>
            <Row className="my-4 border border-2 shadow-sm p-3">
                <Col>
                    <div
                        className="d-flex justify-content-between align-items-center pointer"
                        onClick={() => {
                            toggleMyData();
                            setIsOpenMyData(!IsOpenMyData);
                        }}
                    >
                        <h6 className="mb-0 pb-0 font-weight-bold">
                            What happens to my data?
                        </h6>
                        <i
                            className={`fas ${
                                IsOpenMyData
                                    ? "fa-chevron-up"
                                    : "fa-chevron-down"
                            }`}
                        ></i>
                    </div>
                    <Collapse isOpen={IsOpenMyData}>
                        <Row>
                            <Col>
                                <p className="text-justify my-3">
                                    We take security very seriously, and believe
                                    ‘persec’ is of the utmost importance. We
                                    store all data securely in the cloud and go
                                    through regular third party assurance
                                    checks, to validate that we're using best
                                    practice.
                                </p>
                            </Col>
                        </Row>
                    </Collapse>
                </Col>
            </Row>
            <Row className="my-4 border border-2 shadow-sm p-3">
                <Col>
                    <div
                        className="d-flex justify-content-between align-items-center pointer"
                        onClick={() => {
                            toggleBenefits();
                            setIsOpenBenefits(!IsOpenBenefits);
                        }}
                    >
                        <h6 className="mb-0 pb-0 font-weight-bold">
                            What are the benefits of being on the 4Mil Employer
                            facing Database?
                        </h6>
                        <i
                            className={`fas ${
                                IsOpenBenefits
                                    ? "fa-chevron-up"
                                    : "fa-chevron-down"
                            }`}
                        ></i>
                    </div>
                    <Collapse isOpen={IsOpenBenefits}>
                        <Row>
                            <Col>
                                <p className="text-justify my-3">
                                    As founders of 4Mil, we have had diverse
                                    careers in the British Army. We understand
                                    that the knowledge, skills and experience
                                    gathered by you; as service personnel,
                                    position you as valuable assets to any
                                    organisation.
                                </p>
                                <p className="text-justify my-3">
                                    A life in the military indicates that you
                                    are:
                                </p>
                                <p className="text-justify my-3">
                                    Professional, adaptable, flexible, able to
                                    learn quickly, a great communicator, able to
                                    speak to people from all walks of life,
                                    trustworthy..... the list goes on.
                                </p>
                                <p className="text-justify my-3">
                                    Being included in our secure Employers'
                                    facing database, will help us align you to
                                    reputable companies and ultimately
                                    fulfilling roles.
                                </p>
                                <p className="text-justify my-3">
                                    Our aim, is to champion the skillset of the
                                    Service Leaver and promote quality people
                                    into quality roles.
                                </p>
                            </Col>
                        </Row>
                    </Collapse>
                </Col>
            </Row>
            <Row className="my-4 border border-2 shadow-sm p-3">
                <Col>
                    <div
                        className="d-flex justify-content-between align-items-center pointer"
                        onClick={() => {
                            toggleTips();
                            setIsOpenTips(!IsOpenTips);
                        }}
                    >
                        <h6 className="mb-0 pb-0 font-weight-bold">
                            Top tip - Prepare for your interview!
                        </h6>
                        <i
                            className={`fas ${
                                IsOpenTips ? "fa-chevron-up" : "fa-chevron-down"
                            }`}
                        ></i>
                    </div>
                    <Collapse isOpen={IsOpenTips}>
                        <Row>
                            <Col>
                                <p className="text-justify my-3">
                                    Though we are firm believers in ‘No cuff,
                                    too tough’, we advise putting the work into
                                    interview prep. Below are a few top tips.
                                </p>
                                <p className="text-justify my-3">
                                    Check the company website/LinkedIn.
                                </p>
                                <p className="text-justify my-3">
                                    Here are a few common interview preparation
                                    questions that can help you practice and
                                    prepare:
                                </p>
                                <div className="mx-3">
                                    <ol className="mx-5 mx-md-5  d-block ">
                                        <li>Tell me about yourself.</li>
                                        <li className="text-justify">
                                            What interests you about our
                                            company/organisation?
                                        </li>
                                        <li className="text-justify">
                                            Can you describe a time when you
                                            faced a professional challenge and
                                            how you overcame it?
                                        </li>
                                        <li className="text-justify">
                                            What are your strengths and
                                            weaknesses?
                                        </li>
                                        <li className="text-justify">
                                            {" "}
                                            How do you handle working in a team
                                            or collaborating with others?
                                        </li>
                                        <li className="text-justify">
                                            Tell me about a time when you had to
                                            meet a tight deadline.
                                        </li>
                                        <li className="text-justify">
                                            {" "}
                                            How do you handle stress or pressure
                                            in the workplace?
                                        </li>
                                        <li>
                                            What motivates you in your work?
                                        </li>
                                        <li className="text-justify">
                                            Can you provide an example of a time
                                            when you demonstrated leadership
                                            skills?
                                        </li>
                                        <li className="text-justify">
                                            How do you stay updated with
                                            industry trends or new developments
                                            in your field?
                                        </li>
                                        <li className="text-justify">
                                            How would colleagues describe you,
                                            in three words?
                                        </li>
                                        <li>What is your current situation?</li>
                                        <li>
                                            What is your salary expectation?
                                        </li>
                                    </ol>
                                </div>
                                <p className="text-justify my-3">
                                    Remember to practice your responses and try
                                    to provide specific examples from your
                                    experiences. It's also helpful to research
                                    the company and the job role you're applying
                                    for to tailor your answers accordingly. Good
                                    luck with your interview!
                                </p>
                            </Col>
                        </Row>
                    </Collapse>
                </Col>
            </Row>
        </Container>
    );
}
