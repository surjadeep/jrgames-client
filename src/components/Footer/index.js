import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import Typography from "@material-ui/core/Typography";

const style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "14px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "48px",
    width: "100%"
};

const phantom = {
    display: "block",
    padding: "20px",
    height: "60px",
    width: "100%"
};

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © 2019 JR Games. All rights reserved."}
        </Typography>
    );
}

export default function Footer() {
    const { state, requireauth } = useContext(AuthContext);
    console.log(state);

    useEffect(() => {
        requireauth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                <MadeWithLove />
            </div>
        </div>
    );
}
