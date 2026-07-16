<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1814,100:2b6e4f&height=180&section=header&text=Listora&fontSize=60&fontColor=ffffff&fontAlignY=35&desc=Find%20your%20next%20stay,%20effortlessly&descAlignY=55&descSize=18" alt="Listora banner"/>

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-Visit_Site-2b6e4f?style=for-the-badge)](https://listora-2udt.onrender.com)

<br/>

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-Templating-B4CA65?style=flat-square)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/shakibuddin677-shakib/Listora?style=flat-square)
![Repo Size](https://img.shields.io/github/repo-size/shakibuddin677-shakib/Listora?style=flat-square)

**An Airbnb-inspired full-stack property listing & booking platform**
<br/>
Search stays, leave reviews, save favourites, and manage your own listings — all built from scratch.

[**🔗 View Live Site**](https://listora-2udt.onrender.com) · [**🐛 Report a Bug**](https://github.com/shakibuddin677-shakib/Listora/issues) · [**✨ Request a Feature**](https://github.com/shakibuddin677-shakib/Listora/issues)

</div>

<br/>

## 📋 Table of Contents

<details>
<summary>Click to expand</summary>

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Routes](#-api-routes)
- [Roadmap](#-roadmap)
- [Author](#-author)
- [License](#-license)

</details>

<br/>

## 🌍 Overview

Listora is a full-stack MERN-style web application (Express + MongoDB + EJS) built to feel like a real production listing platform, not a tutorial clone. It handles everything from authenticated CRUD operations to image uploads, review aggregation, and access control — all built and deployed end-to-end.

> ⚠️ **Note:** Hosted on Render's free tier — the first request after inactivity may take 30–50 seconds to spin up.

<br/>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

**🔐 Authentication & Security**
- Secure signup/login/logout via Passport.js
- Session persistence with MongoDB-backed store
- Server-side ownership checks (only owners can edit/delete their own listings)

**🏘️ Listings**
- Full CRUD for property listings
- Image upload & hosting via Cloudinary
- Cloudinary transforms for optimized previews

</td>
<td width="50%" valign="top">

**🔍 Discovery**
- Full-text search across title, location, country
- Category & max-price filters
- Sort by newest or price (asc/desc)

**⭐ Engagement**
- Star-rating review system with live average & breakdown
- Wishlist — save/remove listings, dedicated wishlist page
- Flash messages for instant feedback
- Light/dark theme toggle

</td>
</tr>
</table>

<br/>

## 🛠️ Tech Stack

<div align="center">

![Skills](https://skillicons.dev/icons?i=nodejs,express,mongodb,html,css,js,git,github)

</div>

| Layer | Tools |
|---|---|
| **Runtime / Server** | Node.js, Express 5 |
| **Database / ODM** | MongoDB Atlas, Mongoose |
| **Templating** | EJS, ejs-mate (layouts) |
| **Auth** | Passport.js, passport-local-mongoose |
| **Media** | Cloudinary, Multer, multer-storage-cloudinary |
| **Validation** | Joi |
| **Sessions** | express-session, connect-mongo |
| **UX** | connect-flash, method-override |

<br/>

## 📸 Screenshots

<div align="center">

<table>
<tr>
<td align="center" width="33%"><b>Home / Browse</b></td>
<td align="center" width="33%"><b>Listing Details</b></td>
<td align="center" width="33%"><b>Dark Mode</b></td>
</tr>
<tr>
<td><img src="./screenshots/home.png" width="100%"/></td>
<td><img src="./screenshots/details.png" width="100%"/></td>
<td><img src="./screenshots/dark.png" width="100%"/></td>
</tr>
</table>

</div>

> 📝 Drop your screenshots into a `screenshots` folder at the project root using the filenames above — they'll render automatically.

<br/>

## 📁 Project Structure

```
Listora/
├── app.js                   # App entry point — middleware, DB connection, routes
├── cloudConfig.js           # Cloudinary + Multer storage config
├── schema.js                # Joi validation schemas
├── middleware.js            # Auth & validation middleware
├── controllers/              # Route handler logic
│   ├── listings.js
│   ├── review.js
│   ├── user.js
│   └── wishlist.js
├── models/                   # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/                   # Express routers
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── wishlist.js
├── views/                    # EJS templates
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
├── public/                   # Static CSS/JS assets
├── init/                     # Database seed script
└── utils/                    # Error handling helpers
```

<br/>

## 🚀 Getting Started

### Prerequisites

- Node.js **20.x**
- A MongoDB Atlas cluster (or local MongoDB instance)
- A Cloudinary account

### Installation

```bash
git clone https://github.com/shakibuddin677-shakib/Listora
cd Listora
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
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

### Run locally

```bash
node app.js
```

App runs at `http://localhost:8080` by default (or your configured `PORT`).

<br/>

## 🔌 API Routes

<details>
<summary><b>Listings</b></summary>
<br/>

| Method | Endpoint | Description | Auth |
|---|---|---|:---:|
| `GET` | `/listings` | List all listings (search/filter/sort) | – |
| `GET` | `/listings/new` | Render new listing form | ✅ |
| `POST` | `/listings` | Create a new listing | ✅ |
| `GET` | `/listings/:id` | View a single listing | – |
| `GET` | `/listings/:id/edit` | Render edit form | ✅ owner |
| `PUT` | `/listings/:id` | Update a listing | ✅ owner |
| `DELETE` | `/listings/:id` | Delete a listing | ✅ owner |

</details>

<details>
<summary><b>Reviews</b></summary>
<br/>

| Method | Endpoint | Description | Auth |
|---|---|---|:---:|
| `POST` | `/listings/:id/reviews` | Add a review to a listing | ✅ |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete a review | ✅ author |

</details>

<details>
<summary><b>Users</b></summary>
<br/>

| Method | Endpoint | Description | Auth |
|---|---|---|:---:|
| `GET` `POST` | `/signup` | Render form / create account | – |
| `GET` `POST` | `/login` | Render form / authenticate | – |
| `GET` | `/logout` | Log out current user | ✅ |

</details>

<details>
<summary><b>Wishlist</b></summary>
<br/>

| Method | Endpoint | Description | Auth |
|---|---|---|:---:|
| `GET` | `/wishlist` | View saved listings | ✅ |
| `POST` | `/wishlist/toggle/:id` | Add/remove a listing from wishlist | ✅ |

</details>

<br/>

## 🗺️ Roadmap

- [ ] Pagination for listings
- [ ] Booking/reservation flow with date picker
- [ ] Email notifications on booking
- [ ] Payment integration

<br/>

## 👤 Author

<div align="center">

**Shakibuddin**
B.Tech CSE (Lateral Entry) · IES College of Technology, Bhopal

[![GitHub](https://img.shields.io/badge/GitHub-shakibuddin677--shakib-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shakibuddin677-shakib)

</div>

<br/>

## 📄 License

This project is licensed under the **ISC License**.

<br/>

<div align="center">

If you found this project useful, consider giving it a ⭐ on GitHub!

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:2b6e4f,100:1a1814&height=100&section=footer" alt="footer"/>

</div>
