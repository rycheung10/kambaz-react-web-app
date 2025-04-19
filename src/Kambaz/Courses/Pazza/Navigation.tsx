import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

export default function PazzaNav() {
    const { cid } = useParams();
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const courseId = cid;

    // Check if the user is an instructor to conditionally show the Manage Class link
    const isInstructor = ["FACULTY", "INSTRUCTOR"].includes(currentUser?.role?.toUpperCase());

    return (
        <div style={{
            position: "sticky",
            top: 0,
            backgroundColor: "rgb(72, 113, 157)", 
            color: "white", 
            padding: "12px 20px",
            borderBottom: "1px solid #e1e4e8",
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}>
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>Pazza</div>
            <div style={{ flex: 1, textAlign: "center" }}>
                Course: <span style={{ fontWeight: "bold" }}>{courseId}</span>
            </div>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                {/* Link to Manage Class Screen (MCS), only visible to instructors */}
                {isInstructor && (
                    <Link 
                        to={`/Kambaz/Courses/${courseId}/Pazza/manage-class`} 
                        style={{
                            color: "white", 
                            textDecoration: "none", 
                            padding: "8px 12px", 
                            borderRadius: "4px", 
                            backgroundColor: "#4CAF50",
                            fontWeight: "bold",
                        }}
                    >
                        Manage Class
                    </Link>
                )}

                {/* Link to QAS */}
                <Link 
                    to={`/Kambaz/Courses/${courseId}/Pazza/qas`} 
                    style={{
                        color: "white", 
                        textDecoration: "none", 
                        padding: "8px 12px", 
                        borderRadius: "4px", 
                        backgroundColor: "#2196F3",  // Different background for differentiation
                        fontWeight: "bold",
                    }}
                >
                    Back to QAS
                </Link>
            </div>
            <div>
                Logged in as: <strong>{currentUser?.firstName || "Guest"}</strong>
            </div>
        </div>
    );
}
