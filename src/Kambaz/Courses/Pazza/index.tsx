import { Routes, Route, Navigate } from "react-router-dom";
import QAS from "./QAS";
import ManageClassScreen from "./ManageClassScreen";
import ProtectedRoute from "./ProtectedRoute"; // import it here

export default function Pazza() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="qas" />} />
            <Route path="qas" element={<QAS />} />
            <Route
                path="manage-class"
                element={
                    <ProtectedRoute>
                        <ManageClassScreen />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
