import { useState } from "react";

export default function Filters({
    selected,
    onSelect
}: {
    selected: string;
    onSelect: (folder: string) => void;
}) {

    // const [selected, setSelected] = useState("hw1");
    const folders = ["hw1", "hw2", "office_hours", "exam", "project"];

    return (
        <div style={{
            display: "flex",
            gap: "12px",
            padding: "10px 20px",
            borderBottom: "1px solid #ddd",
            position: "sticky",
            top: 56, // adjust based on height of your nav bar
            backgroundColor: "#f0f0f0",
            zIndex: 999,
        }}>
            {folders.map((folder) => (
                <button
                    key={folder}
                    onClick={() => onSelect(folder)}
                    style={{
                        padding: "6px 12px",
                        border: "none",
                        background: folder === selected ? "#007bff" : "#e0e0e0",
                        color: folder === selected ? "#fff" : "#333",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    {folder}
                </button>
            ))}

        </div>
    );
}
