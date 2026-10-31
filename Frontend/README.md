# Khalid Abdussamii — Portfolio (Frontend)

The website and admin panel for **Khalid Abdussamii**'s portfolio: a dark glassmorphism design with neon cyan and purple accents, smooth scroll animations, and a private admin area for editing every section.

> The API lives in [`../Backend`](../Backend). See the [main README](../README.md) for the full setup.

## ✨ What's in the Site

- **Hero:** typing animation, orbiting skill badges, live counters (certificates, SRC votes, roles, projects) and a CV button ("View & Download CV", or "CV Coming Soon" until a PDF is uploaded).
- **About, Leadership & Experience, Education:** photo, highlights, a timeline of roles and an election-result card.
- **Certifications:** featured cards and a filterable "show all" list.
- **Skills:** grouped by category.
- **Projects:** GitHub-linked cards with a "Featured" badge.
- **Contact:** a form that saves messages to the database, plus social links and availability text.
- **Admin panel** at a private address: profile, about, skills, education, experience, certifications, projects, social links, a messages inbox and an account page.
- Light and dark theme toggle, and a layout built to adapt to phones, tablets and desktops.

## 🛠️ Tech Stack

- **React 18** and **Vite**
- **Tailwind CSS**
- **Framer Motion** for animations
- **React Router** for the website and admin routes
- **React Icons**, **React Scroll**, **React Type Animation**
- **Vercel Analytics**

## 📁 Structure

```text
Frontend/
├── public/                  # Static files (profile photo, etc.)
├── src/
│   ├── admin/               # Admin panel: Login, Dashboard, sections/
│   ├── components/          # Website sections (Hero, About, Skills, ...)
│   ├── context/             # PortfolioContext: loads data from the API
│   ├── data/                # Built-in backup content and certificates
│   ├── services/            # api.js: every call to the backend
│   ├── utils/               # Helpers (image links, social icons)
│   ├── App.jsx              # Routes and layout
│   └── main.jsx             # Entry point
├── vercel.json              # Lets deep links (like the admin address) work on Vercel
├── tailwind.config.js
└── .env.example
```

## ⚙️ Run It Locally

You need Node.js 18 or newer and the backend running (see `../Backend`).

```bash
npm install
cp .env.example .env        # on Windows: copy .env.example .env
npm run dev
```

The site opens at `http://localhost:5173`.

### Environment variables (`Frontend/.env`)

| Variable | What it is |
|---|---|
| `VITE_API_URL` | The backend address, e.g. `http://localhost:5000` (no trailing slash, no `/api`) |
| `VITE_ADMIN_PATH` | The private admin address, e.g. `my-private-path`. Leave empty to use `/admin` |
| `VITE_WEB3FORMS_KEY` | Optional. A free [Web3Forms](https://web3forms.com) key for email alerts |

Restart `npm run dev` after changing `.env`, because Vite only reads it at startup. The admin panel is at `http://localhost:5173/<VITE_ADMIN_PATH>`, and there is no link to it on the public site.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the code with ESLint |

## 🎨 Customising

Most content is edited in the **admin panel**, with no code changes. The built-in backup content is in `src/data/portfolioData.js`. The site shows it only when the database is empty or the backend can't be reached.

## 🚢 Deploy to Vercel

1. Import the repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to `Frontend` (the framework is detected as Vite).
3. Add the environment variables above, with `VITE_API_URL` pointing at your deployed backend.
4. Deploy. `vercel.json` makes direct links work, including the admin address.

After changing a `VITE_` variable on Vercel, redeploy, because those values are built into the site.

## 🔒 Notes

- Never commit `.env` files or paste API keys into this file.
- `VITE_` variables end up in the website's code, so never put private secrets in them.

---
*Built with 💙 using React and Tailwind.*