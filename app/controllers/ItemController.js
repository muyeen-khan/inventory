import {
  CreateItemService,
  DeleteItemService,
  ReadItemByCategoryService,
  ReadItemService,
  UpdateItemService,
} from "../services/ItemService.js";

export const CreateItem = async (req, res) => {
  let result = await CreateItemService(req);
  return res.status(200).json(result);
};

export const ReadItem = async (req, res) => {
  let result = await ReadItemService(req);
  return res.status(200).json(result);
};

export const UpdateItem = async (req, res) => {
  let result = await UpdateItemService(req);
  return res.status(200).json(result);
};

export const DeleteItem = async (req, res) => {
  let result = await DeleteItemService(req);
  return res.status(200).json(result);
};

export const ReadItemByCategory = async (req, res) => {
  let result = await ReadItemByCategoryService(req);
  return res.status(200).json(result);
};
