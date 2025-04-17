export default function PostScreen({ post, posts, users }: { post: any, posts: any[], users: any[] }) {
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

    // Show regular post viewer when a post is selected
    return (
        <div style={{ padding: "20px" }}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
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
        </div>
    );
}
