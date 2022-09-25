const initialState = {
    data: [],
    loading: true,
    error: "",
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_DATA_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "FETCH_DATA_SUCCESS":
            return {
                ...state,
                data: action.payload,
                loading: false,
            };

        case "FETCH_DATA_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "DELETE_POST":
            return {
                ...state,
                data: state.data.filter((post) => post.id !== action.payload),
            };

        case "ADD_POST":
            return {
                ...state,
                data: [...state.data, action.payload],
            };

        case "CHANGE_POST":
            const changedPost = action.payload;
            return {
                ...state,
                data: [
                    ...state.data.filter((post) => {
                        return post.id !== changedPost.id;
                    }),
                    changedPost,
                ],
            };

        default:
            return state;
    }
};
