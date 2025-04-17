import { useState } from "react";
import { useDispatch } from "react-redux";
import { markPostAsRead, profile } from "../../Account/client";
import { setCurrentUser } from "../../Account/reducer";

export default function Sidebar({
    onSelect,
    onNewPost,
    posts,
    selectedFolder,
    onClearFilter
}: {
    onSelect: (post: any) => void;
    onNewPost: () => void;
    posts: any[];
    selectedFolder: string;
    onClearFilter: () => void;
}) {
    const stripHtml = (html: string) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    };
    const dispatch = useDispatch();

    const [query, setQuery] = useState("");

    const filtered = posts.filter(
        (post) =>
            (selectedFolder === "all" || post.folders?.includes(selectedFolder)) &&
            (post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.body.toLowerCase().includes(query.toLowerCase()))
    );


    return (
        <div style={{
            width: "300px",
            borderRight: "1px solid #ccc",
            padding: "16px",
            height: "calc(100vh - 108px)", // adjust for nav + filters
            overflowY: "auto"
        }}>

            <button onClick={onNewPost} style={{ marginBottom: "10px" }}>
                + New Post
            </button>
            <br />
            {selectedFolder !== "all" && (
                <div style={{
                    marginBottom: "10px",
                    padding: "8px 12px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    fontSize: "0.85em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                }}>
                    <span>Filtering on:</span>
                    <span style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        {selectedFolder}
                        <span
                            onClick={onClearFilter}
                            style={{
                                marginLeft: "6px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            ×
                        </span>
                    </span>
                </div>
            )}
            <input
                type="text"
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: "100%", marginBottom: "16px", padding: "8px" }}
            />

            <div>
                {filtered.map((post) => (
                    <div
                        key={post._id}
                        style={{ marginBottom: "16px", cursor: "pointer" }}
                        onClick={() => {
                            onSelect(post);
                            markPostAsRead(post._id).then(() => {
                                profile().then(updatedUser => {
                                    dispatch(setCurrentUser(updatedUser));
                                });
                            });
                        }}

                    >
                        <strong>{post.title}</strong>
                        <p style={{ margin: 0, fontSize: "0.9em" }}>
                            {stripHtml(post.body).slice(0, 60)}...
                        </p>
                        <div style={{ fontSize: "0.8em", color: "#555" }}>
                            {post.role} - {post.author} | {post.createdAt}
                            {post.folders && post.folders.length > 0 && (
                                <div style={{ fontSize: "0.75em", color: "#007bff", marginTop: "2px" }}>
                                    📁 {post.folders.join(", ")}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
