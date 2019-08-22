import React, { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";

export default () => {
    const { state } = useContext(AuthContext);
    if (state.auth === null) {
        return null;
    }
    if (state.auth) {
        return <Redirect to="/dashboard" />;
    } else {
        return <Redirect to="/signin" />;
    }
};
