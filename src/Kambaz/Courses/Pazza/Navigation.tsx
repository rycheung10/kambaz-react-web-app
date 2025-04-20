import { useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";

export default function PazzaNav() {
  const { cid } = useParams();
  const location = useLocation();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const courseId = cid;

  const isInstructor = ["FACULTY", "INSTRUCTOR"].includes(currentUser?.role?.toUpperCase());

  const tabs = [
    {
      label: "Manage Class",
      path: `/Kambaz/Courses/${courseId}/Pazza/manage-class`,
      show: isInstructor,
    },
    {
      label: "Q & A",
      path: `/Kambaz/Courses/${courseId}/Pazza/qas`,
      show: true,
    },
  ];

  return (
    <div style={{
      position: "sticky",
      top: 0,
      backgroundColor: "rgb(72, 113, 157)", 
      color: "white", 
      padding: "12px 20px",
      borderBottom: "1px solid #e1e4e8",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>Pazza</div>
        <div style={{ flex: 1, textAlign: "center" }}>
          Course: <span style={{ fontWeight: "bold" }}>{courseId}</span>
        </div>
        <div>
          Logged in as: <strong>{currentUser?.firstName || "Guest"}</strong>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "12px", gap: "30px" }}>
        {tabs
          .filter(tab => tab.show)
          .map((tab) => {
            const isActive = location.pathname.startsWith(tab.path);
            return (
              <Link
                key={tab.label}
                to={tab.path}
                style={{
                  paddingBottom: "6px",
                  fontWeight: "bold",
                  color: "white",
                  textDecoration: "none",
                  borderBottom: isActive ? "3px solid white" : "none",
                }}
              >
                {tab.label}
              </Link>
            );
          })}
      </div>
    </div>
  );
}
