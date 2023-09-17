const mongoose = require("mongoose")
const UserModel = mongoose.model("Product", {
  barcode: {
    type: Number,
    trim: true,
  },
  productName: {
    type: String,
    trim: true,
  },
  aboutProduct: {
    type: String,
    trim: true,
  },
  productPrice: {
    type: Number,
  },
  productPriceAfterDiscount: {
    type: Number,
  },
    status: {
      type:String
  }
});
module.exports = UserModel;
