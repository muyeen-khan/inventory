import { decodeToken } from "../utility/tokenUtility.js";

const authMiddleware = (req, res, next) => {
  let token = req.headers["token"];
  if (!token) {
    token = req.cookies["token"];
  }

  let decoded = decodeToken(token);
  if (!decoded) {
    return res
      .status(401)
      .json({ status: "failed", message: "token not found" });
  } else {
    //add email to req header
    req.headers["email"] = decoded.email;
    req.headers["user_id"] = decoded.user_id;
    next();
  }
};

export default authMiddleware;
