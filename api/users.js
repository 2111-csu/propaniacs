const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const SALT_COUNT = 10;
const { JWT_SECRET = 'T4sT3mE@Tn0ThE@T' } = process.env;
const { requireUser } = require('./utils');
const { getUser, createUser, getUserByUsername} = require("../db/models/users")

usersRouter.post('/register', async (req, res, next) => {
    try {
      const {username, password} = req.body;
      const queriedUser = await getUserByUsername(username);
      if (queriedUser) {
        res.status(401);
        next({
          name: 'UserExistsError',
          message: 'Another propane enthusiast is already using that username. Please choose another username'
        });
      } else if (password.length < 8) {
        res.status(401);
        next({
          name: 'PasswordLengthError',
          message: 'That password is too dang short! Eight character minimum please.'
        });
      } else {
        const user = await createUser({
          username,
          password
        });
        if (!user) {
          next({
            name: 'UserCreationError',
            message: 'There was a problem registering you. Please try again.',
          });
        } else {
          const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w' });
          res.send({ user, message: "Well alright then; you are signed up!", token });
        }
      }
    } catch (error) {
      next(error)
    }
  })

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      next({
        name: 'MissingCredentialsError',
        message: "That attempt ain't right; supply BOTH a username and password"
      });
    }
  
    try {
      const user = await getUser({username, password});
      if(!user) {
        next({
          name: 'IncorrectCredentialsError',
          message: "BWAHAAHAAH; Username or password is incorrect",
        })
      } else {
        const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w' });
        res.send({ user, message: "Well alright then; You are logged in!", token });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
});

usersRouter.get('/me', requireUser, async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (error) {
        next(error)
    }
})

module.exports = productsRouter;
