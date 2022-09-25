import axios from "axios";

export const fetchPosts = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: "FETCH_DATA_REQUEST" });
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );

            await dispatch({
                type: "FETCH_DATA_SUCCESS",
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: "FETCH_DATA_FAILURE",
                payload: e.message(),
            });
        }
    };
};

export const deletePost = (id) => {
    return {
        type: "DELETE_POST",
        payload: id,
    };
};

export const addPost = (post) => {
    return {
        type: "ADD_POST",
        payload: post,
    };
};

export const changePost = (post) => {
    return {
        type: "CHANGE_POST",
        payload: post,
    };
};
