/**
 * A wrapper for Express requests, that sends unhandled errors to the error handling middleware.
 * @param handler An Express request handler function.
 */
const expressErrorWrapper = handler => (req, res, next = (() => true)) => {
    const promise = handler(req, res, next);
    if (promise != null) {
        promise.catch(next);
    }
};

export default expressErrorWrapper;

