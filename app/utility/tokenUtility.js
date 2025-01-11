import {JWT_EXPIRATION_TIME, JWT_SECRET} from "../config/config.js";
import jwt from "jsonwebtoken";

export const encodeToken = (email, user_id)=>{
    const payload = {email:email, user_id:user_id};
    const expire = { expiresIn: JWT_EXPIRATION_TIME };
    return jwt.sign(payload, JWT_SECRET,expire);
}


export const decodeToken = (token)=>{
    try {
        return jwt.verify(token,JWT_SECRET)
    }catch (e) {
        return null;
    }
}