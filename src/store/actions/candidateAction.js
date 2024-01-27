import firebase from "../firebase";
export const addCandidates = (detail, email, history) => async (dispatch) => {
    dispatch(getLoader(true));
    try {
        const docRef = await firebase
            .firestore()
            .collection("users")
            .add({
                ...detail,
                createdAt: firebase.firestore.Timestamp.now(),
            });
        const docId = docRef.id;
        alert("CV added successfully!");
        history.push({
            pathname: `/pricing/${docId}`,
            state: email,
        });
        dispatch(getLoader(false));
    } catch (error) {
        alert(error.message);
        dispatch(getLoader(false));
    }
};
export const checkCandidates = (docId) => async (dispatch) => {
    dispatch(getLoader(true));
    try {
        const usersCollection = firebase.firestore().collection("users");
        const docSnapshot = await usersCollection.doc(docId).get();

        if (docSnapshot.exists) {
            dispatch({ type: "CHECK_CANDIDATES_SUCCESS", payload: true });
            dispatch(getLoader(false));
        } else {
            dispatch({ type: "CHECK_CANDIDATES_SUCCESS", payload: false });
            dispatch(getLoader(false));
        }
    } catch (error) {
        alert(error.message);
        dispatch(getLoader(false));
    }
};
export const clearState = () => async (dispatch) => {
    dispatch({ type: "CLEAR_CANDIDATES_SUCCESS", payload: true });
};
export const getCandidatesById = (id) => async (dispatch) => {
    dispatch(getLoader(true));
    //console.log(id, "action");
    try {
        const docRef = firebase.firestore().collection("users").doc(id);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
            const docData = {
                id: docSnapshot.id,
                detail: docSnapshot.data().detail,
            };
            dispatch({ type: "GET_CANDIDATES_BY_ID", payload: docData });
        } else {
            dispatch(getLoader(false));
            alert("Cv data not loaded!");
        }
        dispatch(getLoader(false));
    } catch (error) {
        alert(error.message);
        dispatch(getLoader(false));
    }
};

export const deleteCandidate = (survey, id, onSuccess) => async (dispatch) => {
    dispatch(deleteLoader(true));
    try {
        const userDocRef = firebase.firestore().collection("users").doc(id);
        const userDocSnapshot = await userDocRef.get();

        if (!userDocSnapshot.exists) {
            dispatch(deleteLoader(false));
            alert("User not found!");
            onSuccess();
            return;
        }
        if (survey === "no") {
            await userDocRef.delete();
            const potentialCandidatesCollectionRef = firebase
                .firestore()
                .collection("potentialCandidates");
            const potentialCandidatesQuerySnapshot =
                await potentialCandidatesCollectionRef
                    .where("candidateId", "==", id)
                    .get();
            const deletePromisesPotentialCandidates = [];
            potentialCandidatesQuerySnapshot.forEach((doc) => {
                deletePromisesPotentialCandidates.push(doc.ref.delete());
            });
            await Promise.all(deletePromisesPotentialCandidates);
            const paymentsCollectionRef = firebase
                .firestore()
                .collection("payments");
            const paymentsQuerySnapshot = await paymentsCollectionRef
                .where("user_id", "==", id)
                .get();

            const deletePromisesPayments = [];
            paymentsQuerySnapshot.forEach((doc) => {
                deletePromisesPayments.push(doc.ref.delete());
            });

            await Promise.all(deletePromisesPayments);
            const dashboardStatsRef = firebase
                .firestore()
                .collection("dashboardStats")
                .doc("7dyvJB2novEePOiZIE76");
            await firebase.firestore().runTransaction(async (transaction) => {
                const dashboardStatsDoc = await transaction.get(
                    dashboardStatsRef
                );
                const candidatesCount = dashboardStatsDoc.data().candidates;
                console.log(candidatesCount, "candidatesCount");
                if (candidatesCount > 0) {
                    transaction.update(dashboardStatsRef, {
                        candidates: candidatesCount - 1,
                    });
                }
            });

            dispatch(deleteLoader(false));
            alert("You have been removed from 4Mil-Database");
            onSuccess();
        } else {
            dispatch(deleteLoader(false));
            alert("Your response has been submitted successfully");
            onSuccess();
        }
    } catch (error) {
        console.log(error.message);
        dispatch(deleteLoader(false));
    }
};
const getLoader = (data) => async (dispatch) => {
    dispatch({
        type: "GET_LOADER",
        payload: data,
    });
};
const deleteLoader = (data) => async (dispatch) => {
    dispatch({
        type: "DELETE_LOADER",
        payload: data,
    });
};
