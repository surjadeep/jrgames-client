export const getUserTypeList = currUser => {
    const usertypes = [
        {
            value: "2",
            label: "Sub Admin"
        },
        {
            value: "3",
            label: "Super Agent"
        },
        {
            value: "4",
            label: "Agent"
        },
        {
            value: "5",
            label: "Customer"
        }
    ];
    if (currUser === "5") {
        return;
    }
    if (currUser === "1") {
        return usertypes;
    } else {
        return usertypes.filter(usertype => usertype.value > currUser);
    }
};

export function getUserTypeName(usertype) {
    switch (usertype) {
        case "1":
            return "Admin";
        case "2":
            return "Sub Admin";
        case "3":
            return "Super Agent";
        case "4":
            return "Agent";
        case "5":
            return "Customer";
        default:
            return "Sub-Admin";
    }
}

export function getUserActivityStatus(status) {
    switch (status) {
        case "0":
            return "Blocked";
        case "1":
            return "Unblocked";
        default:
            return "Unblocked";
    }
}

export function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

export function randomString(length) {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
