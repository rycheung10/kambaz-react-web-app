import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const PAZZA_API = `${REMOTE_SERVER}/api/pazza`;

export const findAllPosts = async () => {
    const response = await axiosWithCredentials.get(`${PAZZA_API}/posts`);
    return response.data;
};
export const createPost = async (post: any) => {
    const response = await axiosWithCredentials.post(`${PAZZA_API}/posts`, post);
    return response.data;
};

export const findPostsByCourse = async (cid: string) => {
    const response = await axiosWithCredentials.get(`${PAZZA_API}/posts/${cid}`);
    return response.data;
};

export const updatePost = async (post: any) => {
    const response = await axiosWithCredentials.put(`${PAZZA_API}/posts/${post._id}`, post);
    return response.data;
};

export const deletePost = async (postId: string) => {
    const response = await axiosWithCredentials.delete(`${PAZZA_API}/posts/${postId}`);
    return response.data;
};
