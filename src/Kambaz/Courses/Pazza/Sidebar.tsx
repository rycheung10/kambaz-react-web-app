import { useState } from "react";
import { useDispatch } from "react-redux";
import { markPostAsRead, profile } from "../../Account/client";
import { setCurrentUser } from "../../Account/reducer";

export default function Sidebar({
    onSelect,
    onNewPost,
    posts,
    selectedFolder,
    selectedPost, // Pass from QAS.tsx
    onClearFilter,
    currentUser, // Pass the currentUser to check visibility
}: {
    onSelect: (post: any) => void;
    onNewPost: () => void;
    posts: any[];
    selectedFolder: string;
    selectedPost: any;
    onClearFilter: () => void;
    currentUser: any; // currentUser to filter visibility
}) {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [collapsedCategories, setCollapsedCategories] = useState<{ [key: string]: boolean }>({});

    const stripHtml = (html: string) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    };

    // Filter posts based on visibility and search query
    const filtered = posts.filter(
        (post) => {
            if (
                (selectedFolder === "all" || post.folders?.includes(selectedFolder)) &&
                (post.title.toLowerCase().includes(query.toLowerCase()) ||
                    post.body.toLowerCase().includes(query.toLowerCase()))
            ) {
                // Check if the post is visible to the current user
                if (post.visibility.includes("entire")) {
                    return true; // Visible to everyone
                } else if (post.visibility.includes(currentUser._id)) {
                    return true; // Visible to selected viewers, including the current user
                }
            }
            return false;
        }
    );

    // Group posts by date
    const groupPostsByDate = () => {
        const today = new Date();
        const groups: { [key: string]: any[] } = {
            Today: [],
            Yesterday: [],
            "Last Week": [],
        };

        filtered.forEach((post) => {
            const postDate = new Date(post.createdAt);
            const dayDiff = Math.floor((today.getTime() - postDate.getTime()) / (1000 * 3600 * 24));

            if (dayDiff === 0) {
                groups.Today.push(post);
            } else if (dayDiff === 1) {
                groups.Yesterday.push(post);
            } else if (dayDiff <= 7) {
                groups["Last Week"].push(post);
            } else {
                const startOfWeek = new Date(postDate);
                startOfWeek.setDate(postDate.getDate() - postDate.getDay());
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);

                const formatDate = (date: Date) => {
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                };

                const weekRange = `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
                if (!groups[weekRange]) {
                    groups[weekRange] = [];
                }
                groups[weekRange].push(post);
            }
        });

        return groups;
    };

    const groupedPosts = groupPostsByDate();

    const toggleCategory = (category: string) => {
        setCollapsedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <div
            style={{
                width: "300px",
                borderRight: "1px solid #ccc",
                padding: "16px",
                height: "calc(100vh - 108px)",
                overflowY: "auto",
                backgroundColor: "#ffffff",
            }}
        >
            <button
                onClick={onNewPost}
                style={{
                    marginBottom: "12px",
                    backgroundColor: "rgb(72, 113, 157)",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
            >
                + New Post
            </button>

            {selectedFolder !== "all" && (
                <div
                    style={{
                        marginBottom: "12px",
                        padding: "8px 12px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "8px",
                        fontSize: "0.85em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <span>Filtering on:</span>
                    <span
                        style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {selectedFolder}
                        <span
                            onClick={onClearFilter}
                            style={{
                                marginLeft: "6px",
                                cursor: "pointer",
                                fontWeight: "bold",
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
                style={{
                    width: "100%",
                    marginBottom: "16px",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                }}
            />

            <div>
                {Object.keys(groupedPosts).map((category) => {
                    const postsInCategory = groupedPosts[category];

                    return (
                        <div key={category}>
                            <button
                                style={{
                                    display: "block",
                                    width: "100%",
                                    textAlign: "left",
                                    backgroundColor: "#f1f1f1",
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    fontWeight: "bold",
                                    marginBottom: "8px",
                                }}
                                onClick={() => toggleCategory(category)}
                            >
                                {category}
                                <span style={{ float: "right" }}>
                                    {collapsedCategories[category] ? "▲" : "▼"}
                                </span>
                            </button>
                            <div
                                style={{
                                    display: collapsedCategories[category] ? "none" : "block",
                                    paddingLeft: "16px",
                                }}
                            >
                                {postsInCategory.map((post) => {
                                    const isSelected = selectedPost?._id === post._id;
                                    return (
                                        <div
                                            key={post._id}
                                            style={{
                                                marginBottom: "16px",
                                                cursor: "pointer",
                                                backgroundColor: isSelected ? "#e6f0ff" : "transparent",
                                                borderLeft: isSelected ? "4px solid #007bff" : "none",
                                                paddingLeft: isSelected ? "8px" : "0px",
                                                borderRadius: "6px",
                                                padding: "8px",
                                                transition: "background-color 0.2s",
                                            }}
                                            onClick={() => {
                                                onSelect(post);
                                                markPostAsRead(post._id).then(() => {
                                                    profile().then((updatedUser) => {
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
                                            </div>
                                            {post.folders && post.folders.length > 0 && (
                                                <div
                                                    style={{
                                                        fontSize: "0.75em",
                                                        color: "#007bff",
                                                        marginTop: "4px",
                                                    }}
                                                >
                                                    📁 {post.folders.join(", ")}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
