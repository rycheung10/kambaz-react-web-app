import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updatePost } from "./client";

export default function FUD({
  post,
  posts,
  setPosts,
  setSelectedPost,
  currentUser
}: {
  post: any;
  posts: any[];
  setPosts: (posts: any[]) => void;
  setSelectedPost: (post: any) => void;
  currentUser: any;
}) {
  const [newFUD, setNewFUD] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedFudBody, setEditedFudBody] = useState("");
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [openReplyMenuIndex, setOpenReplyMenuIndex] = useState<number | null>(null);

  const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});
  const [replyingToIndex, setReplyingToIndex] = useState<number | null>(null);

  const [editingReply, setEditingReply] = useState<{ fudIdx: number, replyIdx: number } | null>(null);
  const [editedReplyBody, setEditedReplyBody] = useState("");

  const handleAddFUD = async () => {
    if (!newFUD.trim()) return alert("Discussion text is required.");

    const fud = {
      body: newFUD,
      author: `${currentUser.firstName} ${currentUser.lastName}`,
      role: currentUser.role,
      createdAt: new Date().toLocaleString(),
      resolved: false,
      replies: []
    };

    const updatedPost = {
      ...post,
      followUps: [...(post.followUps || []), fud]
    };

    const result = await updatePost(updatedPost);
    setPosts(posts.map(p => (p._id === post._id ? result : p)));
    setSelectedPost(result);
    setNewFUD("");
  };

  const handleSaveEdit = async (index: number) => {
    const updatedFollowUps = [...post.followUps];
    updatedFollowUps[index].body = editedFudBody;

    const updatedPost = { ...post, followUps: updatedFollowUps };
    const result = await updatePost(updatedPost);
    setPosts(posts.map(p => (p._id === post._id ? result : p)));
    setSelectedPost(result);
    setEditingIndex(null);
  };

  const handleDelete = async (index: number) => {
    if (!window.confirm("Delete this follow-up discussion?")) return;

    const updatedFollowUps = [...post.followUps];
    updatedFollowUps.splice(index, 1);

    const updatedPost = { ...post, followUps: updatedFollowUps };
    const result = await updatePost(updatedPost);
    setPosts(posts.map(p => (p._id === post._id ? result : p)));
    setSelectedPost(result);
  };

  const handleAddReply = async (index: number) => {
    const replyText = replyInputs[index];
    if (!replyText?.trim()) return alert("Reply text is required.");

    const newReply = {
      body: replyText,
      author: `${currentUser.firstName} ${currentUser.lastName}`,
      role: currentUser.role,
      createdAt: new Date().toLocaleString(),
      resolved: false,
      replies: []
    };

    const updatedFollowUps = [...post.followUps];
    updatedFollowUps[index].replies.push(newReply);

    const updatedPost = { ...post, followUps: updatedFollowUps };
    const result = await updatePost(updatedPost);

    setPosts(posts.map(p => (p._id === post._id ? result : p)));
    setSelectedPost(result);
    setReplyInputs({ ...replyInputs, [index]: "" });
    setReplyingToIndex(null);
  };

  const handleEditReply = async (fudIdx: number, replyIdx: number) => {
    const updatedFollowUps = [...post.followUps];
    updatedFollowUps[fudIdx].replies[replyIdx].body = editedReplyBody;

    const updatedPost = { ...post, followUps: updatedFollowUps };
    const result = await updatePost(updatedPost);

    setPosts(posts.map(p => (p._id === post._id ? result : p)));
    setSelectedPost(result);
    setEditingReply(null);
  };

  const handleDeleteReply = async (fudIdx: number, replyIdx: number) => {
    if (!window.confirm("Delete this reply?")) return;

    const updatedFollowUps = [...post.followUps];
    updatedFollowUps[fudIdx].replies.splice(replyIdx, 1);

    const updatedPost = { ...post, followUps: updatedFollowUps };
    const result = await updatePost(updatedPost);

    setPosts(posts.map(p => (p._id === post._id ? result : p)));
    setSelectedPost(result);
  };

  const isAuthorOrInstructor = (item: any) =>
    item.author.toLowerCase() === `${currentUser?.firstName} ${currentUser?.lastName}`.trim().toLowerCase() ||
    ["FACULTY", "INSTRUCTOR"].includes(currentUser?.role?.toUpperCase());

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>💬 Follow-Up Discussions</h3>
      {(post.followUps || []).map((fud: any, index: number) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginTop: "15px",
            backgroundColor: fud.resolved ? "#e6ffe6" : "#fff",
          }}
        >
          {editingIndex === index ? (
            <>
              <ReactQuill value={editedFudBody} onChange={setEditedFudBody} />
              <div style={{ marginTop: "6px" }}>
                <button onClick={() => handleSaveEdit(index)} style={{ marginRight: "6px" }}>
                  💾 Save
                </button>
                <button onClick={() => setEditingIndex(null)}>❌ Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div dangerouslySetInnerHTML={{ __html: fud.body }} />
              <div style={{
                fontSize: "0.85em",
                fontStyle: "italic",
                marginTop: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span>— {fud.author}, {fud.createdAt}</span>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    onClick={async () => {
                      const updatedFollowUps = [...post.followUps];
                      updatedFollowUps[index].resolved = !updatedFollowUps[index].resolved;

                      const updatedPost = { ...post, followUps: updatedFollowUps };
                      const result = await updatePost(updatedPost);

                      setPosts(posts.map(p => (p._id === post._id ? result : p)));
                      setSelectedPost(result);
                    }}
                    style={{
                      backgroundColor: fud.resolved ? "#d9534f" : "#5cb85c",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: "0.75em",
                    }}
                  >
                    {fud.resolved ? "Mark Unresolved" : "Mark Resolved"}
                  </button>

                  {isAuthorOrInstructor(fud) && (
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() =>
                          setOpenMenuIndex(openMenuIndex === index ? null : index)
                        }
                        style={{
                          backgroundColor: "#f0f0f0",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          cursor: "pointer",
                          fontSize: "0.75em"
                        }}
                      >
                        Actions
                      </button>
                      {openMenuIndex === index && (
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
                              setEditingIndex(index);
                              setEditedFudBody(fud.body);
                              setOpenMenuIndex(null);
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.85em",
                              marginBottom: "4px"
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(index);
                              setOpenMenuIndex(null);
                            }}
                            style={{
                              color: "red",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.85em",
                              marginBottom: "4px"
                            }}
                          >
                            🗑️ Delete
                          </button>
                          <button
                            onClick={() => {
                              setReplyingToIndex(index);
                              setOpenMenuIndex(null);
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.85em"
                            }}
                          >
                            💬 Reply
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Replies */}
          {(fud.replies || []).map((reply: any, replyIdx: number) => (
            <div key={replyIdx} style={{ marginLeft: "20px", marginTop: "10px", paddingLeft: "10px", borderLeft: "2px solid #ddd" }}>
              {editingReply?.fudIdx === index && editingReply.replyIdx === replyIdx ? (
                <>
                  <ReactQuill value={editedReplyBody} onChange={setEditedReplyBody} />
                  <div style={{ marginTop: "6px" }}>
                    <button onClick={() => handleEditReply(index, replyIdx)} style={{ marginRight: "6px" }}>
                      💾 Save
                    </button>
                    <button onClick={() => setEditingReply(null)}>❌ Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div dangerouslySetInnerHTML={{ __html: reply.body }} />
                  <div style={{ fontSize: "0.8em", fontStyle: "italic", display: "flex", justifyContent: "space-between" }}>
                    <span>— {reply.author}, {reply.createdAt}</span>
                    {isAuthorOrInstructor(reply) && (
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={() =>
                            setOpenReplyMenuIndex(openReplyMenuIndex === replyIdx ? null : replyIdx)
                          }
                          style={{
                            backgroundColor: "#f0f0f0",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            fontSize: "0.75em"
                          }}
                        >
                          Actions
                        </button>
                        {openReplyMenuIndex === replyIdx && (
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
                                setEditingReply({ fudIdx: index, replyIdx });
                                setEditedReplyBody(reply.body);
                                setOpenReplyMenuIndex(null);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "0.85em",
                                marginBottom: "4px"
                              }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteReply(index, replyIdx);
                                setOpenReplyMenuIndex(null);
                              }}
                              style={{
                                color: "red",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "0.85em",
                                marginBottom: "4px"
                              }}
                            >
                              🗑️ Delete
                            </button>
                            <button
                            onClick={() => {
                              setReplyingToIndex(index);
                              setOpenReplyMenuIndex(null);
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.85em"
                            }}
                          >
                            💬 Reply
                          </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}

          {replyingToIndex === index && (
            <>
              <ReactQuill
                value={replyInputs[index] || ""}
                onChange={(val) => setReplyInputs({ ...replyInputs, [index]: val })}
              />
              <button onClick={() => handleAddReply(index)} style={{ marginTop: "6px" }}>
                Reply
              </button>
            </>
          )}
        </div>
      ))}

      <ReactQuill value={newFUD} onChange={setNewFUD} />
      <button onClick={handleAddFUD} style={{ marginTop: "10px" }}>
        Start Discussion
      </button>
    </div>
  );
}
