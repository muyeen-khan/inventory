import {
  AllUsersReadProfilesService,
  DeleteUserService,
  LogoutService,
  ReadProfileService,
  UpdatePasswordService,
  UpdateProfileService,
  UserLoginService,
  UserRegisterService,
  VerifyRegisterService,
} from "../services/UserServices.js";

export const UserRegister = async (req, res) => {
  let result = await UserRegisterService(req);
  return res.status(200).json(result);
};

export const VerifyUserRegister = async (req, res) => {
  let result = await VerifyRegisterService(req, res);
  return res.status(200).json(result);
};

export const UserLogin = async (req, res) => {
  let result = await UserLoginService(req, res);
  return res.status(200).json(result);
};

export const UserLogout = async (req, res) => {
  let result = await LogoutService(req, res);
  return res.status(200).json(result);
};

export const UpdateProfile = async (req, res) => {
  let result = await UpdateProfileService(req);
  return res.status(200).json(result);
};

export const UpdatePassword = async (req, res) => {
  let result = await UpdatePasswordService(req);
  return res.status(200).json(result);
};

export const ReadProfile = async (req, res) => {
  let result = await ReadProfileService(req);
  return res.status(200).json(result);
};

export const AllUsersReadProfiles = async (req, res) => {
  let result = await AllUsersReadProfilesService(req);
  return res.status(200).json(result);
};

export const DeleteUser = async (req, res) => {
  let result = await DeleteUserService(req, res);
  return res.status(200).json(result);
};
