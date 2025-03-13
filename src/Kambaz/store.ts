import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./reducer";
const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignmentReducer,
        enrollmentsReducer,
    },
});
export default store;