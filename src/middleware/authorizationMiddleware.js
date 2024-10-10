const authorizeAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== 'admin') {
        return res.status(401).send('Acceso denegado');
    }
    next()
}
module.exports = authorizeAdmin;