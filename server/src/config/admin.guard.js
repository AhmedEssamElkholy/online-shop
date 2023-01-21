exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin) next();
    else {
        const error=new Error('you are not admin')
        error.status=401;
        next(error);
    };
};

