const setAuthTokenFromHeader = (headerName) => (req, res, next = (() => true)) => {
    if (req.locals.authToken != null) {
        return next();
    }
    const header = req.headers[headerName.toLowerCase()];
    if (header == null) {
        return next();
    }
    if (!header.includes(" ")) {
        return next();
    }
    const [_, authToken] = header.split(" ");
    req.locals.authToken = authToken;
    return next();
};

export default setAuthTokenFromHeader;