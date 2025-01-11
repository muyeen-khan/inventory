import UserModel from "../models/UserModel.js";
import sendEmail from "../utility/emailUtility.js";
import { encodeToken } from "../utility/tokenUtility.js";

//User Register Service via sending otp
export const UserRegisterService = async (req, res) => {
  try {
    let reqBody = req.body;

    let existingUser = await UserModel.findOne({ email: reqBody.email });
    if (!existingUser) {
      await UserModel.create(reqBody);

      //send otp via email----------
      //create otp
      let otp = Math.floor(1000 + Math.random() * 9000);
      let isOtpSent = await sendEmail(
        reqBody.email,
        `your otp is ${otp}`,
        "OTP for registration",
        "<h1>your otp is " + otp + "</h1>"
      );
      if (isOtpSent) {
        await UserModel.updateOne({ email: reqBody.email }, { otp: otp });
        return {
          status: "success",
          message: "Otp has been sent successfully",
        };
      } else {
        return {
          status: "failed",
          message: "Otp has not been sent",
        };
      }
    } else {
      return {
        status: "failed",
        message: "User already exists",
      };
    }
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

//Verify User Register Service
export const VerifyRegisterService = async (req, res) => {
  try {
    let email = req.body.email;
    let otp = req.body.otp;
    let data = await UserModel.findOne({ email: email });
    if (data.otp === otp) {
      await UserModel.updateOne(
        { email: email },
        { $set: { otp: "" } },
        { upsert: true }
      );

      //send confirmation email
      sendEmail(
        email,
        "you registered successfully,now you can login with your email and password",
        "Registration Confirmation",
        "<h1>Registration is successful</h1>"
      );

      return {
        status: "success",
        message:
          "Registration is successful,now you can login with your email and password",
      };
    } else {
      return {
        status: "failed",
        message: "Invalid otp",
      };
    }
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const UserLoginService = async (req, res) => {
  try {
    let email = req.params.email;
    let pass = req.params.pass;
    let data = await UserModel.findOne({ email: email });
    if (data.password === pass) {
      let user_id = data._id.toString();

      //generate token
      let token = encodeToken(email, user_id);

      //set token in response cookie
      let cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };
      res.cookie("token", token, cookieOptions);

      return {
        status: "success",
        message: "login is successful",
        token: token,
      };
    } else {
      return { status: "failed", message: "Invalid email or Password" };
    }
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const LogoutService = async (req, res) => {
  try {
    //set token in response cookie
    let cookieOptions = {
      expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
    };
    res.cookie("token", "", cookieOptions);

    return { status: "success", message: "Logout is successfully done" };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const UpdateProfileService = async (req, res) => {
  try {
    let reqBody = req.body;
    let email = req.headers.email;
    await UserModel.updateOne(
      { email: email },
      { $set: reqBody },
      { upsert: true }
    );
    return {
      status: "success",
      message: "Profile has been updated successfully",
    };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const ReadProfileService = async (req, res) => {
  try {
    let email = req.headers.email;
    let data = await UserModel.findOne({ email: email });
    return { status: "success", data: data };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const AllUsersReadProfilesService = async (req, res) => {
  try {
    let data = await UserModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const DeleteUserService = async (req, res) => {
  try {
    let email = req.headers.email;
    await UserModel.deleteOne({ email: email });
    let cookieOptions = {
      expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
    };
    res.cookie("token", "", cookieOptions);

    return { status: "success", message: "Profile has been deleted" };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};
