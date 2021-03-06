const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const SALT_COUNT = 10;
const { JWT_SECRET = "T4sT3mE@Tn0ThE@T" } = process.env;
const { requireUser } = require("./utils");
const {
  getUser,
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
} = require("../db/models/users");

usersRouter.get("/users", requireUser, async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (error) {
    console.error(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email, firstName, lastName, isAdmin } =
      req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      res.status(401);
      next({
        name: "UserExistsError",
        message:
          "Another propane enthusiast is already using that username. Please choose another username",
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: "PasswordLengthError",
        message:
          "That password is too dang short! Eight character minimum please.",
      });
    } else {
      const newUser = await createUser({
        username,
        password,
        email,
        firstName,
        lastName,
        isAdmin,
      });
      if (!newUser) {
        next({
          name: "UserCreationError",
          message: "There was a problem registering you. Please try again.",
        });
      } else {
        const token = jwt.sign(
          { id: newUser.id, username: newUser.username },
          JWT_SECRET,
          { expiresIn: "1w" }
        );
        res.send({
          user: newUser,
          message: "Well alright then; you are signed up!",
          token,
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "That attempt ain't right; supply BOTH a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "BWAHAAHAAH; Username or password is incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({
        user,
        message: "Well alright then; You are logged in!",
        token,
      });
    }
  } catch (error) {
    throw error;
  }
});

usersRouter.get("/users/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await getUserById(userId);
    res.send(user);
  } catch (error) {
    throw error;
  }
});

usersRouter.get("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await getUserByUsername(username);
    res.send(user);
  } catch (error) {
    throw error;
  }
});

usersRouter.patch("/users/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName, email, username, isAdmin } = req.body;

  try {
    const editedUser = updateUser({
      id: userId,
      firstName,
      lastName,
      email,
      username,
      isAdmin,
    });
    res.send(editedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/users/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUser = await deleteUser(userId);
    res.send(deletedUser);
  } catch (error) {
    console.error(error);
  }
});

module.exports = usersRouter;
