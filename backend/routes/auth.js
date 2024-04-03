const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Installer = require("../models/Installer.js");

// Kullanıcı kaydı (Register)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // E-posta adresiyle zaten bir kullanıcı var mı kontrol et
    const existingInstaller = await Installer.findOne({ email });

    if (existingInstaller) {
      return res.status(400).json({ error: "Email address is already registered." });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni bir kullanıcı oluştur
    const newInstaller = new Installer({
      username,
      email,
      password: hashedPassword,
    });

    // Kullanıcıyı veritabanına kaydet
    await newInstaller.save();

    // Başarılı yanıtı gönder
    res.status(201).json({ message: "Installer registered successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kullanıcı girişi (Login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const installer = await Installer.findOne({ email });

    if (!installer) {
      return res.status(401).json({ error: "Invalid email." });
    }

    const isPasswordValid = await bcrypt.compare(password, installer.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    res.status(200).json({
      id: installer._id,
      email: installer.email,
      username: installer.username,
      password: installer.password,
      role: installer.role,
      region: installer.region,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
