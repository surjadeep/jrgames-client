import { makeStyles } from "@material-ui/core/styles";

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
export default useStyles;
