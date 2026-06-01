<p align="center">
  <h1 align="center">👔 Wardrobe</h1>
  <p align="center">
    <strong>A smart wardrobe management app that tracks your clothes, organizes outfits, and gives you financial insights on your wardrobe spending.</strong>
  </p>
  <p align="center">
    <a href="https://wardrobe-iota-wine.vercel.app/">🌐 Live Demo</a> · 
    <a href="#screenshots">📸 Screenshots</a> · 
    <a href="#features">✨ Features</a> · 
    <a href="#tech-stack">🛠 Tech Stack</a> · 
    <a href="#database-schema">🗄 DB Schema</a> · 
    <a href="#local-setup">⚙️ Local Setup</a>
  </p>
</p>

---

## The Problem

Most people have no idea how much they've spent on clothes, which items they actually wear, or what outfits they keep reaching for. They buy duplicates, forget about pieces buried in their closet, and never know if that ₹5,000 jacket was a good investment or a waste.

## The Solution

Wardrobe lets you **catalog your clothing**, **build outfits from your items**, **track every time you wear an outfit**, and then gives you **data-driven insights** like cost-per-wear, most neglected items, and smart recommendations on what to wear next.

---

## Screenshots

### Wardrobe Dashboard
> Browse your full clothing collection. Each card shows the item image, category, color, cost, times worn, and real-time cost-per-wear calculation.

<img src="./screenshots/wardrobe-dashboard.png" alt="Wardrobe Dashboard" width="100%"/>

### Add New Clothes
> Add items with image upload (via Cloudinary), category selection, color, and cost tracking.

<img src="./screenshots/add-clothes.png" alt="Add Clothes" width="500"/>

### Outfit Management
> Create outfits by combining clothing items. Track wear count, mark favorites, and see when you last wore each outfit.

<img src="./screenshots/outfits-page.png" alt="Outfit Management" width="100%"/>

### Cost & Value Analytics
> See your total wardrobe value, most expensive items, and best-value items ranked by cost-per-wear.

<img src="./screenshots/cost-insights.png" alt="Cost Insights" width="100%"/>

### Activity & Recommendations
> View recently worn outfits, neglected items that need attention, and smart suggestions on what to wear next based on recency and favorites.

<img src="./screenshots/activity-recommendations.png" alt="Activity & Recommendations" width="100%"/>

---

## Features

### 🗄 Wardrobe Management
- Full CRUD for clothing items (add, view, update, delete)
- Image upload via **Cloudinary CDN**
- Categorization (Tops, Bottoms, Shoes, Outerwear, Accessories, etc.)
- Color and cost tracking per item

### 👗 Outfit Builder
- Create named outfits from your clothing collection
- Many-to-many relationship — same item can belong to multiple outfits
- Favorite/unfavorite outfits
- Delete outfits without losing the individual items

### 📊 Wear Tracking & Analytics
- **Mark as Worn** button with wear counter and timestamp
- Wear history logging for each outfit
- **Cost-per-wear** calculated in real time (item cost ÷ total times worn)
- Most worn / least worn outfit insights

### 💡 Smart Recommendations
- Surfaces outfits you haven't worn in 3+ days
- Prioritizes favorites and least-worn outfits
- Highlights neglected items (not worn in 7+ days)

### 💰 Financial Insights
- **Total wardrobe value** — sum of all item costs
- **Top 5 most expensive items**
- **Top 5 best value items** — lowest cost-per-wear (you're getting your money's worth)
- Per-item cost breakdown with wear context

### 🔐 Authentication
- Secure user registration and login
- Password hashing with **bcrypt**
- **JWT-based** session management
- Protected routes — all wardrobe data is per-user

---

## Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| **React 19** | UI framework with latest features |
| **Vite 8** | Build tool & dev server |
| **React Router v7** | Client-side routing with nested layouts |
| **Tailwind CSS v4** | Utility-first styling (CSS-first config via `@tailwindcss/vite`) |
| **Axios** | HTTP client for API calls |
| **React Icons** | Icon library |
| **React Compiler** | Automatic optimization via Babel plugin |
| **Cloudinary** | Image upload & CDN delivery |

### Backend
| Tech | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **PostgreSQL** | Relational database (hosted on Supabase) |
| **pg (node-postgres)** | PostgreSQL client with connection pooling |
| **bcrypt** | Password hashing (salt rounds: 10) |
| **jsonwebtoken** | JWT generation & verification |
| **CORS** | Cross-origin resource sharing |

### Deployment
| Service | What |
|---|---|
| **Vercel** (Frontend) | Static site hosting with SPA rewrites |
| **Vercel** (Backend) | Serverless Node.js functions |
| **Supabase** | Managed PostgreSQL database |
| **Cloudinary** | Image storage & CDN |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (React)                  │
│           wardrobe-iota-wine.vercel.app              │
│                                                     │
│  Landing ─── Login/Register ─── Private App Shell   │
│                                  ├── Wardrobe       │
│                                  ├── Outfits        │
│                                  ├── Insights       │
│                                  ├── Add Items      │
│                                  └── Add Outfits    │
└──────────────────────┬──────────────────────────────┘
                       │ REST API (Axios)
                       │ JWT in headers
                       ▼
┌─────────────────────────────────────────────────────┐
│              Backend (Express.js API)                │
│        wardrobe-backend-sandy.vercel.app             │
│                                                     │
│  /auth ──── register, login (bcrypt + JWT)           │
│  /api ───── clothes CRUD, cost insights             │
│  /outfit ── outfit CRUD, wear tracking,             │
│             favorites, recommendations              │
│                                                     │
│  Middleware: JWT authorization on all /api & /outfit │
└──────────────────────┬──────────────────────────────┘
                       │ node-postgres (pg)
                       ▼
