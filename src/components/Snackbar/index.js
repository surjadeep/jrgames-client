import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import useStyles from "./style";

export default function PositionedSnackbar({ errorMessage, onClose }) {
    const classes = useStyles();
    const [state, setState] = useState({
        open: true,
        vertical: "top",
        horizontal: "center"
    });

    const { vertical, horizontal, open } = state;

    const handleClick = newState => () => {
        setState({ open: true, ...newState });
    };

    function handleClose() {
        setState({ ...state, open: false });
        onClose();
    }

    useEffect(() => {
        handleClick({
            vertical: "top",
            horizontal: "center"
        });
    });

    return (
        <Snackbar
            autoHideDuration={5000}
            className={classes.root}
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open}
            onClose={handleClose}
            ContentProps={{
                classes: {
                    root: classes.root
                }
            }}
            message={<span id="message-id">{errorMessage}</span>}
        />
    );
}
