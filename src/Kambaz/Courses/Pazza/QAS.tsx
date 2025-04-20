import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Filters from "./Filters";
import Sidebar from "./Sidebar";
import PostScreen from "./PostScreen";
import NewPost from "./NewPost";
import { createPost, findPostsByCourse } from "./client";
import { findAllUsers } from "../../Account/client";
import { useParams } from "react-router-dom";
import { markPostAsRead } from "../../Account/client";
import { useSelector } from "react-redux";
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export default function QAS() {
    const { cid } = useParams();
    const [selectedPost, setSelectedPost] = useState(null);
    const [showNewPost, setShowNewPost] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<string>("all");

    const [posts, setPosts] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [folders, setFolders] = useState<string[]>([]);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    const [sidebarVisible, setSidebarVisible] = useState(true); // State to toggle sidebar visibility

    const handleNewPost = (post: any) => {
        const coursePost = { ...post, course: cid };
        createPost(coursePost).then((newPost) => {
            setPosts([newPost, ...posts]);
            setSelectedPost(newPost);
            setShowNewPost(false);
        });
    };

    const fetchCourse = async () => {
        try {
            console.log("Fetching course:", cid);
            const { data } = await axiosWithCredentials.get(`${COURSES_API}/${cid}`);
            setFolders(data.folders || []); // fallback in case folders is undefined
        } catch (error) {
            console.error("Failed to fetch course:", error);
        }
    };

    useEffect(() => {
        if (cid) {
            fetchCourse();
            findPostsByCourse(cid).then(setPosts);
            findAllUsers().then(setAllUsers);
        }
    }, [cid]);

    return (
        <div>
            <Navigation />
            <Filters folders={folders} selected={selectedFolder} onSelect={setSelectedFolder} />

            {/* TLOPS Button to toggle sidebar */}
            <button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                style={{
                    zIndex: 1000,  
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    padding: "10px", 
                    color: "#007bff",  
                    fontWeight: "bold",
                    display: "flex",  
                    alignItems: "center", 
                    justifyContent: "center",
                }}
            >
                {sidebarVisible ? "◁" : "▷"}
            </button>

            <div style={{ display: "flex" }}>
                {/* Sidebar */}
                {sidebarVisible && (
                    <Sidebar
                        posts={posts}
                        selectedPost={selectedPost}
                        onSelect={(post) => {
                            setSelectedPost(post);
                            markPostAsRead(post._id);
                        }}
                        onNewPost={() => {
                            setShowNewPost(true);
                            setSelectedPost(null);
                        }}
                        selectedFolder={selectedFolder}
                        onClearFilter={() => setSelectedFolder("all")}
                    />
                )}

                <div style={{ flex: 1 }}>
                    {showNewPost ? (
                        <NewPost currentUser={currentUser} onPost={handleNewPost} onCancel={() => setShowNewPost(false)} availableFolders={folders} />
                    ) : (
                        <PostScreen
                            post={selectedPost}
                            posts={posts}
                            setPosts={setPosts}
                            setSelectedPost={setSelectedPost}
                            users={allUsers}
                            currentUser={currentUser}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
