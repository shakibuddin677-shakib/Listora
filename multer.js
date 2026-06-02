const multer = require("multer");
const { storage } = require("../config/cloudConfig");

module.exports = multer({ storage });