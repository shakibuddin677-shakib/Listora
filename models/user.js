

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },

  // ── Wishlist: array of Listing references ──────────────────
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:  "Listing",
    },
  ],

});

// passport-local-mongoose must be called as a function — this adds
// username, hash, salt fields + createStrategy / serializeUser etc.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
