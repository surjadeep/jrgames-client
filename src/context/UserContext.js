import createDataContext from "./createDataContext";
import jrgames from "../api/jrgames";

// React calls this funciton when we call dispatch
const userReducer = (state, action) => {
    switch (action.type) {
        case "exe_err":
            return {
                ...state,
                notification: "",
                isLoading: false,
                status: action.payload.statusCode
            };
        case "add_notification":
            return {
                ...state,
                notification: action.payload,
                isLoading: false,
                status: false
            };
        case "delete_notification":
            return {
                ...state,
                notification: "",
                isLoading: false,
                status: false
            };
        case "change_password":
            return {
                ...state,
                notification: "Password changed successfully!",
                token: action.payload,
                isLoading: false,
                status: false
            };
        case "add_user":
            return {
                ...state,
                notification: "User added successfully!",
                token: action.payload,
                isLoading: false,
                status: false
            };
        case "edit_user":
            return {
                ...state,
                notification: "User updated successfully!",
                isLoading: false,
                autoCall: true,
                status: false
            };
        case "block_user":
            return {
                ...state,
                notification: "User blocked successfully!",
                isLoading: false,
                autoCall: false,
                data: action.payload,
                status: false
            };
        case "unblock_user":
            return {
                ...state,
                notification: "User un-blocked successfully!",
                isLoading: false,
                autoCall: false,
                data: action.payload,
                status: false
            };
        case "delete_user":
            return {
                ...state,
                notification: "User deleted successfully!",
                isLoading: false,
                autoCall: false,
                data: action.payload,
                status: false
            };
        case "list_user":
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                autoCall: false,
                notification: "",
                status: false
            };
        case "one_user":
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                autoCall: false,
                status: false
            };
        case "show_loading_screen":
            return {
                ...state,
                isLoading: true,
                status: false
            };
        default:
            return state;
    }
};

const changePassword = dispatch => async (
    { oldPassword, newPassword },
    callback
) => {
    try {
        dispatch({
            type: "show_loading_screen",
            payload: ""
        });
        const token = localStorage.getItem("token");
        const res = await jrgames.post("/user/changepassword", {
            token,
            oldPassword,
            newPassword
        });
        if (!res.data.status) {
            dispatch({
                type: "add_notification",
                payload: res.data.errorText
            });
        } else {
            dispatch({
                type: "change_password",
                payload: ""
            });
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Something went wrong with change password!"
        });
    }
    callback();
};

const addUser = dispatch => async (
    { usertype, username, password, firstname, lastname },
    callback
) => {
    try {
        dispatch({
            type: "show_loading_screen",
            payload: ""
        });
        const token = localStorage.getItem("token");
        const res = await jrgames.post("/user/add", {
            token,
            usertype,
            username,
            password,
            firstname,
            lastname
        });
        if (!res.data.status) {
            dispatch({
                type: "add_notification",
                payload: res.data.errorText
            });
        } else {
            dispatch({
                type: "add_user",
                payload: ""
            });
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Server not responding!"
        });
    }
    callback();
};

const editUser = dispatch => async (
    { mason, usertype, firstname, lastname },
    callback
) => {
    try {
        dispatch({
            type: "show_loading_screen",
            payload: ""
        });
        const token = localStorage.getItem("token");

        const res = await jrgames.post("/user/edit", {
            token,
            user_key: mason,
            usertype,
            firstname,
            lastname
        });
        if (!res.data.status) {
            dispatch({
                type: "add_notification",
                payload: res.data.errorText
            });
        } else {
            dispatch({
                type: "edit_user",
                payload: ""
            });
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Server not responding!"
        });
    }
    callback();
};

const listUser = dispatch => async callback => {
    try {
        dispatch({
            type: "show_loading_screen",
            payload: ""
        });
        const token = localStorage.getItem("token");
        const res = await jrgames.post("/user/list", {
            token
        });
        if (!res.data.status) {
            dispatch({
                type: "add_notification",
                payload: res.data.errorText
            });
        } else {
            dispatch({
                type: "list_user",
                payload: res.data.result
            });
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Server not responding!"
        });
    }
    callback();
};

const deleteUser = dispatch => async ({ mason }, callback) => {
    try {
        dispatch({
            type: "show_loading_screen",
            payload: ""
        });
        const token = localStorage.getItem("token");

        const res = await jrgames.post("/user/delete", {
            token,
            user_key: mason
        });
        if (!res.data.status) {
            dispatch({
                type: "add_notification",
                payload: res.data.errorText
            });
        } else {
            dispatch({
                type: "delete_user",
                payload: res.data.result
            });
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Server not responding!"
        });
    }
    callback();
};

const blockUser = dispatch => async ({ mason }, callback) => {
    try {
        dispatch({
            type: "show_loading_screen",
            payload: ""
        });
        const token = localStorage.getItem("token");

        const res = await jrgames.post("/user/block", {
            token,
            user_key: mason
        });
        if (!res.data.status) {
            dispatch({
                type: "add_notification",
                payload: res.data.errorText
            });
        } else {
            dispatch({
                type: "block_user",
                payload: res.data.result
            });
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Server not responding!"
        });
    }
    callback();
};

const unblockUser = dispatch => async ({ mason }, callback) => {
    try {
        dispatch({
            type: "show_loading_screen",
            payload: ""
        });
        const token = localStorage.getItem("token");

        const res = await jrgames.post("/user/unblock", {
            token,
            user_key: mason
        });
        if (!res.data.status) {
            dispatch({
                type: "add_notification",
                payload: res.data.errorText
            });
        } else {
            dispatch({
                type: "unblock_user",
                payload: res.data.result
            });
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Server not responding!"
        });
    }
    callback();
};

const oneUser = dispatch => async (key, callback) => {
    try {
        dispatch({
            type: "show_loading_screen",
            payload: ""
        });
        const token = localStorage.getItem("token");
        const res = await jrgames.post("/user/one", {
            token,
            key
        });
        if (!res.data.status) {
            dispatch({
                type: "exe_err",
                payload: res.data
            });
        } else {
            dispatch({
                type: "one_user",
                payload: res.data.result
            });
            callback(res.data.result[0]);
        }
    } catch (error) {
        dispatch({
            type: "add_notification",
            payload: "Server not responding!"
        });
    }
};

const deleteNotification = dispatch => () => {
    dispatch({
        type: "delete_notification",
        payload: ""
    });
};

export const { Provider, Context } = createDataContext(
    userReducer,
    {
        changePassword,
        addUser,
        editUser,
        deleteUser,
        oneUser,
        listUser,
        blockUser,
        unblockUser,
        deleteNotification
    },
    {
        token: null,
        data: null,
        notification: "",
        isLoading: false,
        autoCall: false,
        status: false
    }
);
