

const express        = require("express");
const router         = express.Router();
const { isLoggedIn } = require("../middleware");
const wishlistCtrl   = require("../controllers/wishlist");

// GET  /wishlist  ─── show the wishlist page
router.get(
  "/wishlist",
  isLoggedIn,
  wishlistCtrl.getWishlist
);

// POST /wishlist/toggle/:id  ─── add / remove via AJAX
router.post(
  "/wishlist/toggle/:id",
  isLoggedIn,
  wishlistCtrl.toggleWishlist
);

module.exports = router;
