const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403);
        }
        next();
    };
};

const authorizeAnyRole = (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.sendStatus(403);
    }
    next();
};

export { authorizeRole , authorizeAnyRole};