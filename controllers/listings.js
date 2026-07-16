const Listing = require("../models/listing");

// GET /listings - supports search, category, maxPrice and sort query params
module.exports.index = async (req, res) => {

  const { search = "", category = "", maxPrice = "", sort = "" } = req.query;

  const filter = {};

  if (search.trim()) {
    const re = new RegExp(search.trim(), "i");
    filter.$or = [
      { title:       re },
      { location:    re },
      { country:     re },
      { description: re },
    ];
  }

  if (category.trim()) {
    filter.category = new RegExp(`^${category.trim()}$`, "i");
  }

  if (maxPrice !== "" && !isNaN(Number(maxPrice))) {
    filter.price = { $lte: Number(maxPrice) };
  }

  let sortOption = { createdAt: -1 };

  if (sort === "price_asc")  sortOption = { price:  1 };
  if (sort === "price_desc") sortOption = { price: -1 };
  if (sort === "newest")     sortOption = { createdAt: -1 };

  const allListings = await Listing.find(filter)
    .populate("reviews")
    .sort(sortOption);

  res.render("listings/index.ejs", {
    allListings,
    search,
    category,
    maxPrice,
    sort,
    currentPage: 1,
    totalPages:  1,
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path:     "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  const { path: url, filename } = req.file;

  const newListing       = new Listing(req.body.listing);
  newListing.owner       = req.user._id;
  newListing.image       = { url, filename };
  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  // smaller preview image on the edit page via cloudinary transform
  const originalImageUrl = listing.image.url.replace(
    "/upload",
    "/upload/h_300,w_250"
  );

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    listing.image = { url: req.file.path, filename: req.file.filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
