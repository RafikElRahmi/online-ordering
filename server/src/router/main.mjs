import { Router } from "express"
import { login, register } from "../controller/user.mjs";
import { generateToken } from "../utils/token.mjs";
const router = Router()

router.get('/',(req,res)=>res.status(200).send('not me'))
router.route("/login").post(login, generateToken);
router.route("/register").post(register, generateToken);
export default router