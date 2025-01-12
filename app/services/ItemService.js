import mongoose from "mongoose";
import ItemModel from "../models/ItemModel.js";

export const CreateItemService = async (req) => {
  try {
    let reqBody = req.body;
    let name = reqBody.name;
    let existingItem = await ItemModel.findOne({ name: name });
    if (existingItem) {
      return { status: "failed", message: "Item already exists" };
    } else {
      let result = await ItemModel.create(reqBody);
      return { status: "success", message: "Item created successfully" };
    }
  } catch (error) {
    return { status: "failed", message: error.message };
  }
};

export const ReadItemService = async (req) => {
  try {
    let { name } = req.params;
    let existingItem = await ItemModel.find({
      name: { $regex: `.*${name}.*`, $options: "i" },
    });
    if (existingItem) {
      return { status: "success", data: existingItem };
    } else {
      return { status: "failed", message: "Item not found" };
    }
  } catch (error) {
    return { status: "failed", message: error.message };
  }
};

export const UpdateItemService = async (req) => {
  try {
    let reqBody = req.body;
    let id = new mongoose.Types.ObjectId(req.params.id);
    let result = await ItemModel.updateOne({ _id: id }, { $set: reqBody });
    return { status: "success", message: "Item updated successfully" };
  } catch (error) {
    return { status: "failed", message: error.message };
  }
};

export const DeleteItemService = async (req) => {
  try {
    let id = new mongoose.Types.ObjectId(req.params.id);
    let result = await ItemModel.deleteOne({ _id: id });
    return { status: "success", message: "Item deleted successfully" };
  } catch (error) {
    return { status: "failed", message: error.message };
  }
};

export const ReadItemByCategoryService = async (req) => {
  try {
    let categoryId = req.params.categoryId;
    let existingItems = await ItemModel.find({
      category: categoryId,
    });
    if (existingItems.length > 0) {
      return { status: "success", data: existingItems };
    } else {
      return { status: "failed", message: "Items not found" };
    }
  } catch (error) {
    return { status: "failed", message: error.message };
  }
};
