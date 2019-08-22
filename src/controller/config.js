import jwt from "jwt-simple";

const config = {
    SECRET: "skjhfsd6f87iuyUD59Fvcxzwerty"
};
const Encrypt = sub => {
    return jwt.encode(
        {
            sub
        },
        config.SECRET
    );
};
export default Encrypt;
