# Blackcoffer Data Visualization Dashboard

An interactive full-stack data visualization dashboard and analytics platform built for Blackcoffer's recruitment assessment. The project ingests, processes, and visualizes global market, energy, economic, and geopolitical insight records from MongoDB across multiple analytical dimensions.

---

## Live Links

- **Frontend Live Demo**: [Frontend Live Demo](TODO: deploy and add link)
- **Backend API Endpoint**: [Backend API](TODO: deploy and add link)
- **Interactive Swagger Documentation**: [Swagger UI Docs](TODO: deploy and add link / http://localhost:5000/api-docs)

---

## Tech Stack

### Backend
- **Runtime & Language**: Node.js & TypeScript
- **Framework**: Express.js
- **Database & ODM**: MongoDB Atlas & Mongoose
- **Security & Performance**: Helmet, CORS (dynamic origin validation), Express Rate Limit, Compression
- **API Documentation**: Swagger UI (`swagger-ui-express`, `swagger-jsdoc`)
- **Validation**: Zod
- **Testing**: Jest & Supertest (`ts-jest`)
- **Execution & Transpilation**: `tsx`, `typescript`

### Frontend
- **Framework & Language**: React 19 & TypeScript
- **Build Tool**: Vite 8 (with custom Rollup code splitting into cached vendor chunks)
- **Styling**: Tailwind CSS v4 & Vanilla CSS variables
- **Charts & Data Visualization**: Recharts (Bar, Area, Scatter, Pie/Donut, Radial)
- **Icons**: Lucide React
- **HTTP Client**: Axios (with centralized base client & query serializing)
- **Code Quality**: ESLint 10

---

## Features & Assignment Checklist

- [x] **Data Ingestion & Persistence**: 906 records from the provided `jsondata.json` cleaned, validated, and seeded into a MongoDB Atlas database via [`server/src/scripts/seed.ts`](server/src/scripts/seed.ts).
- [x] **RESTful Backend API**: Structured Node.js + Express TypeScript API with dedicated modular routes, schema validations, aggregation pipelines, and centralized error handling.
- [x] **Interactive Dashboard Visualizations**:
  - **Average Intensity by Topic**: Bar chart displaying intensity distribution across industry domains.
  - **Year Trend Analysis**: Area/Line timeline chart displaying insight frequency across target years.
  - **Country Intensity Score**: Horizontal bar chart comparing average intensity scores across nations.
  - **Likelihood vs. Relevance Matrix**: 2D scatter matrix mapping likelihood against relevance, with intensity indicators and detail tooltips.
  - **Regional Distribution**: Interactive Donut chart illustrating proportional insight distribution across global regions.
  - **Sector Breakdown**: Interactive Donut chart analyzing insight volume across economic sectors.
  - **Timeline Overview**: Granular frequency bar chart tracking insight data points over the timeline.
- [x] **6 Dynamic Top-Level KPI Metric Cards**:
  - Total Insights count
  - Average Intensity
  - Average Relevance score across countries
  - Total distinct Topics/Categories
  - Total Countries covered
  - Total Geographical Regions analyzed
- [x] **Filter & Segmentation Engine** (Wired dynamically to backend database):
  - **Topic** filter
  - **Sector** filter
  - **Region** filter
  - **PESTLE** filter
  - **Source** filter
  - **Country** filter
  - **End Year** filter
- [x] **Master Raw Insight Records Table**:
  - Paginated table view with customizable page size (10, 20, 50, 100 records per page).
  - Multi-column sort capability (`intensity`, `likelihood`, `relevance`, `end_year`, `title`).
  - Interactive row detail modal (`InsightDetailModal`) presenting full metadata (URL, impact, published date, source, pestle category).
- [x] **Responsive & Expandable Sidebar**: Hover-responsive drawer expanding from a compact icon bar to a full navigation panel with module labels.
- [x] **Explicit Exclusions**:
  - *City filter*: Excluded because the provided dataset does not contain a `city` field.
  - *SWOT filter*: Excluded because the dataset does not contain a `swot` field; `pestle` (PESTLE categories) and `sector` (industry sectors) are implemented instead.

---

## Project Structure

```
blackcofferassignment/
├── client/                     # Frontend React 19 Application
│   ├── public/                 # Static assets (brand logo, icons)
│   ├── src/
│   │   ├── api/                # Axios client & API fetch functions
│   │   ├── components/
│   │   │   ├── charts/         # 7 Recharts visualization components
│   │   │   ├── common/         # Splash screen, empty states
│   │   │   ├── filters/        # FilterBar & FilterSelect components
│   │   │   ├── layout/         # Expandable Sidebar, StatCards, TopBar
│   │   │   └── table/          # Master InsightsTable & Detail Modal
│   │   ├── types/              # Shared TypeScript definitions
│   │   ├── App.tsx             # Root application orchestrator
│   │   ├── index.css           # Tailwind base styles & custom animations
│   │   └── main.tsx            # React DOM mounting
│   ├── index.html              # HTML entry with SEO & Google Fonts
│   ├── package.json            # Client dependencies & scripts
│   ├── vercel.json             # SPA routing rewrite configuration
│   └── vite.config.ts          # Vite configuration with chunk optimization
│
├── server/                     # Backend Node.js + Express API
│   ├── data/
│   │   └── jsondata.json       # Original provided assignment dataset
│   ├── src/
│   │   ├── config/             # Swagger UI documentation setup
│   │   ├── controllers/        # Route controllers (filters, insights, stats)
│   │   ├── middleware/         # Error handler, pagination, validators
│   │   ├── models/             # Mongoose Insight schema
│   │   ├── routes/             # Express API route declarations
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── scripts/            # MongoDB data seed script
│   │   ├── types/              # Backend TypeScript interfaces
│   │   ├── utils/              # Data cleansing utilities
│   │   └── server.ts           # Express server entry point
│   ├── .env.example            # Backend environment template
│   ├── package.json            # Server dependencies & scripts
│   └── tsconfig.json           # Server TypeScript configuration
│
├── package.json                # Root monorepo configuration
└── README.md                   # Project documentation
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- A MongoDB connection string (MongoDB Atlas or local MongoDB instance)

---

### Method 1: Run Root Monorepo (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shivam000189/blackc.git
   cd blackc
   ```

2. **Install root & package dependencies**:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   cd ..
   ```

3. **Configure Server Environment**:
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?appName=Cluster0
   FRONTEND_URL=http://localhost:5173
   CORS_ORIGIN=http://localhost:3000,http://localhost:5173
   ```

4. **Seed Database**:
   ```bash
   npm run server:seed
   ```

5. **Start Both Servers in Development**:
   ```bash
   npm run dev
   ```
   - Frontend runs at: `http://localhost:5173`
   - Backend API runs at: `http://localhost:5000`
   - Swagger Docs at: `http://localhost:5000/api-docs`

---

### Method 2: Run Backend & Frontend Separately

#### Backend:
```bash
cd server
npm install
npm run seed     # Populate MongoDB database
npm run dev      # Starts tsx watch on port 5000
```

#### Frontend:
```bash
cd client
npm install
npm run dev      # Starts Vite dev server on port 5173
```

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check & database connection status |
| `GET` | `/api/filters` | Distinct values for Topic, Sector, Region, PESTLE, Source, Country, End Year |
| `GET` | `/api/stats` | Aggregated statistical data across all 6 visualization dimensions |
| `GET` | `/api/insights` | Paginated, filtered, sorted, and searchable insight records |
| `GET` | `/api-docs` | Interactive Swagger API documentation UI |

### Query Parameters for `GET /api/insights`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `topic` | string | — | Filter by Topic |
| `sector` | string | — | Filter by Sector |
| `region` | string | — | Filter by Region |
| `pestle` | string | — | Filter by PESTLE category |
| `source` | string | — | Filter by Source |
| `country` | string | — | Filter by Country |
| `end_year` | number | — | Filter by End Year |
| `search` | string | — | Case-insensitive search on title and insight summary |
| `sortBy` | string | `added` | Sort column (`added`, `intensity`, `relevance`, `likelihood`, `end_year`) |
| `order` | string | `desc` | Sort direction (`asc` or `desc`) |
| `page` | number | `1` | Page number |
| `limit` | number | `25` | Records per page (max `100`) |

---

## Data Notes & Architectural Assumptions

1. **Missing Brief Fields**:
   - The original assignment brief mentioned **City** and **SWOT** filters. Inspection of `jsondata.json` confirmed that these fields do not exist in the raw dataset.
   - PESTLE analysis (`pestle`) and economic sectors (`sector`) were implemented to deliver the required multi-level segmentation.
2. **Data Cleansing**:
   - In [`server/src/utils/cleanRecord.ts`](server/src/utils/cleanRecord.ts), raw entries with empty string values (`""`) or missing numerical values are normalized to `null` to ensure consistent indexing and prevent NaN in aggregations.
   - Aggregations and distinct queries filter out non-existent keys using `{ $nin: [null, ""] }`.
3. **Table & Visualization Fallbacks**:
   - In the frontend table, missing text fields gracefully render as an em dash (`—`) rather than displaying empty or broken layouts.
   - Recharts tooltips and legends format zero/null fields safely.
4. **Production Security & Optimization**:
   - Express server enforces Helmet headers with `crossOriginResourcePolicy: false` to allow cross-origin asset loading.
   - Rate limiting protects `/api` endpoints against burst abuse.
   - Vite production build utilizes manual chunk splitting to keep vendor bundles compact and cacheable.

---

## Screenshots

<!-- TODO: Add actual dashboard screenshots or animated GIFs before final submission -->

### 1. Analytics & Visualizations View
![Analytics View Placeholder](TODO: Add screenshot here)

### 2. Master Insights Record Table
![Table View Placeholder](TODO: Add screenshot here)

### 3. Filter Controls & Modal Inspection
![Modal View Placeholder](TODO: Add screenshot here)

---

## What I Would Improve With More Time

1. **Interactive Geographic Map**: Integrate a full SVG/Mapbox choropleth with clickable countries to filter the entire dashboard by region.
2. **Export Capabilities**: Add direct CSV/Excel/PDF export buttons on both chart snapshots and filtered table views.
3. **User Authentication & Saved Views**: Implement JWT/session auth allowing analysts to save customized filter views and dashboard layouts.
4. **WebSocket / Real-Time Updates**: Add real-time event streaming for live insight ingestion without requiring manual page refresh.
5. **End-to-End Test Coverage**: Expand existing Jest integration tests to include Playwright/Cypress UI automated tests.
