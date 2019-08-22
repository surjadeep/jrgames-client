import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import useFormInput from "../../controller/hooks";
import Encrypt from "../../controller/config";
import Snackbar from "../Snackbar";
import Loader from "../Loader";
import useStyles from "./style";

const ChangePassword = () => {
    const classes = useStyles();
    const { state } = useContext(AuthContext);
    const { changePassword, deleteNotification } = useContext(UserContext);
    const notification = useContext(UserContext).state.notification;
    const isLoading = useContext(UserContext).state.isLoading;
    const oldP = useFormInput("");
    const newP = useFormInput("");
    const confP = useFormInput("");
    const vE = useFormInput("");

    const handleChangePassword = (op, np, cp) => {
        if (op === "" || np === "" || cp === "") {
            vE.onChange("All fields are mandatory!");
            return;
        }
        const oldPassword = Encrypt(op);
        const newPassword = Encrypt(np);
        const confirmPassword = Encrypt(cp);
        if (oldPassword === newPassword) {
            vE.onChange(
                "New password should be different from current password!"
            );
            oldP.onChange("");
            newP.onChange("");
            confP.onChange("");
            return;
        }
        if (newPassword !== confirmPassword) {
            vE.onChange("New password and confirmed password not matched!");
            newP.onChange("");
            confP.onChange("");
            return;
        } else {
            changePassword({ oldPassword, newPassword }, () => {
                oldP.onChange("");
                newP.onChange("");
                confP.onChange("");
            });
        }
    };
    if (state.auth === null) {
        return null;
    }
    if (!state.auth) {
        return <Redirect to="/signin" />;
    }
    if (isLoading) {
        return <Loader />;
    }
    return (
        <Container maxWidth="lg" style={{ marginTop: "15px" }}>
            <Paper className={classes.root}>
                {vE.value !== "" ? (
                    <Snackbar
                        errorMessage={vE.value}
                        onClose={() => {
                            vE.onChange("");
                        }}
                    />
                ) : null}
                {notification && notification !== "" ? (
                    <Snackbar
                        errorMessage={notification}
                        onClose={deleteNotification}
                    />
                ) : null}

                <h2>Change Password Form</h2>
                <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-name"
                        label="Current Password"
                        fullWidth
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="password"
                        value={oldP.value}
                        onChange={oldP.onChange}
                    />
                    <TextField
                        id="outlined-name"
                        label="New Password"
                        fullWidth
                        className={classes.textField}
                        margin="normal"
                        type="password"
                        variant="outlined"
                        value={newP.value}
                        onChange={newP.onChange}
                    />
                    <TextField
                        id="outlined-name"
                        label="Confirm Password"
                        fullWidth
                        className={classes.textField}
                        margin="normal"
                        type="password"
                        variant="outlined"
                        value={confP.value}
                        onChange={confP.onChange}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() =>
                            handleChangePassword(
                                oldP.value,
                                newP.value,
                                confP.value
                            )
                        }
                    >
                        Change Password
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
export default ChangePassword;
