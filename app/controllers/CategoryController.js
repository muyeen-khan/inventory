import {
  CreateCategoryService,
  DeleteCategoryService,
  ReadCategoryService,
  UpdateCategoryService,
} from "../services/CategoryService.js";

export const CreateCategory = async (req, res) => {
  let result = await CreateCategoryService(req);
  return res.status(200).json(result);
};

export const UpdateCategory = async (req, res) => {
  let result = await UpdateCategoryService(req);
  return res.status(200).json(result);
};

export const DeleteCategory = async (req, res) => {
  let result = await DeleteCategoryService(req);
  return res.status(200).json(result);
};

export const ReadCategory = async (req, res) => {
  let result = await ReadCategoryService(req);
  return res.status(200).json(result);
};
