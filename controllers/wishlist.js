
const User    = require("../models/user.js");
const Listing = require("../models/listing.js");

// ─────────────────────────────────────────────────────────────
// GET /wishlist
// Populate the logged-in user's wishlist with full listing data
// ─────────────────────────────────────────────────────────────
module.exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path:     "wishlist",
    populate: { path: "reviews" },   // needed for avg-rating calc in EJS
  });

  const savedListings = user.wishlist || [];

  res.render("listings/wishlist.ejs", { savedListings });
};

// ─────────────────────────────────────────────────────────────
// POST /wishlist/toggle/:id
// Add or remove a listing from wishlist — returns JSON
// ─────────────────────────────────────────────────────────────
module.exports.toggleWishlist = async (req, res) => {
  const { id } = req.params;
  const user   = await User.findById(req.user._id);

  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (!user.wishlist) user.wishlist = [];

  const idx = user.wishlist.findIndex(
    (wId) => wId.toString() === id.toString()
  );

  let liked;
  if (idx === -1) {
    user.wishlist.push(id);
    liked = true;
  } else {
    user.wishlist.splice(idx, 1);
    liked = false;
  }

  await user.save();

  return res.json({ liked });
};
