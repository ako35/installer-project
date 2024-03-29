const mongoose = require("mongoose");

const InstallerSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "installer", enum: ["installer", "admin"] },
    region: { type: String },
  },
  { timestamps: true }
);

const Installer = mongoose.model("Installer", InstallerSchema);
module.exports = Installer;
