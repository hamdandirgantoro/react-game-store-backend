import jwt from "jsonwebtoken";

interface JwtPayload {
  firstName: string;
  lastName: string;
  email: string;
}

const SECRET_KEY: string = String(process.env.SECRET_KEY);

/**
 * generate json web token.
 *
 * @param {JwtPayload} payload - {firstName, lastName, email}
 * @returns {string} return json web token
 */
const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

/**
 * verify that the generated json web token is not expired.
 *
 * @param {string} token - generated json web token
 * @returns {JwtPayload | null} decoded token / null
 */
const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
