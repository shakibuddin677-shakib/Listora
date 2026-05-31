const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const wishlistController = require("../controllers/wishlist");

router.post(
    "/wishlist/toggle/:id",
    isLoggedIn,
    wishlistController.toggleWishlist
);

module.exports = router;