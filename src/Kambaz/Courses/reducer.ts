import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
const initialState = {
    courses,
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addCourse: (state, { payload: course }) => {
            const newCourse: any = {
                _id: course._id,
                name: course.name,
                number: course.number,
                startDate: course.startDate,
                endDate: course.endDate,
                department: course.department,
                credits: course.credits,
                description: course.description,
            };
            state.courses = [...state.courses, newCourse] as any;
        },
        deleteCourse: (state, { payload: courseId }) => {
            state.courses = state.courses.filter((c: any) => c._id !== courseId);
        },
        updateCourse: (state, { payload: course }) => {
            state.courses = state.courses.map((c: any) =>
                c._id === course._id ? course : c,
            ) as any;
        },
    },
});

export const { addCourse, deleteCourse, updateCourse, } =
    coursesSlice.actions;
export default coursesSlice.reducer;