┌─────────────────────────────────────────────────────┐
│              PostgreSQL (Supabase)                   │
│                                                     │
│  users ──────────────── 1:N ──── clothing_items     │
│    │                                  │             │
│    │                             N:M (via           │
│    │                          outfit_items)         │
│    │                                  │             │
│    └── 1:N ──── outfits ─────────────┘              │
│                    │                                │
│                    └── 1:N ── outfit_wear_history    │
└─────────────────────────────────────────────────────┘
```

---

## Database Schema

```sql
-- Users table
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,   -- bcrypt hashed
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Clothing items belonging to a user
CREATE TABLE clothing_items (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL,
    category    VARCHAR(100),
    color       VARCHAR(100),
    image_url   TEXT,
    cost        DECIMAL(10,2),           -- purchase price
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Outfits (a named collection of clothing items)
CREATE TABLE outfits (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    wear_count      INTEGER DEFAULT 0,
    last_worn_date  TIMESTAMP,
    is_favorite     BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Junction table: many-to-many between outfits and clothing items
CREATE TABLE outfit_items (
    id                SERIAL PRIMARY KEY,
    outfit_id         INTEGER REFERENCES outfits(id) ON DELETE CASCADE,
    clothing_item_id  INTEGER REFERENCES clothing_items(id) ON DELETE CASCADE
);

-- Wear history log for analytics
CREATE TABLE outfit_wear_history (
    id          SERIAL PRIMARY KEY,
    outfit_id   INTEGER REFERENCES outfits(id) ON DELETE CASCADE,
    worn_at     TIMESTAMP DEFAULT NOW()
);
```

### Key Query Highlight

One of the more interesting queries in the project — calculating **cost-per-wear** across a 3-table join:

```sql
SELECT ci.*,
       COALESCE(SUM(o.wear_count), 0) as total_wears,
       CASE
         WHEN ci.cost IS NULL OR ci.cost = 0 THEN NULL
         WHEN COALESCE(SUM(o.wear_count), 0) = 0 THEN ci.cost
         ELSE ROUND(ci.cost / SUM(o.wear_count), 2)
       END as cost_per_wear
FROM clothing_items ci
LEFT JOIN outfit_items oi ON ci.id = oi.clothing_item_id
LEFT JOIN outfits o ON oi.outfit_id = o.id AND o.user_id = $1
WHERE ci.user_id = $1
GROUP BY ci.id
ORDER BY ci.created_at DESC
```

This calculates how much each clothing item costs per wear in real time, by joining across the clothing items → outfit junction → outfits tables.

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create a new account |
| `POST` | `/auth/login` | Login and receive JWT |

### Clothing Items (Protected)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/clothes` | Add a new clothing item |
| `GET` | `/api/wardrobe` | Get all items with wear stats |
| `PUT` | `/api/wardrobe/:id` | Update a clothing item |
| `DELETE` | `/api/wardrobe/:id` | Delete a clothing item |
| `GET` | `/api/cost-insights` | Get financial analytics |

### Outfits (Protected)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/outfit/create` | Create a new outfit |
| `POST` | `/outfit/add` | Add clothing items to an outfit |
| `GET` | `/outfit/get-outfits` | Get all outfits with items |
| `DELETE` | `/outfit/delete/:outfit_id` | Delete an outfit |
| `POST` | `/outfit/:outfit_id/wear` | Log outfit as worn |
| `PATCH` | `/outfit/:outfit_id/favorite` | Toggle favorite status |
| `GET` | `/outfit/insights` | Get wear analytics |
| `GET` | `/outfit/recommendations` | Get smart recommendations |

---

## Local Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL database (local or hosted)

### 1. Clone the repo
```bash
git clone https://github.com/neg1-git/Wardrobe.git
cd Wardrobe
```

### 2. Set up the database

Create a PostgreSQL database and run the schema from the [Database Schema](#database-schema) section above.

### 3. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=postgresql://user:password@host:port/dbname
```

Start the server:
```bash
npm run dev
```

### 4. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

> **Note:** By default the frontend points to the deployed backend. To use your local backend, update the API URLs in the frontend components or set up an environment variable.

---

## What I Learned Building This

This was my first full-stack project. Some things that challenged me and what I took away:

- **Relational database design** — Figuring out the many-to-many relationship between outfits and clothing items, and then querying across junction tables with aggregations, taught me way more than any tutorial.
- **Deployment is its own skill** — Getting the frontend and backend to talk to each other in production (CORS, environment variables, Vercel serverless functions) took multiple iterations.  
- **SQL can do a lot of heavy lifting** — Instead of computing cost-per-wear in JavaScript, doing it directly in PostgreSQL with `CASE/WHEN` and `GROUP BY` is cleaner and more performant.
- **Image uploads aren't trivial** — Integrating Cloudinary for client-side uploads with presigned presets was a real-world integration I hadn't done before.

---

## Future Improvements

- [ ] Migrate to TypeScript for type safety
- [ ] Add unit and integration tests (Jest + Supertest)
- [ ] Add calendar view to visualize outfit history
- [ ] Weather-based outfit recommendations via external API
- [ ] AI-powered outfit suggestions using wardrobe data
- [ ] Drag-and-drop outfit builder UI
- [ ] Mobile app with React Native

---

<p align="center">
  Built by <a href="https://github.com/neg1-git">Sahil Negi</a> · 
  <a href="https://www.linkedin.com/in/sahil-negi-9723281b2/">LinkedIn</a> · 
  <a href="mailto:sahil.negi7888@gmail.com">Email</a>
</p>
