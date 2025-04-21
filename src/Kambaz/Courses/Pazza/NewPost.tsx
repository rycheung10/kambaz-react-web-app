import { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useParams } from "react-router-dom";

export default function NewPost({
  currentUser,
  onPost,
  onCancel,
  availableFolders,
  courseUsers,
}: {
  currentUser: any;
  onPost: (post: any) => void;
  onCancel: () => void;
  availableFolders: string[];
  courseUsers: any[];
}) {
  const { cid } = useParams();
  const [type, setType] = useState("question");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<"entire" | "custom">("entire");
  const [selectedViewers, setSelectedViewers] = useState<string[]>([]);

  const MAX_SUMMARY_LENGTH = 100;

  const handleSubmit = () => {
    const plainText = details.replace(/<[^>]+>/g, '').trim();

    if (!summary.trim() || summary.length > MAX_SUMMARY_LENGTH || plainText === "") {
      alert("Summary (max 100 characters) and details are required.");
      return;
    }

    if (visibility === "custom" && selectedViewers.length === 0) {
      alert("You must select at least one user for a custom visibility post.");
      return;
    }

    // Ensure current user is always included in the visibility array
    const visibilityList = visibility === "entire" 
      ? ["entire"] 
      : [...selectedViewers, currentUser._id];

    const fullName = `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`.trim().toLowerCase();

    const now = new Date();
    const formattedDate = now.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    const newPost = {
      id: Date.now().toString(),
      title: summary,
      body: details,
      author: fullName,
      role: currentUser.role,
      createdAt: formattedDate,
      type,
      folders: selectedFolders,
      course: cid,
      resolved: false,
      visibility: visibilityList, // Now includes the current user automatically
    };

    onPost(newPost);
  };

  const instructorList = courseUsers.filter(u => u.role === "instructor");
  const otherUsers = courseUsers.filter(u => u.role !== "instructor");

  const toggleViewer = (id: string) => {
    setSelectedViewers(prev =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>New Post</h2>

      <div style={{ marginBottom: "12px" }}>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="question">Question</option>
          <option value="note">Note</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Select Folder(s):</label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {availableFolders.map((folder) => (
            <label key={folder} style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                value={folder}
                checked={selectedFolders.includes(folder)}
                onChange={(e) =>
                  setSelectedFolders(
                    e.target.checked
                      ? [...selectedFolders, folder]
                      : selectedFolders.filter((f) => f !== folder)
                  )
                }
              />
              &nbsp;{folder}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Summary (Title):</label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Short title"
          maxLength={MAX_SUMMARY_LENGTH + 1}
          style={{ width: "100%", padding: "8px" }}
        />
        <div style={{ fontSize: "0.85em", color: summary.length > MAX_SUMMARY_LENGTH ? "red" : "#666" }}>
          {summary.length}/{MAX_SUMMARY_LENGTH} characters
          {summary.length > MAX_SUMMARY_LENGTH && " – Too long!"}
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Details:</label>
        <ReactQuill
          value={details}
          onChange={setDetails}
          theme="snow"
          placeholder="Write your question or note here..."
          style={{ marginBottom: "60px", height: "160px" }}
        />
        <style>
          {`
            .ql-editor {
              white-space: pre-wrap;
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
          `}
        </style>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Post To:</label>
        <div style={{ marginTop: "6px" }}>
          <label>
            <input
              type="radio"
              checked={visibility === "entire"}
              onChange={() => setVisibility("entire")}
            />
            &nbsp;Entire Class
          </label>
          <br />
          <label>
            <input
              type="radio"
              checked={visibility === "custom"}
              onChange={() => setVisibility("custom")}
            />
            &nbsp;Individual Students/Instructors
          </label>
        </div>

        {visibility === "custom" && (
          <div style={{ marginTop: "10px", paddingLeft: "16px" }}>
            <strong>Instructors:</strong>
            {instructorList.map(user => (
              <div key={user._id}>
                <label>
                  <input
                    type="checkbox"
                    name={`viewer-${user._id}`}
                    checked={selectedViewers.includes(user._id)}
                    onChange={() => toggleViewer(user._id)}
                  />
                  &nbsp;{user.firstName} {user.lastName}
                </label>
              </div>
            ))}

            <strong style={{ marginTop: "10px", display: "block" }}>Students & Others:</strong>
            {otherUsers.map(user => (
              <div key={user._id}>
                <label>
                  <input
                    type="checkbox"
                    name={`viewer-${user._id}`}
                    checked={selectedViewers.includes(user._id)}
                    onChange={() => toggleViewer(user._id)}
                  />
                  &nbsp;{user.firstName} {user.lastName}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={summary.length > MAX_SUMMARY_LENGTH}
      >
        Post
      </button>
      <button onClick={onCancel} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
}
