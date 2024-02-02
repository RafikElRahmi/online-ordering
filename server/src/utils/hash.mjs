import bcrypt from "bcryptjs";
async function hash(password) {
  const saltRounds = 10;
  const passwordHash =  bcrypt.hashSync(password, saltRounds);
  return passwordHash;
}

export default hash;
