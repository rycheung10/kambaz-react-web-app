import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import {
  addFolderToCourse,
  removeFolderFromCourse,
  renameFolderInCourse,
} from "../client";
import axios from "axios";
import { useParams } from "react-router-dom";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export default function MCS() {
  const [selectedTab, setSelectedTab] = useState("folders");
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolders, setSelectedFolders] = useState<Set<string>>(new Set());
  const [newFolder, setNewFolder] = useState("");
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const { cid } = useParams();

  const fetchCourse = async () => {
    try {
      const { data } = await axiosWithCredentials.get(`${COURSES_API}/${cid}`);
      setFolders(data.folders || []);
    } catch (error) {
      console.error("Failed to fetch course:", error);
    }
  };

  const handleAddFolder = async () => {
    if (!newFolder.trim()) return;
    await addFolderToCourse(cid!, newFolder.trim());
    setNewFolder("");
    fetchCourse();
  };

  const handleDeleteSelected = async () => {
    for (let name of selectedFolders) {
      await removeFolderFromCourse(cid!, name);
    }
    setSelectedFolders(new Set());
    fetchCourse();
  };

  const handleStartEditing = (folder: string) => {
    setEditingFolder(folder);
    setEditName(folder);
  };

  const handleRename = async () => {
    if (!editingFolder || editName.trim() === "") return;
    await renameFolderInCourse(cid!, editingFolder, editName.trim());
    setEditingFolder(null);
    setEditName("");
    fetchCourse();
  };

  const handleCancelEdit = () => {
    setEditingFolder(null);
    setEditName("");
  };

  const toggleSelection = (folder: string) => {
    const newSet = new Set(selectedFolders);
    if (newSet.has(folder)) {
      newSet.delete(folder);
    } else {
      newSet.add(folder);
    }
    setSelectedFolders(newSet);
  };

  useEffect(() => {
    if (selectedTab === "folders") {
      fetchCourse();
    }
  }, [selectedTab]);

  const tabs = [
    { id: "folders", label: "Manage Folders" },
    { id: "general", label: "General Settings" },
    { id: "qa", label: "Customize Q&A" },
    { id: "enrollment", label: "Manage Enrollment" },
    { id: "groups", label: "Create Groups" },
    { id: "customize", label: "Customize Course Page" },
    { id: "network", label: "Piazza Network Settings" },
  ];

  return (
    <div>
      <Navigation />
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                padding: "10px 15px",
                backgroundColor: selectedTab === tab.id ? "#4CAF50" : "#f0f0f0",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {selectedTab === "folders" && (
            <div>
              <h3>Configure Class Folders</h3>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="New folder name"
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  style={{ padding: "8px", marginRight: "10px" }}
                />
                <button onClick={handleAddFolder} style={{ padding: "8px 12px" }}>
                  Add Folder
                </button>
              </div>

              <button
                onClick={handleDeleteSelected}
                disabled={selectedFolders.size === 0}
                style={{
                  marginBottom: "10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete Selected Folders
              </button>

              <ul style={{ listStyle: "none", padding: 0 }}>
                {folders.map((folder, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFolders.has(folder)}
                      onChange={() => toggleSelection(folder)}
                    />
                    {editingFolder === folder ? (
                      <>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                        <button onClick={handleRename}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <span>{folder}</span>
                        <button onClick={() => handleStartEditing(folder)}>Edit</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
