require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  isEmailAlreadyTaken,
  createUser,
  getUserByEmail,
} = require("../../models/user/user.model");
const {
  isValidUser,
  isCredentialValid,
} = require("../../services/validation.service");

async function httpSignUp(req, res) {
  const user = req.body;
  try {
    // validate user input
    if (!isValidUser(user)) {
      return res.status(400).json({ error: "Missing required property" });
    }

    const emailAlreadyTaken = await isEmailAlreadyTaken(user.email);
    if (!emailAlreadyTaken) {
      // password hash
      bcrypt.hash(user.password, 12, (err, passwordHash) => {
        if (err) {
          //error hashing the password
          return res
            .status(500)
            .json({ message: "couldn't hash the password" });
        } else if (passwordHash) {
          // pwd hashed
          createUser({ ...user, password: passwordHash })
            .then((response) => {
              return res.status(200).json({ message: "user created" });
            })
            .catch(() => {
              console.log("Error:", err);
              return res
                .status(502)
                .json({ message: "error while creating the user" });
            });
        }
      });
    } else {
      //  email already exists
      return res.status(409).json({ message: "email already exists" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function httpLogin(req, res) {
  const user = req.body;
  try {
    if (!isCredentialValid(user)) {
      return res.status(400).json({ error: "Missing required property" });
    }
    const foundUser = await getUserByEmail(user.email);
    if (foundUser) {
      bcrypt.compare(user.password, foundUser.password, (err, compareRes) => {
        if (err) {
          // error while comparing
          res
            .status(502)
            .json({ message: "error while checking user password" });
        } else if (compareRes) {
          // password match
          const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRETE_KEY,
            {
              expiresIn: "24h",
            }
          );
          return res
            .status(200)
            .json({ message: "user logged in", token: token });
        } else {
          return res.status(401).json({ message: "invalid credentials" });
        }
      });
    } else {
      // No user found
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const isAuthenticated = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "not authenticated" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRETE_KEY);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "could not decode the token" });
  }
  if (!decodedToken) {
    res.status(401).json({ message: "unauthorized" });
  } else {
    // res.status(200).json({ message: "here is your resource" });
    next();
  }
};

module.exports = { httpSignUp, httpLogin, isAuthenticated };
