import { getSessionById } from "../models/session.mjs";
import { getUserById } from "../models/user.mjs";
import { decodeToken, verifyExpires } from "./token.mjs";

export function checkAuth(req, res) {
  const token = req.headers.authorization?.split(" ")[1] || "";
  const tokenData = decodeToken(token);
  const isValid = verifyExpires(tokenData.exp);
  if (isValid) {
    getSessionById(tokenData.sessionId, (err, result) => {
      if (result.isValid) {
        getUserById(tokenData.userId, (err, result) => {
            if (result?.username == `${process.env.USERNAME}`) {
            return res.status(200).send({ Logged: true, admin: true });
          } else {
            return res.status(200).send({ Logged: true, admin: false });
          }
        });
      } else {
        return res.status(200).send({ Logged: false, admin: false });
      }
    });
  } else {
    return res.status(200).send({ Logged: false, admin: false });
  }
}
