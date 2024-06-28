// const sessionIdToUserMap = new Map();

// export function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }
// export function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

import jwt from "jsonwebtoken";

export function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
}
export function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export default { setUser, getUser };
