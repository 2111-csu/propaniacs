const client = require("../client");

const createUser = async ({
  firstName,
  lastName,
  email,
  username,
  password,
  isAdmin,
}) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users ("firstName", "lastName", email, username, password, "isAdmin")
        VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING *;
        `,
      [firstName, lastName, email, username, password, isAdmin]
    );

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};
