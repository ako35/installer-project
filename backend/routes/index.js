const express = require("express");
const router = express.Router();

// Diğer rota dosyalarını içe aktarıyoruz
const authRoute = require("./auth.js");
const customersRoute = require("./customers.js");
const installersRoute = require("./installers.js");

// Her rotayı ilgili yol altında kullanıyoruz
router.use("/auth", authRoute);
router.use("/customers", customersRoute);
router.use("/installers", installersRoute);

module.exports = router;