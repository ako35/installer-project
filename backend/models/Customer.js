const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    installerCustomer: { type: mongoose.Schema.Types.ObjectId, ref: "Installer" },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer; 