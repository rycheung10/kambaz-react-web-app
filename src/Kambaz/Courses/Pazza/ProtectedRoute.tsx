import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const { cid } = useParams();

    const isInstructor = ["FACULTY", "INSTRUCTOR"].includes(currentUser?.role?.toUpperCase());

    if (!isInstructor) {
        return <Navigate to={`/Kambaz/Courses/${cid}/Pazza/qas`} />;
    }

    return children;
}
