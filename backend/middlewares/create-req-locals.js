const createReqLocals = async (req, res, next = (() => true)) => {
    if (req.locals == null) {
        req.locals = {};
    }
    return next();
};

export default createReqLocals;