const express        = require("express");
const router         = express.Router();
const { isLoggedIn } = require("../middleware");
const wishlistCtrl   = require("../controllers/wishlist");

router.get(
  "/wishlist",
  isLoggedIn,
  wishlistCtrl.getWishlist
);

router.post(
  "/wishlist/toggle/:id",
  isLoggedIn,
  wishlistCtrl.toggleWishlist
);

module.exports = router;
