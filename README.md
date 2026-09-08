# Blackcoffer Data Visualization Dashboard & Analytics Platform

A production-ready fullstack analytics suite built with React 19, TypeScript, Tailwind CSS, Express, MongoDB, and Recharts.

---

## Architecture & Features

- **Frontend (Client)**:
  - React 19 + TypeScript + Vite 8
  - Tailwind CSS + Lucide Icons + Recharts
  - Split production chunks (`vendor-react`, `vendor-charts`, `vendor-icons`, `vendor-http`)
  - Live filtering across 7 dimensions (Topic, Sector, Region, PESTLE, Source, Country, End Year)
  - 6 KPI Stat Cards, 7 Visualization Charts, and a Master Raw Records Table with pagination, sorting & detail modals
  - Collapsible & hover-responsive sidebar navigation

- **Backend (Server)**:
  - Node.js + Express + TypeScript
  - MongoDB Atlas via Mongoose ODM
  - Aggregation pipeline for multi-dimensional statistical metrics
  - Robust security: Helmet, CORS whitelist, rate limiting, and gzip compression
  - Graceful shutdown handling (`SIGTERM` & `SIGINT`)
  - Interactive Swagger API Documentation (`/api-docs`)

---

## Production Build & Deployment

### 1. Root Monorepo Commands

```bash
# Install root dependencies
npm install

# Build both backend and frontend for production
npm run build

# Seed the database (if not yet populated)
npm run server:seed

# Start backend in production
npm run server:start

# Preview frontend production build locally
npm run client:preview
```

---

## Deploying Backend (e.g. Render / Railway / Heroku)

1. Set the root directory to `server`.
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm start`
4. **Environment Variables**:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Cluster0
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

---

## Deploying Frontend (e.g. Vercel / Netlify / Cloudflare Pages)

1. Set the root directory to `client`.
2. **Framework Preset**: Vite
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables**:
   ```env
   VITE_API_URL=https://your-backend-domain.onrender.com/api
   ```
6. SPA URL rewrite configuration is provided in [`client/vercel.json`](client/vercel.json).

---

## API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check & database connection status |
| GET | `/api/insights` | Filtered, searchable, and paginated insights list |
| GET | `/api/filters` | Distinct filter options for all dropdown selectors |
| GET | `/api/stats` | Aggregated statistical data across 6 chart dimensions |
| GET | `/api-docs` | Interactive Swagger API documentation |

