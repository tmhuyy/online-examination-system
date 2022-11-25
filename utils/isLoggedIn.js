const isLoggedIn = (req, res, next) => {
    if (!req.session.student) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in");
        res.redirect("/login");
        return;
    }
    return next();
};

module.exports = isLoggedIn;
