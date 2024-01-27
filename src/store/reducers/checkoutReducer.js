const initialData = {
    loading: false,
    checkPayment: true,
};
const checkoutReducer = (state = initialData, action) => {
    switch (action.type) {
        case "CHECKOUT_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "CHECK_PAYMENT_SUCCESS":
            return {
                ...state,
                checkPayment: action.payload,
            };
        case "CLEAR_PAYMENT_SUCCESS":
            return {
                ...state,
                checkPayment: action.payload,
            };
        default:
            return state;
    }
};

export default checkoutReducer;
