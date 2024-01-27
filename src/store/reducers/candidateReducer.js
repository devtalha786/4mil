const initialData = {
    getLoading: false,
    candidateById: {},
    checkCandidate: true,
    deleteLoading:false,
};
const candidateReducer = (state = initialData, action) => {
    switch (action.type) {
        case "GET_CANDIDATES_BY_ID":
            return {
                ...state,
                candidateById: action.payload,
            };
        case "CHECK_CANDIDATES_SUCCESS":
            return {
                ...state,
                checkCandidate: action.payload,
            };
        case "CLEAR_CANDIDATES_SUCCESS":
            return {
                ...state,
                checkCandidate: action.payload,
            };
        case "GET_LOADER":
            return {
                ...state,
                getLoading: action.payload,
            };
            case "DELETE_LOADER":
                return {
                    ...state,
                    deleteLoading: action.payload,
                };
        default:
            return state;
    }
};

export default candidateReducer;
