const User = require("../models/user");

module.exports.toggleWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const listingId = req.params.id;

        const exists = user.wishlist.includes(listingId);

        if (exists) {
            user.wishlist.pull(listingId);
        } else {
            user.wishlist.push(listingId);
        }

        await user.save();

        res.json({
            success: true,
            wishlisted: !exists
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Wishlist update failed"
        });
    }
};