import { createSession } from "../models/session.mjs";
import jwt from "jsonwebtoken"

export async function generateToken(userId, req, res, next) {
  createSession(function (error, result) {
    if (error) return res.status(500).send("Internal Server Error");
    if (result) {
      const expiresIn = 3600 * 24 * 7 * 1000;
      const expires = new Date(Date.now() + expiresIn);
      const session = result.id;
      const secretKey = `${process.env.SECRET_KEY}`;
      const token = jwt.sign(
        { userId, sessionId: session },
        secretKey,
        {
          expiresIn: expiresIn,
        }
      );
        res.setHeader("Authorization", `Bearer ${token}; Expires=${expires}`);
       return res.status(200).send("successfully");
    }
  });
}
