import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const getAssigmentById = async (assignmentId: string) => {
    const { data } = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
    return data;
}

export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
}

export const createAssignment = async (assignment: any) => {
    const { data } = await axios.post(ASSIGNMENTS_API, assignment);
    return data;
}

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
}