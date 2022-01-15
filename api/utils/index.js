const resourceNotFound = (response) => {
    return response.status(404).send('Not Found');
}

module.exports = {
    resourceNotFound
}