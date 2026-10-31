# Khalid Abdussamii — Portfolio

A full-stack personal portfolio for **Khalid Abdussamii**, a Computer Science student at Albukhary International University and aspiring Data Scientist, SRC Exco (Art & Culture) and student leader.

The site has a dark glassmorphism design with neon cyan and purple accents, smooth scroll animations, and a private **admin panel** so every section can be edited without touching the code.

<!-- Add a screenshot to the repo, then uncomment the next line and fix the path:
![Portfolio preview](Frontend/public/screenshot.png)
-->

**Live site:** _add your Vercel link here after deploying_

---

## ✨ Features

**Public website**

- **Hero** with a typing animation, orbiting skill badges, live counters (certificates, SRC votes, roles, projects) and a CV button that shows "View & Download CV" once a PDF is uploaded.
- **About** section with a photo, highlights and personal details.
- **Leadership & Experience** timeline, plus an election-result card and education.
- **Certifications** section with featured cards and a filterable "show all" list.
- **Skills** grouped by category (Data Science & AI, Leadership & Communication, Creative & Performing Arts, Sports & Fitness).
- **Projects** shown as GitHub-linked cards with a "Featured" badge.
- **Contact** form that saves every message to the database, with optional email alerts, editable availability text and social links.
- Light and dark theme toggle, and a layout built to adapt to phones, tablets and desktops.

**Admin panel**

- Edit profile, about, skills, education, experience, certifications, projects and social links.
- Star a certificate or project to feature or unfeature it.
- **Messages inbox:** read, mark read or unread, delete, and reply by email.
- Upload your CV and profile photo (stored on Cloudinary).
- **Account** page to change the admin username, email and password.
- Live counters that follow your real data, so adding a certificate or project updates the numbers automatically.

**Security**

- Public sign-up is disabled, and the API only accepts admin accounts.
- Login, contact and account-change requests are rate limited.
- The API only accepts requests from your own website (CORS allow-list).
- The admin page lives at a private address you choose, with no link on the public site.

---

## 🛠️ Tech Stack

| Part | Technologies |
|---|---|
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion, React Router, React Icons, React Scroll, React Type Animation, Vercel Analytics |
| **Backend** | Node.js, Express, MongoDB with Mongoose, JSON Web Tokens, bcryptjs, Multer, express-rate-limit |
| **Services** | MongoDB Atlas (database), Cloudinary (CV and image storage), Web3Forms (optional email alerts) |
| **Hosting** | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
portfolio/
├── Frontend/
│   ├── public/                 # Static files (profile photo, etc.)
│   ├── src/
│   │   ├── admin/              # Admin panel (Login, Dashboard, sections/)
│   │   ├── components/         # Website sections (Hero, About, Skills, ...)
│   │   ├── context/            # PortfolioContext: loads data from the API
│   │   ├── data/               # Built-in backup content and certificates
│   │   ├── services/           # api.js: all calls to the backend
│   │   └── utils/              # Small helpers (images, social icons)
│   ├── vercel.json             # Lets deep links (like the admin address) work on Vercel
│   └── .env.example
└── Backend/
    ├── config/                 # Cloudinary setup
    ├── middleware/             # Admin authentication
    ├── models/                 # Portfolio, User, ContactMessage
    ├── routes/                 # auth, portfolio, contact, upload
    ├── seed.js                 # Creates the admin account and starting content
    ├── seedData.json           # Starting content used by the seed
    ├── server.js
    └── .env.example
```

---

## ⚙️ Run It Locally

**You need:** Node.js 18 or newer, a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster, and a free [Cloudinary](https://cloudinary.com) account.

### 1. Backend

```bash
cd Backend
npm install
cp .env.example .env        # on Windows: copy .env.example .env
```

Fill in `Backend/.env`:

| Variable | What it is |
|---|---|
| `MONGODB_URI` | Your Atlas connection string |
| `JWT_SECRET` | A long random string |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | From your Cloudinary dashboard |
| `CLIENT_ORIGIN` | The website address allowed to call the API, e.g. `http://localhost:5173` |
| `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | The admin login created by the seed (choose a strong password) |

Create the admin account and starting content **once**:

```bash
npm run seed
```

> ⚠️ `npm run seed` wipes the database before loading the starting content. Don't run it again unless you want to start over.

Start the API:

```bash
npm run dev
```

### 2. Frontend

```bash
cd Frontend
npm install
cp .env.example .env        # on Windows: copy .env.example .env
```

Fill in `Frontend/.env`:

| Variable | What it is |
|---|---|
| `VITE_API_URL` | The backend address, e.g. `http://localhost:5000` (no trailing slash, no `/api`) |
| `VITE_ADMIN_PATH` | The private address of the admin page, e.g. `my-private-path`. Leave empty to use `/admin` |
| `VITE_WEB3FORMS_KEY` | Optional. A free [Web3Forms](https://web3forms.com) key for email alerts |

```bash
npm run dev
```

The site runs at `http://localhost:5173`. The admin panel is at `http://localhost:5173/<VITE_ADMIN_PATH>`.

---

## 🎨 Customising the Content

Almost everything is edited from the **admin panel**, with no code changes:

| What you want to change | Where |
|---|---|
| Name, title, hero text, photo, CV | Profile |
| Heading, intro, highlights, languages | About |
| Skills and categories | Skills |
| Roles and dates | Experience |
| Certificates (feature with the star) | Certifications |
| Projects (feature with the star) | Projects |
| Icons and links | Social Links |
| Email, phone, location, availability, messages | Messages & Contact |
| Admin username, email, password | Account |

The built-in backup content lives in `Frontend/src/data/portfolioData.js`. The site uses it only when the database is empty or the backend can't be reached.

---

## 🚢 Deployment

1. **Backend on Render**: create a Web Service from this repository with Root Directory `Backend`, Build Command `npm install` and Start Command `npm start`. Add the environment variables from `Backend/.env` (without the `ADMIN_*` values) and set `CLIENT_ORIGIN` to your website address.
2. **Frontend on Vercel**: import this repository with Root Directory `Frontend`. Add `VITE_API_URL` (your Render address), `VITE_ADMIN_PATH` and optionally `VITE_WEB3FORMS_KEY`.
3. Set `CLIENT_ORIGIN` on Render to your final Vercel address, and update the Website URL in Web3Forms if you use it.

`Frontend/vercel.json` makes direct links, like the admin address, work on Vercel.

---

## 🔒 Security Notes

- **Never commit `.env` files** or paste API keys into the code or this README.
- If a key is ever exposed, rotate it in MongoDB Atlas, Cloudinary or Web3Forms, then update the environment variables.
- Keep your admin address private and your admin password long and unique.

---

## 🙏 Acknowledgements

Started from a portfolio template shared by a friend, **Muhib**, then rebuilt and extended with a full backend, admin panel, new sections and my own content.

---

## 📬 Connect

- LinkedIn: [khalid-abdussamii](https://www.linkedin.com/in/khalid-abdussamii-10a66335a)
- GitHub: [starr-saiff](https://github.com/starr-saiff)
- Credly: [khalid-abdussamii](https://www.credly.com/users/khalid-abdussamii)

Built with 💙 using React, Express and MongoDB.