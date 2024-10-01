/**
 * Retrieves a user based on their role and user ID.
 * 
 * @param {string} userId - The ID of the user.
 * @param {string} role - The role of the user (admin, teacher, or student).
 * @returns {Promise<object|null>} - A promise that resolves to the user object if found, or null if not found.
 * @throws {Error} - If an invalid role is provided.
 */


const {Admins} = require("../models/adminModel.js"); 
const { Teachers } = require("../models/teacherModel.js"); 
const { Students } = require("../models/studentModel.js"); 
const { ObjectId } = require("mongodb");

const getUserByRole = async (userId, role) => {
  try {
    let user;

    switch (role) {
      case "admin":
        user = await Admins.findById({
          _id: new ObjectId(userId),
        });
        break;
      case "teacher":
        user = await Teachers.findById({
          _id: new ObjectId(userId),
        });
        break;
      case "student":
        user = await Students.findById({
          _id: new ObjectId(userId),
        });
        break;
      default:
        throw new Error("Invalid role");
    }

    return user;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

module.exports =  getUserByRole;
