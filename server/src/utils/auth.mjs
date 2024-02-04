import { getSessionById } from "../models/session.mjs";
import { getUserById } from "../models/user.mjs";
import { decodeToken, verifyExpires } from "./token.mjs";

export function checkAuth(req, res) {
  const token = req.headers.authorization?.split(" ")[1] || "";
  if (!token.length) {
    return res.status(200).send({ Logged: false, admin: false });
  }
  const tokenData = decodeToken(token);
  if (!tokenData?.exp) {
    return res.status(200).send({ Logged: false, admin: false });
  }
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
