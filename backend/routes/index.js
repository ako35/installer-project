const express = require("express");
const router = express.Router();

// Diğer rota dosyalarını içe aktarıyoruz
const authRoute = require("./auth.js");
const customerRoute = require("./customers.js");
const installerRoute = require("./installers.js");

// Her rotayı ilgili yol altında kullanıyoruz
router.use("/auth", authRoute);
router.use("/customers", customerRoute);
router.use("/installers", installerRoute);

module.exports = router;