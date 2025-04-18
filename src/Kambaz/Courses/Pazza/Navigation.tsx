import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


export default function PazzaNav() {
    const { cid } = useParams();

    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const courseId = cid;


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
            <div>
                Logged in as: <strong>{currentUser?.firstName || "Guest"}</strong>
            </div>
        </div>
    );
}
