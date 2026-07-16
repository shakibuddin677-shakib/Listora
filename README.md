# Listora

Listora is an Airbnb-style property listing and booking platform built with Node.js, Express, and MongoDB. Users can browse, search, and filter stays, leave reviews and ratings, save listings to a wishlist, and manage their own listings with image uploads.

**Live Demo:** [https://listora-2udt.onrender.com](https://listora-2udt.onrender.com)

> Hosted on Render's free tier — the server may take 30–50 seconds to spin up on the first request after inactivity.

## Features

- User authentication (signup, login, logout) with Passport.js
- Create, edit, and delete property listings with image upload via Cloudinary
- Search listings by title, location, or country, with category and max-price filters, and sort by price or newest
- Star-rating reviews with an average rating and rating breakdown per listing
- Wishlist — save and remove listings, with a dedicated wishlist page
- Owner-only access control for editing/deleting listings (authorization middleware)
- Flash messages for user feedback (success/error)
- Dark mode toggle
- Responsive UI with EJS templating

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose
**Templating:** EJS, ejs-mate (layouts)
**Auth:** Passport.js, passport-local-mongoose
**File uploads:** Multer, Cloudinary
**Validation:** Joi
**Session storage:** express-session with connect-mongo
**Other:** connect-flash, method-override, dotenv

## Project Structure

```
.
├── app.js                  # app entry point
├── cloudConfig.js          # Cloudinary + Multer storage config
├── schema.js                # Joi validation schemas
├── middleware.js            # auth & validation middleware
├── controllers/             # route handler logic
│   ├── listings.js
│   ├── review.js
│   ├── user.js
│   └── wishlist.js
├── models/                  # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/                  # Express routers
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── wishlist.js
├── views/                   # EJS templates
├── public/                  # static CSS/JS
├── init/                    # DB seed script
└── utils/                   # error handling helpers
```

## Getting Started

### Prerequisites

- Node.js 20.x
- A MongoDB Atlas cluster (or local MongoDB instance)
- A Cloudinary account (for image uploads)

### Installation

```bash
git clone https://github.com/shakibuddin677-shakib/Listora
cd Listora
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### Seed the database (optional)

```bash
node init/index.js
```

### Run the app

```bash
node app.js
```

The app will run on `http://localhost:8080` by default (or the `PORT` you set in `.env`).

## License

ISC
