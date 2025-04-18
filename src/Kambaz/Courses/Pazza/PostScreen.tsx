import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updatePost, deletePost } from "./client";

export default function PostScreen({
    post,
    posts,
    setPosts,     
    setSelectedPost,    
    users,
    currentUser
}: {
    post: any;
    posts: any[];
    setPosts: (posts: any[]) => void;       
    setSelectedPost: (post: any) => void;      
    users: any[];
    currentUser: any;
}) {

    if (!post) {
        // Show Class at a Glance if no post is selected
        const totalPosts = posts.length;
        const unreadPosts = posts.filter(p => !p.read).length;
        const unansweredPosts = posts.filter(p => !p.answered).length;
        const instructorResponses = posts.filter(p => p.role === "Instructor").length;
        const studentResponses = posts.filter(p => p.role === "Student").length;
        const studentCount = users.filter(u => u.role === "STUDENT").length;

        return (
            <div style={{ padding: "20px" }}>
                <h2>📊 Class at a Glance</h2>
                <ul style={{ fontSize: "1rem", listStyle: "none", padding: 0 }}>
                    <li>✅ {unreadPosts === 0 ? "no unread posts" : `${unreadPosts} unread posts`}</li>
                    <li>✅ {unansweredPosts === 0 ? "no unanswered posts" : `${unansweredPosts} unanswered posts`}</li>
                    <li>📌 {totalPosts} total posts</li>
                    <li>👨‍🏫 {instructorResponses} instructor responses</li>
                    <li>👨‍🎓 {studentResponses} student responses</li>
                    <li>👥 {studentCount} students enrolled</li>
                </ul>
            </div>
        );
    }

    const [editing, setEditing] = useState(false);
    const [editedPost, setEditedPost] = useState(post);

    // Prepare name and role checks
    const fullName = `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`.trim().toLowerCase();
    const authorName = (post?.author || "").trim().toLowerCase();
    const isInstructor = ["FACULTY"].includes(currentUser?.role?.toUpperCase());
    const isAuthor = fullName === authorName;

    const handleDelete = async (post: any) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;
        await deletePost(post._id);
        setPosts(posts.filter(p => p._id !== post._id));
        setSelectedPost(null);
    };


    // Render the selected post
    return (
        <div style={{ padding: "20px" }}>
            {editing ? (
                <>
                    <input
                        type="text"
                        value={editedPost.title}
                        onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                        style={{ fontSize: "1.5em", marginBottom: "10px", width: "100%" }}
                    />
                    <ReactQuill
                        theme="snow"
                        value={editedPost.body}
                        onChange={(value) => setEditedPost({ ...editedPost, body: value })}
                    />
                    <button onClick={async () => {
                        const updated = await updatePost(editedPost);
                        setEditedPost(updated);
                        setEditing(false);
                    }}>💾 Save</button>
                    <button onClick={() => setEditing(false)} style={{ marginLeft: "8px" }}>❌ Cancel</button>
                </>
            ) : (
                <>
                    <h2>{post.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: post.body }} />
                </>
            )}


            <div style={{ fontStyle: "italic", fontSize: "0.9em", marginTop: "8px" }}>
                Posted by {post.author} ({post.role}) - {post.createdAt}
            </div>

            {post.folders && post.folders.length > 0 && (
                <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {post.folders.map((folder: string) => (
                        <span
                            key={folder}
                            style={{
                                backgroundColor: "#f0f0f0",
                                padding: "4px 8px",
                                borderRadius: "12px",
                                fontSize: "0.8em",
                                border: "1px solid #ccc"
                            }}
                        >
                            📁 {folder}
                        </span>
                    ))}
                </div>
            )}

            {(isAuthor || isInstructor) && (
                <div style={{ marginTop: "12px" }}>
                    <button onClick={() => setEditing(true)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(post)} style={{ marginLeft: "8px" }}>🗑️ Delete</button>
                </div>

            )}
        </div>
    );
}
