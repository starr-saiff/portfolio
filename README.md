# Khalid Abdussamii – Portfolio

React + Vite + Tailwind frontend, Express + MongoDB + Cloudinary backend with an admin panel (`/admin`).

## Quick start
1. **Backend:** `cd Backend && cp .env.example .env`, fill in MongoDB, Cloudinary, JWT secret and your ADMIN_* credentials, then
   `npm install && npm run seed && npm start`. (Seeding wipes the database and loads Khalid's content from `seedData.json`.)
2. **Frontend:** `cd Frontend && cp .env.example .env` (set `VITE_API_URL` to your backend origin), then `npm install && npm run dev`.
3. Sign in at `/admin` to edit profile, about, skills, experience, education and projects, and to upload the CV PDF and profile photo.

Content defaults live in `Frontend/src/data/portfolioData.js`; after editing run `node Backend/generate-seed-data.js` to refresh the seed.
Never commit `.env` files or paste API keys into the README.
