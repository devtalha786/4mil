const initialData = {
    profileStatement: [],
    employmentDescription: [],
    skillDescription: [],
    suggestionLoading: false,
};
const checkoutReducer = (state = initialData, action) => {
    switch (action.type) {
        case "GET_PROFILE_STATEMENT":
            return {
                ...state,
                profileStatement: action.payload,
            };
        case "PROFILE_STATEMENT_CLEAR":
            return {
                ...state,
                profileStatement: action.payload,
            };
        case "GET_EMPLOYMENT_DESCRIPTION":
            return {
                ...state,
                employmentDescription: action.payload,
            };
        case "EMPLOYMENT_DESCRIPTION_CLEAR":
            return {
                ...state,
                employmentDescription: action.payload,
            };
        case "GET_SKILL_DESCRIPTION":
            return {
                ...state,
                skillDescription: action.payload,
            };
        case "SKILL_DESCRIPTION_CLEAR":
            return {
                ...state,
                skillDescription: action.payload,
            };
        case "SUGGESTION_LOADER":
            return {
                ...state,
                suggestionLoading: action.payload,
            };
        default:
            return state;
    }
};

export default checkoutReducer;
