import { useState } from "react";
import Navigation from "./Navigation";
//import { useSelector } from "react-redux";

export default function MCS() {
    const [selectedTab, setSelectedTab] = useState<string>("general");
   // const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    const tabs = [
        { id: "general", label: "General Settings" },
        { id: "qa", label: "Customize Q&A" },
        { id: "folders", label: "Manage Folders" },
        { id: "enrollment", label: "Manage Enrollment" },
        { id: "groups", label: "Create Groups" },
        { id: "customize", label: "Customize Course Page" },
        { id: "network", label: "Piazza Network Settings" }
    ];

    return (
        <div>
            <Navigation />
            <div style={{ padding: "20px" }}>
                {/* Tab Navigation */}
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
                                cursor: "pointer"
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div>
                    {selectedTab === "general" && (
                        <div>
                            <h3>General Settings</h3>
                            <p>Adjust general class preferences.</p>
                        </div>
                    )}
                    {selectedTab === "qa" && (
                        <div>
                            <h3>Customize Q&A</h3>
                            <p>Configure how Q&A works for this class.</p>
                        </div>
                    )}
                    {selectedTab === "folders" && (
                        <div>
                            <h3>Manage Folders</h3>
                            <p>Organize posts into folders. Coming soon!</p>
                        </div>
                    )}
                    {selectedTab === "enrollment" && (
                        <div>
                            <h3>Manage Enrollment</h3>
                            <p>View and manage who is in the course.</p>
                        </div>
                    )}
                    {selectedTab === "groups" && (
                        <div>
                            <h3>Create Groups</h3>
                            <p>Set up student groups for collaboration.</p>
                        </div>
                    )}
                    {selectedTab === "customize" && (
                        <div>
                            <h3>Customize Course Page</h3>
                            <p>Design the look and feel of your course page.</p>
                        </div>
                    )}
                    {selectedTab === "network" && (
                        <div>
                            <h3>Piazza Network Settings</h3>
                            <p>Adjust how this course connects with the Piazza network.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
