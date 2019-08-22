import React, { useContext } from "react";
import Menu from "../Menu";
import { Context as AuthContext } from "../../context/AuthContext";

export default () => {
    const { state } = useContext(AuthContext);
    if (state.auth) {
        return <Menu />;
    } else {
        return null;
    }
};
