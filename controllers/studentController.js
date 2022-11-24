const Student = require("../models/student");

module.exports.renderLoginForm = (req, res) => {
    res.render("login");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to Eduboard");
    const redirectUrl = req.session.returnTo || "/";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        err && next(err);
        req.flash("success", "Log out successfully");
        res.redirect("/");
    });
};
