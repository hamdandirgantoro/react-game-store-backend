import bcrypt from "bcrypt";

const saltRounds = 10;

/**
 * Hash plain text password.
 *
 * @param {string} password - plain text password
 * @returns {Promise<string>} hashed password
 */
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Verify if the plain text password is matching with the hashed password.
 *
 * @param plainPassword - plain text password
 * @param hashedPassword - hashed password
 * @returns {Promise<boolean>} true / false
 */
async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  if (!match) {
    throw new Error("Invalid password!");
  }
  return match;
}

export { hashPassword, verifyPassword };
