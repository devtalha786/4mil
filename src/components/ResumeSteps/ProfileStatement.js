import React, { useEffect, useRef } from "react";
import { Col, Row } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CustomReactQuill = ({ value, onChange }) => {
    const quillRef = useRef(null);
    //console.log(value, "valuee");
    useEffect(() => {
        const quill = quillRef.current?.getEditor();
        const handleChange = () => {
            const content = quill?.getContents();
            onChange(content);
        };
        quill?.on("text-change", handleChange);
        return () => {
            quill?.off("text-change", handleChange);
        };
    }, [onChange]);

    return <ReactQuill ref={quillRef} theme="snow" value={value} />;
};
const ProfileStatement = ({ profile, setProfile, aboutDetails }) => {
    const handlePersonalStatement = (content) => {
        //console.log(content, "content");
        const updatedProfile = {
            statement: content,
        };
        setProfile(updatedProfile);
        const storedProfile =
            JSON.parse(localStorage.getItem("profile")) || profile;
        localStorage.setItem(
            "profile",
            JSON.stringify({ ...storedProfile, statement: content })
        );
    };

    return (
        <>
            <Row>
                <Col md={12}>
                    <h4 className="mt-2">Professional Statement</h4>
                    <sub className="text-justify">
                        Write 2-4 short & energetic sentences to interest the
                        reader! Mention your role, experience & most importantly
                        - your biggest achievements, best qualities and skills.
                    </sub>
                    <CustomReactQuill
                        theme="snow"
                        value={profile?.statement}
                        onChange={handlePersonalStatement}
                        name="statement"
                    />
                </Col>
            </Row>
        </>
    );
};

export default ProfileStatement;
