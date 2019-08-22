import React, { useState, useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import MoreIcon from "@material-ui/icons/MoreVert";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { Context as AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { getUserTypeName } from "../../controller/helper";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto"
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: 200
        }
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    }
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const { state, signout } = useContext(AuthContext);
    const [profileMenuForDesktop, setProfileMenuForDesktop] = useState(null);
    const [profileMenuForMobile, setProfileMenuForMobile] = useState(null);
    const [userMenuForDesktop, setUserMenuForDesktop] = useState(null);
    // const [userMenuForMobile, setUserMenuForMobile] = useState(null);

    const isProfileMenuForDesktopOpen = Boolean(profileMenuForDesktop);
    const isProfileMenuForMobileOpen = Boolean(profileMenuForMobile);
    const isUserMenuForDesktopOpen = Boolean(userMenuForDesktop);
    // const isUserMenuForMobileOpen = Boolean(userMenuForMobile);

    function handleSignOut() {
        signout();
        handleProfileMenuForDesktopClose();
        handleProfileMenuForMobileClose();
    }

    function handleProfileMenuForDesktopOpen(event) {
        setProfileMenuForDesktop(event.currentTarget);
    }
    function handleProfileMenuForMobileOpen(event) {
        setProfileMenuForMobile(event.currentTarget);
    }
    function handleUserMenuForDesktopOpen(event) {
        setUserMenuForDesktop(event.currentTarget);
    }
    /*function handleUserMenuForMobileOpen(event) {
        setUserMenuForMobile(event.currentTarget);
    }*/

    function handleProfileMenuForDesktopClose() {
        setProfileMenuForDesktop(null);
        handleProfileMenuForMobileClose();
    }
    function handleProfileMenuForMobileClose() {
        setProfileMenuForMobile(null);
    }
    function handleUserMenuForDesktopClose() {
        setUserMenuForDesktop(null);
        handleUserMenuForMobileClose();
    }
    function handleUserMenuForMobileClose() {
        // setUserMenuForMobile(null);
    }

    const profileMenuForDesktopID = "profile-menu-desktop";
    const renderProfileMenuForDesktop = (
        <Menu
            anchorEl={profileMenuForDesktop}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={profileMenuForDesktopID}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isProfileMenuForDesktopOpen}
            onClose={handleProfileMenuForDesktopClose}
        >
            <MenuItem onClick={handleProfileMenuForDesktopClose}>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to="/change-password"
                >
                    Change Password
                </Link>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>Signout</MenuItem>
        </Menu>
    );

    const userMenuForDesktopID = "user-menu-desktop";
    const renderUserMenuForDesktop = (
        <Menu
            anchorEl={userMenuForDesktop}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={userMenuForDesktopID}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isUserMenuForDesktopOpen}
            onClose={handleUserMenuForDesktopClose}
        >
            <MenuItem onClick={handleUserMenuForDesktopClose}>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to="/user/list"
                >
                    User List
                </Link>
            </MenuItem>
            <MenuItem onClick={handleUserMenuForDesktopClose}>
                <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to="/user/add"
                >
                    Add User
                </Link>
            </MenuItem>
        </Menu>
    );

    const menuForMobileID = "menu-mobile";
    const renderMenuForMobile = (
        <Menu
            anchorEl={profileMenuForMobile}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuForMobileID}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isProfileMenuForMobileOpen}
            onClose={handleProfileMenuForMobileClose}
        >
            <MenuItem>
                <Link to="/dashboard">
                    <Tooltip title="Dashboard" placement="top">
                        <IconButton color="inherit">
                            <DashboardIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            </MenuItem>
            <MenuItem>
                <IconButton
                    edge="end"
                    aria-label="profile-menu-desktop"
                    aria-controls={profileMenuForDesktopID}
                    aria-haspopup="true"
                    onClick={handleProfileMenuForDesktopOpen}
                    color="inherit"
                >
                    <PeopleIcon />
                </IconButton>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuForDesktopOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="user-menu-desktop"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    console.log(state);

    return (
        <div className={classes.grow}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        JR Games Admin Panel
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Typography
                            className={classes.title}
                            variant="h9"
                            noWrap
                            style={{ margin: "15px 15px 0 0" }}
                        >
                            Welcome,{" "}
                            {state.session
                                ? state.session.name
                                : localStorage.name}{" "}
                            (
                            {state.session
                                ? state.session.username
                                : localStorage.username}
                            ). You are signed in as{" "}
                            {state.session
                                ? getUserTypeName(state.session.user_type)
                                : getUserTypeName(localStorage.user_type)}
                        </Typography>

                        <Link style={{ color: "#fff" }} to="/dashboard">
                            <Tooltip
                                TransitionComponent={Zoom}
                                title="Dashboard"
                                placement="top"
                            >
                                <IconButton color="inherit">
                                    <DashboardIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                        {(state.session && state.session.user_type === "5") ||
                        (localStorage.user_type &&
                            localStorage.user_type === "5") ? null : (
                            <Tooltip
                                TransitionComponent={Zoom}
                                title="Users"
                                placement="top"
                            >
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls={userMenuForDesktopID}
                                    aria-haspopup="true"
                                    onClick={handleUserMenuForDesktopOpen}
                                    color="inherit"
                                >
                                    <PeopleIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip
                            TransitionComponent={Zoom}
                            title="My Account"
                            placement="top"
                        >
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={profileMenuForDesktopID}
                                aria-haspopup="true"
                                onClick={handleProfileMenuForDesktopOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={menuForMobileID}
                            aria-haspopup="true"
                            onClick={handleProfileMenuForMobileOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderProfileMenuForDesktop}
            {renderUserMenuForDesktop}
            {renderMenuForMobile}
        </div>
    );
}
