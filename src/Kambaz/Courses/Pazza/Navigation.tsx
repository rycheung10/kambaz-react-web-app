import { useSelector } from "react-redux";

export default function PazzaNav() {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const courseId = window.location.pathname.split("/")[3];

    return (
        <div style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#f8f8f8",
            padding: "10px 20px",
            borderBottom: "1px solid #ddd",
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>📛 Pazza</div>
            <div style={{ flex: 1, textAlign: "center" }}>
                Course: <span style={{ fontWeight: "bold" }}>{courseId}</span>
            </div>
            <div>
                Logged in as: <strong>{currentUser?.firstName || "Guest"}</strong>
            </div>
        </div>
    );
}
