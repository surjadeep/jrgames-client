import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import { Context as AuthContext } from "../../context/AuthContext";
import useFormInput from "../../controller/hooks";
import Encrypt from "../../controller/config";
import Snackbar from "../Snackbar";
import useStyles from "./style";

const SignIn = () => {
    const classes = useStyles();
    const { state, signin, deleteNotification } = useContext(AuthContext);
    const uH = useFormInput("");
    const pH = useFormInput("");
    const vE = useFormInput("");
    if (state.auth === null) {
        return null;
    }
    if (state.auth) {
        return <Redirect to="/dashboard" />;
    }

    const handleSignin = (username, pass) => {
        if (username === "" || pass === "") {
            vE.onChange("All fields are mandatory!");
            uH.onChange("");
            pH.onChange("");
            return;
        }
        const password = Encrypt(pass);
        signin(
            {
                username,
                password
            },
            () => {
                uH.onChange("");
                pH.onChange("");
            }
        );
    };
    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "75px" }}>
            <Paper className={classes.root}>
                {vE.value !== "" ? (
                    <Snackbar
                        errorMessage={vE.value}
                        onClose={() => {
                            vE.onChange("");
                        }}
                    />
                ) : null}
                {state.notification && state.notification !== "" ? (
                    <Snackbar
                        errorMessage={state.notification}
                        onClose={deleteNotification}
                    />
                ) : null}
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={uH.value}
                            onChange={uH.onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={pH.value}
                            onChange={pH.onChange}
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => handleSignin(uH.value, pH.value)}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Paper>
        </Container>
    );
};
export default SignIn;
