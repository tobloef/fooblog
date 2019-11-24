const handleEndpointNotFound = async (req, res) => {
    res.status(404).send(`Endpoint ${req.originalUrl} not found.`);
};

export default handleEndpointNotFound;