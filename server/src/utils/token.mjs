import { createSession } from "../models/session.mjs";
import jwt from "jsonwebtoken";

export async function generateToken(userData, req, res, next) {
  createSession(function (error, result) {
    if (error) return res.status(500).send("Internal Server Error");
    if (result) {
      const expiresIn = 3600 * 24 * 7 * 1000;
      const expires = new Date(Date.now() + expiresIn);
      const secretKey = `${process.env.SECRET_KEY}`;
      const token = jwt.sign(
        { userId: userData.userId, sessionId: result.insertId },
        secretKey,
        {
          expiresIn: expiresIn,
        }
      );
      res.setHeader("Authorization", `Bearer ${token}; Expires=${expires}`);
      if (userData.isAdmin) {
        return res.status(202).send("its admin");
      } else {
        return res.status(200).send("successfully");
      }
    }
  });
}
export function decodeToken(token) {
  let decodedToken;
  const secretKey = `${process.env.SECRET_KEY}`;
  try {
    decodedToken = jwt.verify(token, secretKey);
  } catch (error) {
    return decodedToken;
  }
  return decodedToken;
}
export function verifyExpires(expiresTime) {
  const expires = new Date(expiresTime * 1000).getTime();
  const now = new Date().getTime();
  return now < expires;
}