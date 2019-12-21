import authenticateUser from "./authenticate-user.js";

const middlewares = [
    authenticateUser,
];

const context = async (arg) => {
    let result = {};
    for (const middleware of middlewares) {
        result = {
            ...result,
            ...await middleware(arg),
        };
    }
    return result;
};

export default context;