exports.error404 = function(req, res, next) {
    res.status(404).send({
        status: 404,
        error: "Not Found"
    });
}
