# Laundry Management System Backend (MERN)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
3. Start the server (dev mode):
   ```bash
   npm run dev
   ```

## Features
- User registration & login (JWT auth, bcrypt password hashing)
- Role-based access (user/admin)
- Laundry request management (create, track, update status)
- Admin dashboard endpoints
- MongoDB (Mongoose)
- Ready for OAuth extension

## API Endpoints
- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/requests/my` — User's requests
- `POST /api/requests` — New request
- `PATCH /api/requests/:id` — Update status (admin)
- ...and more

---
Expand as needed for your application! 