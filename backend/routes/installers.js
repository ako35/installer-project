const express = require("express");
const router = express.Router();
const Installer = require("../models/Installer.js");

// Tüm kurulumcuları getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const installers = await Installer.find();

    res.status(200).json(installers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kurulumcuları silme (Delete)
router.delete("/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const deletedInstaller = await Installer.findOneAndDelete({ email });

    if (!deletedInstaller) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(deletedInstaller);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;