import axios from "axios";

const BASE_URL = "http://20.244.56.144/evaluation-service";

export const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.users;
};

export const getUserPosts = async (userId) => {
    const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);
    return response.data.posts;
};

export const getPostComments = async (postId) => {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
    return response.data.comments;
};
