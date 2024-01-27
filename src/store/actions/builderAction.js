import { RepositoryFactory } from "../../repository/RepositoryFactory";
var builder = RepositoryFactory.get("builder");
export const getProfileStatement = (jobTitle) => async (dispatch) => {
    dispatch(getLoader(true));
    try {
        if (jobTitle.role == "") {
            dispatch(profileStatementClear([]));
            dispatch(getLoader(false));
        } else {
            const { data } = await builder.getProfileStatement(jobTitle);
            if (data.success) {
                // let message =[
                //     "Job I am a highly motivated and organized professional with a passion for problem-solving. I have a strong background in customer service, project management, and data analysis. I am a creative thinker who is able to quickly identify and implement solutions to complex problems. I am an excellent communicator and have the ability to work effectively with a variety of stakeholders. I am also a team player who is able to work collaboratively with colleagues to achieve desired outcomes. I am confident that I can bring",
                //     "This is an exciting opportunity for an experienced individual to join a dynamic team in a unique and undefined role. The successful candidate will have the chance to develop their skills in a variety of areas, while contributing to the growth and success of the organization. The ideal candidate will be a creative problem solver with a passion for innovation and a drive to succeed. This is a great opportunity for someone looking to take their career to the next level."
                // ];
                dispatch({
                    type: "GET_PROFILE_STATEMENT",
                    payload: data.messages,
                });
                dispatch(getLoader(false));
            } else {
                //console.log("ProfileStatement loaded  failed");
                dispatch(getLoader(false));
            }
        }
    } catch (error) {
        //console.log(error.message);
        dispatch(getLoader(false));
    }
};
const profileStatementClear = (data) => async (dispatch) => {
    dispatch({
        type: "PROFILE_STATEMENT_CLEAR",
        payload: data,
    });
};
export const getSkillDescription = (skillTitle) => async (dispatch) => {
    dispatch(getLoader(true));
    try {
        if (skillTitle.skill == "") {
            dispatch(skillDescriptionClear([]));
            dispatch(getLoader(false));
        } else {
            const { data } = await builder.getSkillDescription(skillTitle);
            if (data.success) {
                // let message =[
                //     "Job I am a highly motivated and organized professional with a passion for problem-solving. I have a strong background in customer service, project management, and data analysis. I am a creative thinker who is able to quickly identify and implement solutions to complex problems. I am an excellent communicator and have the ability to work effectively with a variety of stakeholders. I am also a team player who is able to work collaboratively with colleagues to achieve desired outcomes. I am confident that I can bring",
                //     "This is an exciting opportunity for an experienced individual to join a dynamic team in a unique and undefined role. The successful candidate will have the chance to develop their skills in a variety of areas, while contributing to the growth and success of the organization. The ideal candidate will be a creative problem solver with a passion for innovation and a drive to succeed. This is a great opportunity for someone looking to take their career to the next level."
                // ];
                dispatch({
                    type: "GET_SKILL_DESCRIPTION",
                    payload: data.messages,
                });
                dispatch(getLoader(false));
            } else {
                //console.log("ProfileStatement loaded  failed");
                dispatch(getLoader(false));
            }
        }
    } catch (error) {
        //console.log(error.message);
        dispatch(getLoader(false));
    }
};
const skillDescriptionClear = (data) => async (dispatch) => {
    dispatch({
        type: "SKILL_DESCRIPTION_CLEAR",
        payload: data,
    });
};
export const getEmploymentDescription = (detail) => async (dispatch) => {
    dispatch(getLoader(true));
    try {
        if (detail.start == "" || detail.end == "" || detail.position == "") {
            dispatch(employmentDescriptionClear([]));
            dispatch(getLoader(false));
        } else {
            const { data } = await builder.getEmploymentDescription(detail);
            if (data.success) {
                // let message =
                //     "1Job I am a highly motivated and organized professional with a passion for problem-solving. I have a strong background in customer service, project management, and data analysis. I am a creative thinker who is able to quickly identify and implement solutions to complex problems. I am an excellent communicator and have the ability to work effectively with a variety of stakeholders. I am also a team player who is able to work collaboratively with colleagues to achieve desired outcomes. I am confident that I can bring2This is an exciting opportunity for an experienced individual to join a dynamic team in a unique and undefined role. The successful candidate will have the chance to develop their skills in a variety of areas, while contributing to the growth and success of the organization. The ideal candidate will be a creative problem solver with a passion for innovation and a drive to succeed. This is a great opportunity for someone looking to take their career to the next level.";
                console.log(data?.message, "message");
                // const descriptionArray = data?.message
                //     ?.split(/\d+\./)
                //     .filter(Boolean);
                dispatch({
                    type: "GET_EMPLOYMENT_DESCRIPTION",
                    payload: data?.message,
                });
                dispatch(getLoader(false));
            } else {
                console.log("Employment Description loaded failed");
                dispatch(getLoader(false));
            }
        }
    } catch (error) {
        console.log(error.message);
        dispatch(getLoader(false));
    }
};
const employmentDescriptionClear = (data) => async (dispatch) => {
    dispatch({
        type: "EMPLOYMENT_DESCRIPTION_CLEAR",
        payload: data,
    });
};
const getLoader = (data) => async (dispatch) => {
    dispatch({
        type: "SUGGESTION_LOADER",
        payload: data,
    });
};
