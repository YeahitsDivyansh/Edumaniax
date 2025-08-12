// middleware/roleMiddleware.js

/**
 * Middleware to check if the authenticated user has one of the required roles
 * @param {Array<string>} allowedRoles - Array of role names that are allowed to access the route
 * @returns {Function} Express middleware function
 */
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // Check if user exists and has a role property
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied - role information missing" });
    }

    // Check if the user's role is in the allowed roles array
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Access denied - insufficient privileges",
        requiredRoles: allowedRoles,
        userRole: req.user.role
      });
    }

    // User has an allowed role, proceed to the next middleware
    next();
  };
};

export default checkRole;
