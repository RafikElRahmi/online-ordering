import { createUser, getUserById, getUserByUsername } from "../models/user.mjs";
import hash from "../utils/hash.mjs";
import bcrypt from "bcryptjs";

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (username && password) {
      getUserByUsername(username, async function (err, result) {
        if (err) return res.status(500).send("Internal Server Error");
        else if (!result) return res.status(404).send("Username not found");
        else {
          if (
            result.username == `${process.env.USERNAME}` &&
            password &&
            `${process.env.PASSWORD}`
          ) {
            next({ userId: result.id, isAdmin: true });
          } else {
            const passwordMatch = bcrypt.compareSync(password, result.password);
            if (passwordMatch) {
              next({ userId: result.id, isAdmin: false });
            } else {
              return res.status(401).send("Invalid Password");
            }
          }
        }
      });
    } else {
      return res.status(400).send("invalid data user");
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function register(req, res, next) {
  try {
    const { username, phone, password } = req.body;
    const hashed = await hash(password);
    if (username && phone && password) {
      getUserByUsername(username, function (err, result) {
        if (err) return res.status(500).send("Internal Server Error");
        else if (result) return res.status(406).send("Username already exist");
        else {
          createUser(
            { username: username, phone: phone, password: hashed },
            function (error, result) {
              if (error)
                return res
                  .status(500)
                  .send({ msg: "Internal Server Error", err });
              if (result) {
                next({ userId: result.insertId, isAdmin: false });
              }
            }
          );
        }
      });
    } else {
      return res.status(400).send("invalid data user");
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
export async function getOneUser(req, res) {
  try {
    const id = req.params.id;
    getUserById(id, (err, result) => {
      if (err) return res.status(500).send("Internal Server Error");
      else if (result) {
        return res
          .status(200)
          .send({ name: result.username, phone: result.phone });
      } else {
        return res.status(404).send("not found");
      }
    });
  } catch (error) {}
}
