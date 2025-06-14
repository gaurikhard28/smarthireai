import React, { useState } from "react";
import { Card, Modal, Button, Upload, Typography, Radio, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useSaveResumeUrlMutation} from "../slices/uploadResume/uploadApiSlice"


const ResumeUploadPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [isModalVisibleInterviewer, setIsModalVisibleInterviewer] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [saveResume] = useSaveResumeUrlMutation();
    const [resume, setResume] = useState(null);
    const [resumeType, setResumeType] = useState("");
    const userType = localStorage.getItem("userType") || "interviewee";// Get user type from localStorage.   
    const [companyCriteria, setCompanyCriteria] = useState("");
    const [uploadedResumes, setUploadedResumes] = useState([]);
    const navigate = useNavigate();
    const [resumeID, setResumeID] = useState("");

    const options = [
        { id: 1, title: "IT Sector", description: "Upload your resume for IT jobs." },
        { id: 2, title: "Finance Sector", description: "Upload your resume for Finance jobs." },
        { id: 3, title: "Healthcare Sector", description: "Upload your resume for Healthcare jobs." },
        { id: 4, title: "Education Sector", description: "Upload your resume for Education jobs." },
        { id: 5, title: "Marketing Sector", description: "Upload your resume for Marketing jobs." },
        { id: 6, title: "Engineering Sector", description: "Upload your resume for Engineering jobs." },
        { id: 7, title: "Sales Sector", description: "Upload your resume for Sales jobs." },
        { id: 8, title: "Human Resources Sector", description: "Upload your resume for HR jobs." },
        { id: 9, title: "Legal Sector", description: "Upload your resume for Legal jobs." },
        { id: 10, title: "Creative Sector", description: "Upload your resume for Creative jobs." },
        // Add other sectors here...
    ];

    const showModal = (option) => {
        setSelectedOption(option);
        if (userType === "interviewee") {
            setIsModalVisible(true);
        } else {
            setIsModalVisibleInterviewer(true);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalVisible1(false);
        setIsModalVisibleInterviewer(false);
        setSelectedOption("");
    };

    const handleUpload = async() => {

        console.log("Resume Type:", resumeType);
        console.log("Resume:", resume);
        if (!resume) {
            alert("Please upload a resume before submitting.");
            return;
        }
        try{
        setIsModalVisible(false);
        setIsLoading(true);

        console.log("Uploading resume:", resume,isloading,isModalVisible1);
        const userId = localStorage.getItem("user_id")||"9efda808-73dd-4fb1-ad57-a6c3f57e136b"; 
        const {data} = await saveResume({ user_id: userId ,file: resume ,resume_type: resumeType});
        console.log('ress',data);
        if (data?.resume_id) {
            console.log("Resume uploaded successfully:", data);
            setResumeID(data.resume_id); // Store the resume ID for future reference
            setIsModalVisible1(true);
            setResume(null); // Reset resume after successful upload
        }
        }
        catch(error){
           console.error(error);
        }
        finally {
                    setIsLoading(false);
                    setResume(null); // Reset resume after successful upload


        }   
    };

    const handleInterviewerNext = () => {
        console.log("Company Criteria:", companyCriteria);
        console.log("Uploaded Resumes:", uploadedResumes);
        setIsModalVisibleInterviewer(false);
        setIsModalVisible1(true);
    };

    return (
        <div style={{ padding: "40px", backgroundColor: "#f0f2f5", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1 style={{ marginBottom: "40px", color: "#001529", textAlign: "center" }}>
                Select Your Resume Type
            </h1>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                {options.map((option) => (
                    <Card
                        key={option.id}
                        title={<div style={{ textAlign: "center" }}>{option.title}</div>}
                        style={{
                            width: 300,
                            textAlign: "center",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s, box-shadow 0.3s",
                        }}
                        hoverable
                        onClick={() => { showModal(option.title); setResumeType(option.title); setResume(null); }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                        }}
                        headStyle={{
                            backgroundColor: "#001529",
                            color: "#fff",
                            borderRadius: "10px 10px 0 0",
                        }}
                    >
                        <p style={{ color: "#595959" }}>{option.description}</p>
                    </Card>
                ))}
            </div>

            {/* Modal for Interviewee */}
            <Modal
                title={
                    <div style={{ textAlign: "center", fontWeight: 600, fontSize: 22 }}>
                        {`Upload Resume for ${selectedOption}`}
                    </div>
                }
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
                bodyStyle={{ padding: "32px 24px" }}
            >
                <div style={{ textAlign: "center" }}>
                    <Upload
                        beforeUpload={(file) => {
                            setResume(file);
                            return false;
                        }}
                        showUploadList={resume ? [{ name: resume.name }] : false}
                    >
                        <Button
                            icon={<UploadOutlined />}
                            style={{
                                backgroundColor: "#001529",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                marginTop: "10px",
                                marginBottom: "20px",
                                width: "100%",
                                height: "40px",
                                fontWeight: 500,
                                fontSize: 16,
                            }}
                        >
                            {resume ? "Change File" : "Click to Upload"}
                        </Button>
                    </Upload>
                    <Button
                        style={{
                            backgroundColor: "#001529",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            marginTop: "10px",
                            width: "100%",
                            height: "40px",
                            fontWeight: 500,
                            fontSize: 16,
                        }}
                        onClick={handleUpload}
                    >
                        Submit
                    </Button>
                </div>
            </Modal>

            {/* Modal for Interviewer */}
            <Modal
                title={
                    <div style={{ textAlign: "center", fontWeight: 600, fontSize: 22 }}>
                        {`Upload Requirements for ${selectedOption}`}
                    </div>
                }
                open={isModalVisibleInterviewer}
                onCancel={handleCancel}
                footer={null}
                centered
                bodyStyle={{ padding: "32px 24px" }}
            >
                <div style={{ textAlign: "center" }}>
                    <Input.TextArea
                        rows={4}
                        placeholder="Enter company requirements and criteria"
                        value={companyCriteria}
                        onChange={(e) => setCompanyCriteria(e.target.value)}
                        style={{ marginBottom: "20px", borderRadius: 6, fontSize: 16 }}
                    />
                    <Upload
                        multiple
                        beforeUpload={(file) => {
                            setUploadedResumes((prev) => [...prev, file]);
                            return false;
                        }}
                        showUploadList={uploadedResumes.map(f => ({ name: f.name }))}
                    >
                        <Button
                            icon={<UploadOutlined />}
                            style={{
                                backgroundColor: "#001529",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                marginBottom: "20px",
                                width: "100%",
                                height: "40px",
                                fontWeight: 500,
                                fontSize: 16,
                            }}
                        >
                            Upload Resumes
                        </Button>
                    </Upload>
                    <Button
                        style={{
                            backgroundColor: "#1890ff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            width: "100%",
                            height: "40px",
                            fontWeight: 500,
                            fontSize: 16,
                        }}
                        onClick={handleInterviewerNext}
                    >
                        Next
                    </Button>
                </div>
            </Modal>

            {/* Success Modal */}
            <Modal
                title={
                    <div style={{ textAlign: "center", fontWeight: 600, fontSize: 22 }}>
                        Upload Complete
                    </div>
                }
                open={isModalVisible1}
                onCancel={handleCancel}
                footer={null}
                centered
                bodyStyle={{ padding: "32px 24px" }}
            >
                <div style={{ textAlign: "center" }}>
                    <Typography.Title level={4} style={{ color: "#52c41a", marginBottom: 8 }}>
                        Process Completed Successfully!
                    </Typography.Title>
                    <Typography.Text style={{ fontSize: 16, color: "#595959" }}>
                        Your data has been submitted successfully. We will analyze it and get back to you shortly.
                    </Typography.Text>
                    <Button
                        style={{
                            backgroundColor: "#001529",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            marginTop: "24px",
                            width: "100%",
                            height: "40px",
                            fontWeight: 500,
                            fontSize: 16,
                        }}
                        onClick={() => {
                            userType === 'interviewer'
                                ? navigate(`/${userType}/compare`)
                                : navigate(`/${userType}/analyze/${resumeID}`);
                        }}
                    >
                        Go to Analyze Page
                    </Button>
                </div>
            </Modal>
{            console.log("User Type:", isloading)}           
{/* Loading Spinner & Progress Bar as Modal */}
<Modal
    open={isloading}
    footer={null}
    closable={false}
    centered
    bodyStyle={{ textAlign: "center", padding: 40 }}
    maskStyle={{ background: "rgba(255,255,255,0.7)" }}
>
    <Typography.Title level={3} style={{ color: "#001529" }}>Analysing...</Typography.Title>
    <div style={{ width: '100%', marginTop: 8 }}>
        <div style={{
            width: "100%",
            height: 8,
            background: "#f0f0f0",
            borderRadius: 4,
            overflow: "hidden"
        }}>
            <div style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, #001529 40%, #40a9ff 100%)",
                animation: "progressBar 1.2s linear infinite"
            }} />
        </div>
    </div>
</Modal>
            <style>
                {`
                @keyframes progressBar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                `}
            </style>
        </div>
    );
};

export default ResumeUploadPage;