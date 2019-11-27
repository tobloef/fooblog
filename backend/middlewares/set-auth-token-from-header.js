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
    if (authToken != null && authToken.length > 1000000) {
        res.status(400).send("Auth token too long");
        return;
    }
    req.locals.authToken = authToken;
    return next();
};

export default setAuthTokenFromHeader;