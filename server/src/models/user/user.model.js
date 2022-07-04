const users = require("./user.mongo");

async function getUserByEmail(email) {
  try {
    return await users.findOne({ email }, { __v: 0 });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function isEmailAlreadyTaken(email) {
  try {
    return await getUserByEmail(email);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createUser(user) {
  try {
    return await users.create(user);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createUser, getUserByEmail, isEmailAlreadyTaken };
