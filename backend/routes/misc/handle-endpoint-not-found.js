const handleEndpointNotFound = async (req, res) => {
    req.status(404).send(`Endpoint ${req.originalUrl} not found.`);
};

export default handleEndpointNotFound;