const client = require("../client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({
  firstName,
  lastName,
  email,
  username,
  password,
  isAdmin,
}) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users ("firstName", "lastName", email, username, password, "isAdmin")
        VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING *;
        `,
      [firstName, lastName, email, username, hashedPassword, isAdmin]
    );

    return user;
  } catch (error) {
    throw error;
  }
};

async function getAllUsers() {
  try {
    const { rows: user } = await client.query(`
    SELECT *
    FROM users;
    `);
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT * 
      FROM users
      WHERE id=${id};
      `);
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

const updateUser = async ({
  id,
  firstName,
  lastName,
  email,
  username,
  isAdmin,
}) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET "firstName"=$1, "lastName"=$2, email=$3, username=$4, "isAdmin"=$5
        WHERE id=${id}
        RETURNING *;
      `,
      [firstName, lastName, email, username, isAdmin]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      DELETE FROM users
      WHERE id = ${id}
      RETURNING *;
      `,
    );

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser
};
