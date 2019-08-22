import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Lock";
import UnblockIcon from "@material-ui/icons/LockOpen";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { Link } from "react-router-dom";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Snackbar from "../Snackbar";
import Loader from "../Loader";
import Cryptr from "../../controller/encryptURL";
import {
    getUserTypeName,
    getUserActivityStatus
} from "../../controller/helper";
import useFormInput from "../../controller/hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import ErrorPage from "../ErrorPage";
import Badge from "@material-ui/core/Badge";

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    }
}))(TableRow);

function createData(name, username, usertype, userstatus, editH, statH, delH) {
    return {
        name,
        username,
        usertype,
        userstatus,
        editH,
        statH,
        delH
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomizedTables() {
    const classes = useStyles();
    const auth = useContext(AuthContext).state.auth;
    const {
        state,
        listUser,
        deleteUser,
        blockUser,
        unblockUser,
        deleteNotification
    } = useContext(UserContext);
    console.log(state);

    const isLoading = useContext(UserContext).state.isLoading;
    const deleteFlag = useFormInput(false);
    const deleteKey = useFormInput("");
    const handleDeleteUserDialogOpen = key => {
        deleteKey.onChange(key);
        deleteFlag.onChange(true);
    };
    const handleDeleteUser = key => {
        const mason = Cryptr.decrypt(key);
        deleteUser({ mason }, () => {});
        handleDeleteUserDialogClose();
    };
    const handleNotDeleteUser = () => {
        handleDeleteUserDialogClose();
    };
    const handleDeleteUserDialogClose = () => {
        deleteFlag.onChange(false);
    };
    const handleBlockUser = key => {
        const mason = Cryptr.decrypt(key);
        blockUser({ mason }, () => {});
    };
    const handleUnblockUser = key => {
        const mason = Cryptr.decrypt(key);
        unblockUser({ mason }, () => {});
    };
    useEffect(() => {
        listUser(() => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (auth === null) {
        return null;
    }
    if (!auth) {
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
    let rows = [];
    if (state.data && state.data.constructor === Array) {
        state.data.map(d => {
            return rows.push(
                createData(
                    d.first_name + " " + d.last_name,
                    d.username,
                    getUserTypeName(d.user_type),
                    <Badge
                        className={classes.margin}
                        badgeContent={getUserActivityStatus(d.active_status)}
                        color={
                            d.active_status === "0" ? "primary" : "secondary"
                        }
                    />,
                    <Link
                        style={{ color: "#000" }}
                        to={"/user/edit/" + Cryptr.encrypt(d.user_key)}
                    >
                        <Tooltip
                            TransitionComponent={Zoom}
                            title="Click to edit"
                            placement="left"
                        >
                            <IconButton color="inherit">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>,
                    d.active_status === "0" ? (
                        <Tooltip
                            TransitionComponent={Zoom}
                            title="Click to unblock"
                            placement="left"
                        >
                            <IconButton
                                onClick={() =>
                                    handleUnblockUser(
                                        Cryptr.encrypt(d.user_key)
                                    )
                                }
                                color="inherit"
                            >
                                <UnblockIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip
                            TransitionComponent={Zoom}
                            title="Click to block"
                            placement="left"
                        >
                            <IconButton
                                onClick={() =>
                                    handleBlockUser(Cryptr.encrypt(d.user_key))
                                }
                                color="inherit"
                            >
                                <BlockIcon />
                            </IconButton>
                        </Tooltip>
                    ),
                    <Tooltip
                        TransitionComponent={Zoom}
                        title="Click to delete"
                        placement="left"
                    >
                        <IconButton
                            onClick={() =>
                                handleDeleteUserDialogOpen(
                                    Cryptr.encrypt(d.user_key)
                                )
                            }
                            color="inherit"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )
            );
        });
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: "15px" }}>
            <Dialog
                open={deleteFlag.value}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDeleteUserDialogClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        This will permanently delete record from our database
                        and can not be undone. Are you sure you want to delete
                        this record now?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNotDeleteUser} color="secondary">
                        Not this time
                    </Button>
                    <Button
                        onClick={() => handleDeleteUser(deleteKey.value)}
                        color="primary"
                    >
                        Sure, I will
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper className={classes.root}>
                {state.notification && state.notification !== "" ? (
                    <Snackbar
                        key={("top", "right")}
                        errorMessage={state.notification}
                        onClose={deleteNotification}
                    />
                ) : null}
                {!rows.length ? (
                    <h3 style={{ textAlign: "center" }}>Users not found!</h3>
                ) : (
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>User Name</StyledTableCell>
                                <StyledTableCell>User Type</StyledTableCell>
                                <StyledTableCell>User Status</StyledTableCell>
                                <StyledTableCell align="center">
                                    Edit
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Block / Unblock
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Delete
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <StyledTableRow key={row.username}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.username}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.usertype}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        style={{ paddingLeft: "45px" }}
                                    >
                                        {row.userstatus}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.editH}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.statH}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.delH}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Paper>
        </Container>
    );
}
