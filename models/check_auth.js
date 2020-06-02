

const Role = {
    Admin: 'Admin',
    Teacher: 'Teacher',
    Utilizer: 'Utilizer',
};

function check_auth(req, res, next) {
    // if (!req.user) return res.sendStatus(401); // 'Not authorized'
    if (!req.user) return res.render("nAccess"); // 'Not authorized'
    next();  // пропускати далі тільки аутентифікованих
}

function check_admin(req, res, next) {
    // if (!req.user) res.sendStatus(401); // 'Not authorized'
    // else if (req.user.role !== Role.Admin) res.sendStatus(403); // 'Forbidden'
    if (!req.user) return res.status(404).render("nAccess"); // 'Not authorized'
    else if (req.user.role !== Role.Admin) res.status(404).render("nAccess");
    else next();  // пропускати далі тільки аутентифікованих із роллю 'admin'
}

function check_teacher(req, res, next) {
    // if (!req.user) res.sendStatus(401); // 'Not authorized'
    // else if (req.user.role !== Role.Admin) res.sendStatus(403); // 'Forbidden'
    if (!req.user) return res.status(404).render("nAccess"); // 'Not authorized'
    else if (req.user.role === Role.Utilizer) res.status(404).render("nAccess");
    else next();  // пропускати далі тільки аутентифікованих із роллю 'admin'
}

function check_property(req, res, next) {
    // if (!req.user) res.sendStatus(401); // 'Not authorized'
    // else if (req.user.role !== Role.Admin) res.sendStatus(403); // 'Forbidden'
    if (!req.user) return res.status(404).render("nAccess"); // 'Not authorized'
    else if (req.user.role === Role.Admin) next();
    else if (typeof req.body.creator === 'undefined' || String(req.body.creator) !== String(req.user._id)) res.status(404).render("nAccess");
    else next();  // пропускати далі тільки аутентифікованих із роллю 'admin'
}

module.exports = {
    check_auth,
    check_admin,
    check_teacher,
    check_property,
    Role
};