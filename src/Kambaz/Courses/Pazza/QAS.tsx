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


export default function QAS() {
    const { cid } = useParams();
    const [selectedPost, setSelectedPost] = useState(null);
    const [showNewPost, setShowNewPost] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<string>("all");

    const [posts, setPosts] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);

    const handleNewPost = (post: any) => {
        const coursePost = { ...post, course: cid };
        createPost(coursePost).then((newPost) => {
            setPosts([newPost, ...posts]);
            setSelectedPost(newPost);
            setShowNewPost(false);
        });
    };


    useEffect(() => {
        if (cid) {
            findPostsByCourse(cid).then(setPosts);
            findAllUsers().then(setAllUsers);
        }
    }, [cid]);


    return (
        <div>
            <Navigation />
            <Filters selected={selectedFolder} onSelect={setSelectedFolder} />
            <div style={{ display: "flex" }}>
                <Sidebar
                    posts={posts}
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

                <div style={{ flex: 1 }}>
                    {showNewPost ? (
                        <NewPost onPost={handleNewPost} onCancel={() => setShowNewPost(false)} />
                    ) : (
                        <PostScreen post={selectedPost} posts={posts} users={allUsers} />
                    )}
                </div>
            </div>
        </div>
    );
}
