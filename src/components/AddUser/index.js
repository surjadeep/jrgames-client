import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import useFormInput from "../../controller/hooks";
import { getUserTypeList, randomString } from "../../controller/helper";
import Encrypt from "../../controller/config";
import Snackbar from "../Snackbar";
import Loader from "../Loader";
import useStyles from "./style";
import ErrorPage from "../ErrorPage";

const AddUser = () => {
    const classes = useStyles();
    const { state } = useContext(AuthContext);
    const { addUser, deleteNotification } = useContext(UserContext);
    const { notification, isLoading } = useContext(UserContext).state;
    const usrT = useFormInput(parseInt(localStorage.user_type) + 1);
    const usrU = useFormInput(randomString(10));
    const usrP = useFormInput("");
    const usrFN = useFormInput("");
    const usrLN = useFormInput("");
    const vE = useFormInput("");
    const handleAddUser = (usertype, username, p, firstname, lastname) => {
        if (
            usertype === "" ||
            username === "" ||
            p === "" ||
            firstname === "" ||
            lastname === ""
        ) {
            vE.onChange("All fields are mandatory!");
            return;
        }
        const password = Encrypt(p);
        addUser({ usertype, username, password, firstname, lastname }, () => {
            usrT.onChange("2");
            usrU.onChange("");
            usrP.onChange("");
            usrFN.onChange("");
            usrLN.onChange("");
        });
    };
    if (state.auth === null) {
        return null;
    }
    if (!state.auth) {
        return <Redirect to="/signin" />;
    }
    if (
        (state.session && state.session.user_type === "5") ||
        (localStorage.user_type && localStorage.user_type === "5")
    )
        return <ErrorPage displayMessage={"Access denied for customer!"} />;
    if (isLoading) {
        return <Loader />;
    }
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
                <h2>Add User Form</h2>
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
                        id="outlined-name"
                        label="Username"
                        fullWidth
                        className={classes.textField}
                        value={usrU.value}
                        onChange={usrU.onChange}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
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
                            handleAddUser(
                                usrT.value,
                                usrU.value,
                                usrP.value,
                                usrFN.value,
                                usrLN.value
                            )
                        }
                    >
                        Add User
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
export default AddUser;
