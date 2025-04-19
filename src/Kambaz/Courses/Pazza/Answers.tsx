import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updatePost } from "./client";

export default function Answers({
    post,
    newAnswer,
    setNewAnswer,
    handleSubmitAnswer,
    handleAnswerDelete,
    currentUser,
    setPost,
}: {
    post: any;
    newAnswer: string;
    setNewAnswer: (newAnswer: string) => void;
    handleSubmitAnswer: () => void;
    handleAnswerDelete: (answerType: "student" | "instructor") => void;
    currentUser: any;
    setPost: (updatedPost: any) => void; 
}) {
    const isInstructor = ["FACULTY", "INSTRUCTOR"].includes(currentUser?.role?.toUpperCase());
    const fullName = `${currentUser?.firstName} ${currentUser?.lastName}`.trim().toLowerCase();
    const isAuthor = (author: string) => author?.toLowerCase() === fullName;

    const [showStudentMenu, setShowStudentMenu] = useState(false);
    const [showInstructorMenu, setShowInstructorMenu] = useState(false);

    const [editingType, setEditingType] = useState<"student" | "instructor" | null>(null);
    const [editedAnswer, setEditedAnswer] = useState("");

    const handleSaveEdit = async () => {
        if (!editingType) return;
        const field = editingType === "student" ? "studentAnswers" : "instructorAnswers";
    
        const updatedField = {
            ...post[field],
            body: editedAnswer,
            updatedAt: new Date().toLocaleString(),
        };
    
        const updatedPost = {
            ...post,
            [field]: updatedField
        };
    
        await updatePost(updatedPost);       // sync to backend
        setPost(updatedPost);                // update UI
        setEditingType(null);
        setEditedAnswer("");
    };
    

    const renderOptionsMenu = (type: "student" | "instructor") => {
        const toggle = type === "student" ? showStudentMenu : showInstructorMenu;
        const setToggle = type === "student" ? setShowStudentMenu : setShowInstructorMenu;
        const answer = post[type === "student" ? "studentAnswers" : "instructorAnswers"];

        return (
            <div style={{ position: "relative", display: "inline-block", marginLeft: "10px" }}>
                <button
                    onClick={() => setToggle(!toggle)}
                    style={{
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        cursor: "pointer",
                        fontSize: "0.85em"
                    }}
                >
                    Actions
                </button>
                {toggle && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            backgroundColor: "white",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            padding: "5px",
                            zIndex: 1,
                            boxShadow: "0 2px 5px rgba(0,0,0,0.15)"
                        }}
                    >
                        <button
                            onClick={() => {
                                setEditingType(type);
                                setEditedAnswer(answer.body);
                                setToggle(false);
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "0.85em",
                                marginBottom: "5px"
                            }}
                        >
                            📝 Edit
                        </button>
                        <br />
                        <button
                            onClick={() => {
                                handleAnswerDelete(type);
                                setToggle(false);
                            }}
                            style={{
                                color: "red",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "0.85em"
                            }}
                        >
                            🗑️ Delete
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <div style={{ marginTop: "30px" }}>
                <h3>Student Answer</h3>
                {post.studentAnswers ? (
                    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                        {editingType === "student" ? (
                            <>
                                <ReactQuill value={editedAnswer} onChange={setEditedAnswer} />
                                <button onClick={handleSaveEdit}>💾 Save</button>
                                <button onClick={() => setEditingType(null)} style={{ marginLeft: "8px" }}>❌ Cancel</button>
                            </>
                        ) : (
                            <>
                                <div dangerouslySetInnerHTML={{ __html: post.studentAnswers.body }} />
                                <div style={{ display: "flex", alignItems: "center", fontSize: "0.85em", fontStyle: "italic", marginTop: "5px" }}>
                                    <span>— {post.studentAnswers.author}, {post.studentAnswers.createdAt}</span>
                                    {(isInstructor || isAuthor(post.studentAnswers.author)) && renderOptionsMenu("student")}
                                </div>
                            </>
                        )}
                    </div>
                ) : <p>No student answer yet.</p>}

                <h3>Instructor Answer</h3>
                {post.instructorAnswers ? (
                    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                        {editingType === "instructor" ? (
                            <>
                                <ReactQuill value={editedAnswer} onChange={setEditedAnswer} />
                                <button onClick={handleSaveEdit}>💾 Save</button>
                                <button onClick={() => setEditingType(null)} style={{ marginLeft: "8px" }}>❌ Cancel</button>
                            </>
                        ) : (
                            <>
                                <div dangerouslySetInnerHTML={{ __html: post.instructorAnswers.body }} />
                                <div style={{ display: "flex", alignItems: "center", fontSize: "0.85em", fontStyle: "italic", marginTop: "5px" }}>
                                    <span>— {post.instructorAnswers.author}, {post.instructorAnswers.createdAt}</span>
                                    {(isInstructor || isAuthor(post.instructorAnswers.author)) && renderOptionsMenu("instructor")}
                                </div>
                            </>
                        )}
                    </div>
                ) : <p>No instructor answer yet.</p>}

                <div style={{ marginTop: "20px" }}>
                    <h4>Your Answer</h4>
                    <ReactQuill theme="snow" value={newAnswer} onChange={setNewAnswer} />
                    <button onClick={handleSubmitAnswer}>Submit Answer</button>
                </div>
            </div>
        </div>
    );
}
