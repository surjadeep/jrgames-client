import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import Controller from "./controller";
import ChangePassword from "./components/ChangePassword";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import ListUser from "./components/ListUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as UserProvider } from "./context/UserContext";

export default () => {
    return (
        <AuthProvider>
            <UserProvider>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Header />
                        <Route path="/" exact component={Controller} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route
                            path="/change-password"
                            component={ChangePassword}
                        />
                        <Route path="/user/list" component={ListUser} />
                        <Route path="/user/add" component={AddUser} />
                        <Route path="/user/edit/:mason" component={EditUser} />
                        <Footer />
                    </ThemeProvider>
                </BrowserRouter>
            </UserProvider>
        </AuthProvider>
    );
};
