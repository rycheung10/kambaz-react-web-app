import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";
const initialState = {
    enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enroll: (state, { payload: enrollment }) => {
            state.enrollments = [...state.enrollments, enrollment] as any;
        },
        unEnroll: (state, { payload: { enrollmentId } }) => {
            state.enrollments = state.enrollments.filter(
                (e: any) => e._id !== enrollmentId
            );
        },
    },
});
export const { enroll, unEnroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;