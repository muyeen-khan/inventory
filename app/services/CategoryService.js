import mongoose from "mongoose";
import CategoryModel from "../models/CategoryModel.js";

export const CreateCategoryService = async (req) => {
  try {
    let reqBody = req.body;
    let result = await CategoryModel.create(reqBody);
    return {
      status: "success",
      message: "Category created successfully",
      data: result,
    };
  } catch (error) {
    return { status: "failed", message: "something went wrong" };
  }
};

export const UpdateCategoryService = async (req) => {
  try {
    let reqBody = req.body;
    let objID = new mongoose.Types.ObjectId(reqBody.id);
    let result = await CategoryModel.updateOne({ _id: objID }, reqBody);
    return {
      status: "success",
      message: "Category updated successfully",
      data: result,
    };
  } catch (error) {
    return { status: "failed", message: "something went wrong" };
  }
};

export const DeleteCategoryService = async (req) => {
  try {
    let reqBody = req.body;
    let objID = new mongoose.Types.ObjectId(reqBody.id);
    let result = await CategoryModel.deleteOne({ _id: objID });
    return {
      status: "success",
      message: "Category deleted successfully",
      data: result,
    };
  } catch (error) {
    return { status: "failed", message: "something went wrong" };
  }
};

export const ReadCategoryService = async (req) => {
  try {
    let reqBody = req.body;
    let objID = new mongoose.Types.ObjectId(reqBody.id);
    let result = await CategoryModel.findOne({ _id: objID });
    return {
      status: "success",
      message: "Category read successfully",
      data: result,
    };
  } catch (error) {
    return { status: "failed", message: "something went wrong" };
  }
};
