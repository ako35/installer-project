const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const Customer = require("../models/Customer.js");

router.use(bodyParser.json());

router.get("/", async (req, res) => {
  try {
    const installerCustomerId = req.query.installerCustomer.id;

    // Eğer installerCustomerId belirtilmemişse, tüm müşterileri getir
    if (!installerCustomerId) {
      const customers = await Customer.find();
      res.status(200).json(customers);
    } else {
      // Belirli bir installerCustomerId'ye ait müşterileri getir
      const customers = await Customer.find({ installerCustomer: installerCustomerId });
      res.status(200).json(customers);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/", async (req, res) => {

  try {
    const { firstName, lastName, email, phone, address, city, country, installerCustomer } = req.body;

    const newCustomer = new Customer({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      country,
      installerCustomer: installerCustomer
    })

    await newCustomer.save();

    res.status(201).json(newCustomer);

    // Kullanıcıya yanıt gönderin.

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }

})

module.exports = router;