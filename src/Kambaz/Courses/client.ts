import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const fetchAllCourses = async () => {
    const { data } = await axiosWithCredentials.get(COURSES_API);
    return data;
};
export const deleteCourse = async (id: string) => {
    const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
    return data;
};

export const updateCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const findModulesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return response.data;
};

export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(COURSES_API, course);
    return data;
};

export const addFolderToCourse = async (courseId: string, name: string) => {
    const response = await axiosWithCredentials.post(
      `${REMOTE_SERVER}/api/courses/${courseId}/folders`,
      { name }
    );
    return response.data;
  };
  
  export const removeFolderFromCourse = async (courseId: string, name: string) => {
    const response = await axiosWithCredentials.delete(
      `${REMOTE_SERVER}/api/courses/${courseId}/folders`,
      { data: { name } }
    );
    return response.data;
  };
  
  export const renameFolderInCourse = async (
    courseId: string,
    oldName: string,
    newName: string
  ) => {
    const response = await axiosWithCredentials.put(
      `${REMOTE_SERVER}/api/courses/${courseId}/folders`,
      { oldName, newName }
    );
    return response.data;
  };
  