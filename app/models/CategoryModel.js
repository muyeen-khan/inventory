import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value.startsWith("http://") || value.startsWith("https://");
        },
        message: "Image URL must start with http:// or https://",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;
