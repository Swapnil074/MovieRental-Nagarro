const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("customer Id not provided");
  res.status(401).send("unauthorized");
});

module.exports = router;
