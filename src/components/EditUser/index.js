import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import useFormInput from "../../controller/hooks";
import { getUserTypeList } from "../../controller/helper";
import Snackbar from "../Snackbar";
import Loader from "../Loader";
import useStyles from "./style";
import Cryptr from "../../controller/encryptURL";
import { isNumeric } from "../../controller/helper";
import ErrorPage from "../ErrorPage";

const EditUser = ({ match }) => {
    const mason = Cryptr.decrypt(match.params.mason);
    const classes = useStyles();
    const { state } = useContext(AuthContext);
    const { oneUser, editUser, deleteNotification } = useContext(UserContext);
    const { notification, isLoading, autoCall, status } = useContext(
        UserContext
    ).state;
    const usrT = useFormInput("2");
    const usrU = useFormInput("");
    const usrP = useFormInput("");
    const usrFN = useFormInput("");
    const usrLN = useFormInput("");
    const vE = useFormInput("");

    const handleEditUser = (usertype, firstname, lastname) => {
        if (usertype === "" || firstname === "" || lastname === "") {
            vE.onChange("All fields are mandatory!");
            return;
        }
        editUser({ mason, usertype, firstname, lastname }, () => {});
    };
    useEffect(() => {
        if (mason && isNumeric(mason)) {
            oneUser(mason, ({ user_type, username, first_name, last_name }) => {
                if (user_type) {
                    usrT.onChange(user_type);
                    usrU.onChange(username);
                    usrP.onChange("********");
                    usrFN.onChange(first_name);
                    usrLN.onChange(last_name);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (state.auth === null) {
        return null;
    }
    if (!state.auth) {
        return <Redirect to="/signin" />;
    }
    if (isLoading) {
        return <Loader />;
    }
    if (!mason || !isNumeric(mason) || status) {
        return <ErrorPage displayMessage={"Invalid page!"} />;
    }
    if (
        (state.session && state.session.user_type === "5") ||
        (localStorage.user_type && localStorage.user_type === "5")
    )
        return <ErrorPage displayMessage={"Access denied for customer!"} />;
    if (isLoading) {
        return <Loader />;
    }
    if (autoCall) {
        if (mason && isNumeric(mason)) {
            oneUser(mason, ({ user_type, username, first_name, last_name }) => {
                if (user_type) {
                    usrT.onChange(user_type);
                    usrU.onChange(username);
                    usrP.onChange("********");
                    usrFN.onChange(first_name);
                    usrLN.onChange(last_name);
                }
            });
        }
    }
    console.log(status);

    return (
        <Container maxWidth="lg" style={{ marginTop: "15px" }}>
            <Paper className={classes.root}>
                {vE.value !== "" ? (
                    <Snackbar
                        key={("top", "right")}
                        errorMessage={vE.value}
                        onClose={() => {
                            vE.onChange("");
                        }}
                    />
                ) : null}
                {notification && notification !== "" ? (
                    <Snackbar
                        key={("top", "right")}
                        errorMessage={notification}
                        onClose={deleteNotification}
                    />
                ) : null}
                <h2>Edit User Form</h2>
                <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-select-currency"
                        select
                        fullWidth
                        label="Select User Type"
                        className={classes.textField}
                        value={usrT.value}
                        onChange={usrT.onChange}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu
                            }
                        }}
                        helperText=""
                        margin="normal"
                        variant="outlined"
                    >
                        {getUserTypeList(localStorage.user_type).map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        disabled
                        id="outlined-name"
                        label="Username"
                        fullWidth
                        className={classes.textField}
                        value={usrU.value}
                        onChange={usrU.onChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        disabled
                        id="outlined-name"
                        label="Password"
                        className={classes.textField}
                        value={usrP.value}
                        type="password"
                        fullWidth
                        onChange={usrP.onChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="First Name"
                        className={classes.textField}
                        value={usrFN.value}
                        onChange={usrFN.onChange}
                        margin="normal"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Last Name"
                        className={classes.textField}
                        value={usrLN.value}
                        onChange={usrLN.onChange}
                        margin="normal"
                        fullWidth
                        variant="outlined"
                    />

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() =>
                            handleEditUser(usrT.value, usrFN.value, usrLN.value)
                        }
                    >
                        Edit User
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
export default EditUser;
