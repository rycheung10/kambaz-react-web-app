import { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useParams } from "react-router-dom";

export default function NewPost({
  currentUser,
  onPost,
  onCancel,
  availableFolders
}: {
  currentUser: any;
  onPost: (post: any) => void;
  onCancel: () => void;
  availableFolders: string[];
}) {
  const { cid } = useParams();
  const [type, setType] = useState("question");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);

  const handleSubmit = () => {
    const plainText = details.replace(/<[^>]+>/g, '').trim();
    if (!summary.trim() || plainText === "") {
      alert("Summary and details are required.");
      return;
    }
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
    };

    onPost(newPost);
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
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFolders([...selectedFolders, folder]);
                  } else {
                    setSelectedFolders(selectedFolders.filter((f) => f !== folder));
                  }
                }}
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
          style={{ width: "100%", padding: "8px" }}
        />
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

      <button onClick={handleSubmit}>Post</button>
      <button onClick={onCancel} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
}
