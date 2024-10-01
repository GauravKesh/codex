/**
 * Middleware function that checks if the user has the role of "admin" or "teacher".
 * @param {Array<string>} roles - An array of roles to check against.
 * @returns {Function} - The middleware function.
 */

const { roleBasedMiddleware } = require("../validation/rbacMiddleware");

// Export specific middlewares

const adminMiddleware = roleBasedMiddleware(["admin"]);
const studentMiddleware = roleBasedMiddleware(["student"]);
const teacherMiddleware = roleBasedMiddleware(["teacher"]);
const teacherOrStudentMiddleware = roleBasedMiddleware(["teacher", "student"]);
const adminOrTeacherMiddleware = roleBasedMiddleware(["admin", "teacher"]);
const allMiddleware = roleBasedMiddleware(["admin", "teacher", "student"]);

module.exports = {
  adminOrTeacherMiddleware,
  teacherMiddleware,
  adminMiddleware,
  studentMiddleware,
  allMiddleware,
  teacherOrStudentMiddleware,
};
