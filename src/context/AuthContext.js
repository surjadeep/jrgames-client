import createDataContext from "./createDataContext";
import jrgames from "../api/jrgames";

// React calls this funciton when we call dispatch
const authReducer = (state, action) => {
    switch (action.type) {
        case "add_notification":
            return { ...state, notification: action.payload };
        case "delete_notification":
            return { ...state, notification: "" };
        case "signin":
            return { notification: "", auth: true, session: action.payload };
        case "signout":
            return {
                notification: "Sorry to see you go!",
                auth: false,
                session: null
            };
        case "require_auth":
            return { ...state, auth: action.payload };
        default:
            return state;
    }
};
const signin = dispatch => async ({ username, password }, callback) => {
    try {
        const res = await jrgames.post("/auth/signin", {
            username,
            password
        });
        if (!res.data.status) {
            if (res.data.errorText) {
                dispatch({
                    type: "add_notification",
                    payload: res.data.errorText
                });
            } else {
                dispatch({
                    type: "add_notification",
                    payload: "Server refused to send data!"
                });
            }
        } else {
            dispatch({
                type: "signin",
                payload: res.data
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_type", res.data.user_type);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("name", res.data.name);
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Something went wrong with signin!"
        });
    }
    callback();
};

const signout = dispatch => async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await jrgames.post("/auth/signout", {
            token
        });
        if (!res.data.status) {
            dispatch({
                type: "add_notification",
                payload: res.data.errorText
            });
        } else {
            dispatch({
                type: "signout",
                payload: ""
            });
            localStorage.removeItem("token");
            localStorage.removeItem("user_type");
            localStorage.removeItem("username");
            localStorage.removeItem("name");
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Something went wrong with signout!"
        });
    }
};

const deleteNotification = dispatch => () => {
    dispatch({
        type: "delete_notification",
        payload: ""
    });
};

const requireauth = dispatch => async callback => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch({
                type: "require_auth",
                payload: false
            });
        }
        const res = await jrgames.post("/auth/requireauth", {
            token
        });
        if (res.data.status) {
            dispatch({
                type: "require_auth",
                payload: true
            });
        } else {
            dispatch({
                type: "require_auth",
                payload: false
            });
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Something went wrong with require auth!"
        });
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, deleteNotification, requireauth },
    { notification: "", auth: null, session: null }
);
