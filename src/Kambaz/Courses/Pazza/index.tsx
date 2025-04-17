import { Routes, Route, Navigate } from "react-router-dom";
import QAS from "./QAS";
export default function Pazza() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="qas" />} />
            <Route path="qas" element={<QAS />} />
        </Routes>

    );
}