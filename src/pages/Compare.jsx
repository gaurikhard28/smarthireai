import React, { useState } from "react";

const Compare = () => {
    const [resumes, setResumes] = useState([
        {
            name: "John Doe",
            skills: ["JavaScript", "React", "Node.js"],
            projects: ["E-commerce App", "Portfolio Website"],
            score: 85,
            experience: "3 years",
            education: "B.Sc. in Computer Science",
            contact: {
                email: "john.doe@example.com",
                phone: "123-456-7890",
            },
            comparisons: {
                resumeMatch: 80,
                experience: 70,
                education: 90,
            },
        },
        {
            name: "Jane Smith",
            skills: ["Python", "Django", "Machine Learning"],
            projects: ["Chatbot", "Data Analysis Tool"],
            score: 90,
            experience: "5 years",
            education: "M.Sc. in Data Science",
            contact: {
                email: "jane.smith@example.com",
                phone: "987-654-3210",
            },
            comparisons: {
                resumeMatch: 85,
                experience: 95,
                education: 88,
            },
        },
        {
            name: "Alice Johnson",
            skills: ["Java", "Spring Boot", "Microservices"],
            projects: ["Banking System", "Inventory Management"],
            score: 80,
            experience: "4 years",
            education: "B.Tech. in Information Technology",
            contact: {
                email: "alice.johnson@example.com",
                phone: "456-789-1234",
            },
            comparisons: {
                resumeMatch: 75,
                experience: 80,
                education: 85,
            },
        },
    ]);

    return (
        <div style={{ display: "flex", padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#eef2f7", minHeight: "100vh" }}>
            {/* Sidebar for Resume Rankings */}
            <div
                style={{
                    width: "30%",
                    borderRight: "1px solid #ddd",
                    padding: "20px",
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                }}
            >
                <h3 style={{ textAlign: "center", color: "#003366", marginBottom: "20px" }}>Resume Rankings</h3>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {resumes
                        .sort((a, b) => b.score - a.score)
                        .map((resume, index) => (
                            <li
                                key={index}
                                style={{
                                    marginBottom: "15px",
                                    padding: "15px",
                                    backgroundColor: index % 2 === 0 ? "#f0f8ff" : "#e6f7ff",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.02)";
                                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                                }}
                            >
                                <strong style={{ fontSize: "16px", color: "#003366" }}>{index + 1}. {resume.name}</strong>
                                <p style={{ margin: "5px 0", color: "#003366" }}>Score: {resume.score}%</p>
                                <div style={{ marginTop: "10px" }}>
                                    <p style={{ margin: "5px 0", color: "#003366" }}>Resume Match:</p>
                                    <div style={{ backgroundColor: "#ddd", borderRadius: "5px", overflow: "hidden", height: "10px", marginBottom: "10px" }}>
                                        <div style={{ width: `${resume.comparisons.resumeMatch}%`, backgroundColor: "#4caf50", height: "100%" }}></div>
                                    </div>
                                    <p style={{ margin: "5px 0", color: "#003366" }}>Experience:</p>
                                    <div style={{ backgroundColor: "#ddd", borderRadius: "5px", overflow: "hidden", height: "10px", marginBottom: "10px" }}>
                                        <div style={{ width: `${resume.comparisons.experience}%`, backgroundColor: "#2196f3", height: "100%" }}></div>
                                    </div>
                                    <p style={{ margin: "5px 0", color: "#003366" }}>Education:</p>
                                    <div style={{ backgroundColor: "#ddd", borderRadius: "5px", overflow: "hidden", height: "10px", marginBottom: "10px" }}>
                                        <div style={{ width: `${resume.comparisons.education}%`, backgroundColor: "#ff9800", height: "100%" }}></div>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>

            {/* Main Content for Resume Comparison */}
            <div
                style={{
                    flex: 1,
                    padding: "20px",
                    marginLeft: "20px",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                }}
            >
                {resumes.map((resume, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            marginBottom: "20px",
                            padding: "20px",
                            backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.02)";
                            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                        }}
                    >
                        <h4 style={{ color: "#003366", marginBottom: "10px" }}>{resume.name}</h4>
                        <p style={{ margin: "5px 0", color: "#003366" }}><strong>Contact:</strong> {resume.contact.email} | {resume.contact.phone}</p>
                        <p style={{ margin: "5px 0", color: "#003366" }}><strong>Skills:</strong> {resume.skills.join(", ")}</p>
                        <p style={{ margin: "5px 0", color: "#003366" }}><strong>Projects:</strong> {resume.projects.join(", ")}</p>
                        <p style={{ margin: "5px 0", color: "#003366" }}><strong>Experience:</strong> {resume.experience}</p>
                        <p style={{ margin: "5px 0", color: "#003366" }}><strong>Education:</strong> {resume.education}</p>
                        <p style={{ margin: "5px 0", color: "#003366" }}><strong>Score:</strong> {resume.score}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Compare;