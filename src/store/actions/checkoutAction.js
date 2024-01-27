import { RepositoryFactory } from "../../repository/RepositoryFactory";
import firebase from "../firebase";
var checkout = RepositoryFactory.get("checkout");
export const checkoutAction = (detail, onSuccess) => async (dispatch) => {
    console.log("enter");
    try {
        const { data } = await checkout.addCheckout(detail);
        if (data.success) {
            alert("Payment Completed Successfully");
            onSuccess();
        } else {
            alert("Payment Completed  failed");
        }
    } catch (error) {
        alert(error.message);
    }
};
export const checkPaymentAction = (userId) => async (dispatch) => {
    dispatch(checkoutLoading(true));
    try {
        const paymentsCollection = firebase.firestore().collection("payments");
        const querySnapshot = await paymentsCollection
            .where("user_id", "==", userId)
            .get();

        if (querySnapshot.size > 0) {
            dispatch({ type: "CHECK_PAYMENT_SUCCESS", payload: true });
        } else {
            dispatch({ type: "CHECK_PAYMENT_SUCCESS", payload: false });
        }
        dispatch(checkoutLoading(false));
    } catch (error) {
        alert(error.message);
        dispatch(checkoutLoading(false));
    }
};

export const clearState = () => async (dispatch) => {
    dispatch({ type: "CLEAR_PAYMENT_SUCCESS", payload: true });
};
export const checkoutLoading = (val) => async (dispatch) => {
    dispatch({ type: "CHECKOUT_LOADING", payload: val });
};
