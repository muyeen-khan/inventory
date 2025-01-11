import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)/.test(v); // Validates that it's a URL
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const ItemModel = mongoose.model("Item", inventoryItemSchema);
module.exports = ItemModel;
