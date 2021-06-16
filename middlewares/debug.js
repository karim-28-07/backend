const debug = (req, res, next) => {
    console.log("I received a request!");

    next()
}

module.exports = {
    debug
}