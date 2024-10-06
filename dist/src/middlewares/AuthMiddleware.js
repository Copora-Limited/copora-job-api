"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
exports.authorizeRoles = authorizeRoles;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'your-secret-key';
// Middleware to authenticate the token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : undefined;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err || !decoded) {
            return res.status(403).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;
        next();
    });
}
// Middleware to check if the user has the required role(s)
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (user && allowedRoles.includes(user.role)) {
            next();
        }
        else {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions' });
        }
    };
}
// Example usage:
// app.use('/admin', authenticateToken, authorizeRoles('admin'));
// app.use('/editor', authenticateToken, authorizeRoles('admin', 'editor'));
