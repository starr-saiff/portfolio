# Portfolio Backend API

The Node.js and Express API behind Khalid Abdussamii's portfolio. It stores the portfolio content and contact messages in **MongoDB Atlas**, keeps uploaded files on **Cloudinary**, and protects the admin routes with **JWT** login.

## ✨ Features

- REST API for the portfolio content (profile, about, skills, education, experience, projects, certifications, social links)
- Contact-form inbox: save, read, mark read, reply notes and delete
- Admin login with JWT, plus an endpoint to change the admin username, email and password
- File uploads (images and documents) stored on Cloudinary
- Security: public sign-up disabled, admin-only API, rate limits on login, contact and account changes, and a CORS allow-list

## ⚙️ Setup

```bash
npm install
cp .env.example .env        # on Windows: copy .env.example .env
```

Fill in `.env`:

| Variable | What it is |
|---|---|
| `MONGODB_URI` | Your MongoDB Atlas connection string (include a database name) |
| `PORT` | Server port. Defaults to `5000` |
| `NODE_ENV` | `development` or `production` |
| `JWT_SECRET` | A long random string |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | From your Cloudinary dashboard |
| `CLIENT_ORIGIN` | The website address(es) allowed to call the API, comma-separated, no trailing slash. Example: `http://localhost:5173` |
| `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | The admin login created by the seed. Choose a strong password |

To create a random secret:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Create the admin account and starting content **once**:

```bash
npm run seed
```

> ⚠️ `npm run seed` wipes the database before loading the starting content. Run it only for a fresh start.

Start the server:

```bash
npm run dev      # development, restarts on changes
npm start        # production
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start with nodemon |
| `npm start` | Start the server |
| `npm run seed` | Create the admin user and load starting content (wipes the database) |
| `npm run verify` | Check the stored data |
| `npm run test:db` | Test the database connection |
| `npm run test:password` | Test password hashing |

## 🔌 API Endpoints

### Portfolio
| Method | Route | Access |
|---|---|---|
| `GET` | `/api/portfolio` | Public |
| `PUT` | `/api/portfolio` | Admin |
| `PUT` | `/api/portfolio/section/:section` | Admin |

### Authentication
| Method | Route | Access |
|---|---|---|
| `POST` | `/api/auth/login` | Public (rate limited) |
| `GET` | `/api/auth/me` | Admin |
| `PUT` | `/api/auth/account` | Admin (needs the current password, rate limited) |
| `POST` | `/api/auth/register` | **Disabled** (returns 403) |

### Contact messages
| Method | Route | Access |
|---|---|---|
| `POST` | `/api/contact` | Public (rate limited) |
| `GET` | `/api/contact` | Admin |
| `GET` | `/api/contact/:id` | Admin |
| `PATCH` | `/api/contact/:id/read` | Admin |
| `PATCH` | `/api/contact/:id/reply` | Admin |
| `DELETE` | `/api/contact/:id` | Admin |
| `DELETE` | `/api/contact` | Admin (deletes all) |

### Uploads (Cloudinary)
| Method | Route | Access |
|---|---|---|
| `POST` | `/api/upload` | Admin |
| `DELETE` | `/api/upload/:type/:filename` | Admin |

Admin routes need this header:

```
Authorization: Bearer <your_jwt_token>
```

## ☁️ Cloudinary Notes

- **Images:** JPG, PNG, GIF, WebP, SVG
- **Documents:** PDF, DOC, DOCX, ODT, RTF, TXT
- **Size limit:** 10 MB per file
- **PDF delivery:** new Cloudinary accounts block PDFs by default. In the Cloudinary console, open **Settings → Security** and turn on **Allow delivery of PDF and ZIP files**, or CV downloads return a 401 error.

## 🔒 Security

- Public registration is disabled, and every admin route checks for an admin account.
- Login is limited to 10 attempts per 15 minutes, and contact messages to 10 per hour.
- Only the addresses listed in `CLIENT_ORIGIN` can call the API from a browser.
- Never commit `.env` files. If a key is ever exposed, rotate it and update your environment variables.

## 🚢 Deploy to Render

1. Create a **Web Service** from the repository.
2. Set **Root Directory** to `Backend`, **Build Command** to `npm install` and **Start Command** to `npm start`.
3. Add the environment variables from `.env` (you don't need the `ADMIN_*` ones once the admin exists).
4. Set `CLIENT_ORIGIN` to your website address.

On Render's free plan the service sleeps after about 15 minutes without visits, so the first request can take up to a minute.

## 🗄️ Data

The portfolio document stores: profile, about, skills, education, experience, projects, certifications, an election-result card, social links and contact details. Contact messages are stored separately, and the admin user in its own collection.