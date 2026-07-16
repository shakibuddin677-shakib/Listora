
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");

const passport = require("passport");
const User = require("./models/user.js");

// Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const wishlistRouter = require("./routes/wishlist.js");

/* ---------------- MongoDB Connection ---------------- */

const dbUrl = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(dbUrl, {
        tls: true,
        tlsAllowInvalidCertificates: false,
    });
}

main()
    .then(() => {
        console.log("Connected to DB");

        const PORT = process.env.PORT || 8080;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("DB Connection Error:", err);
    });

/* ---------------- View Engine ---------------- */

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ---------------- Middlewares ---------------- */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

/* ---------------- Session Configuration ---------------- */

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
    mongooseConnection: mongoose.connection, // existing connection use karo
});

store.on("error", (err) => {
    console.log("Mongo Session Store Error:", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
app.use(flash());

/* ---------------- Passport Setup ---------------- */

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ---------------- Global Variables ---------------- */

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

/* ---------------- Routes ---------------- */

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/", wishlistRouter);

/* ---------------- Home Route ---------------- */

app.get("/", (req, res) => {
    res.redirect("/listings");
});
/* ---------------- Home Route ---------------- */

app.get("/", (req, res) => {
    res.redirect("/listings");
});

//  Isko yahan add karo
app.get("/test-cloudinary", (req, res) => {
    res.json({
        cloud_name: process.env.CLOUD_NAME,
        api_key_exists: !!process.env.CLOUD_API_KEY,
        secret_exists: !!process.env.CLOUD_API_SECRET,
        secret_length: process.env.CLOUD_API_SECRET?.length || 0,
    });
});

/* ---------------- 404 Handler ---------------- */


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});


/* ---------------- Error Handler ---------------- */

app.use((err, req, res, next) => {
    console.error("ERROR:", err);
    console.error(err.stack);

    let { statusCode = 500, message = "Something went wrong!" } = err;

    res.status(statusCode).render("error.ejs", { message });
});
