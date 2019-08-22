import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import { Context as AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    container: {
        flexWrap: "wrap"
    },
    textField: {},
    dense: {
        marginTop: theme.spacing(2)
    },
    menu: {
        width: 200
    },
    root: {
        padding: theme.spacing(3, 2)
    },
    margin: {
        margin: theme.spacing(1)
    },
    submit: {
        marginTop: theme.spacing(4)
    }
}));

export default function Page404({ displayMessage }) {
    const classes = useStyles();
    const { state } = useContext(AuthContext);
    if (state.auth === null) {
        return null;
    }
    if (!state.auth) {
        return <Redirect to="/signin" />;
    } else {
        return (
            <Container maxWidth="lg" style={{ marginTop: "15px" }}>
                <Paper className={classes.root}>
                    <h1 style={{ textAlign: "center" }}>{displayMessage}</h1>
                </Paper>
            </Container>
        );
    }
}
