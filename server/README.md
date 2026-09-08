# Blackcoffer Dashboard API Backend

High-performance REST API built with Node.js, Express, TypeScript, and MongoDB for the Blackcoffer Data Visualization Dashboard. It provides multi-dimensional data aggregations, dynamic filter extraction, full-text regex search, and paginated master dataset queries.

---

## Live Links

- **Live Base API**: [https://blackc.onrender.com](https://blackc.onrender.com)
- **Live Health Check**: [https://blackc.onrender.com/health](https://blackc.onrender.com/health)
- **Interactive Swagger Documentation**: [https://blackc.onrender.com/api-docs](https://blackc.onrender.com/api-docs)

---

## Tech Stack & Architecture

- **Runtime & Language**: Node.js & TypeScript
- **Web Framework**: Express.js
- **Database & ODM**: MongoDB Atlas & Mongoose
- **Validation Engine**: Zod (Strict schema validation on query parameters)
- **API Documentation**: Swagger UI (`swagger-ui-express`, `swagger-jsdoc`)
- **Automated Testing**: Jest & Supertest (`ts-jest`)
- **Security & Performance**:
  - `helmet`: Secure HTTP response headers
  - `cors`: Dynamic origin whitelisting supporting local dev and production domains
  - `express-rate-limit`: Rate limiting protection against burst traffic
  - `compression`: Gzip response compression
  - Graceful shutdown handling (`SIGTERM` & `SIGINT`)

---

## Project Structure

```
server/
├── data/
│   └── jsondata.json           # Raw source dataset (906 records)
├── src/
│   ├── __tests__/              # Jest integration & route test suites
│   ├── config/
│   │   └── swagger.ts          # OpenAPI / Swagger JSDoc configuration
│   ├── controllers/
│   │   ├── filters.controller.ts  # Distinct filter metadata handler
│   │   ├── insights.controller.ts # Paginated & filtered records query handler
│   │   └── stats.controller.ts    # Aggregation pipelines across 6 dimensions
│   ├── middleware/
│   │   ├── errorHandler.ts     # Centralized error handler with production concealment
│   │   ├── paginate.ts         # Query pagination parser & sanitizer
│   │   └── validateRequest.ts  # Zod schema validation middleware
│   ├── models/
│   │   └── Insight.ts          # Mongoose schema with optimized compound indexes
│   ├── routes/
│   │   ├── filters.routes.ts   # /api/filters route definition
│   │   ├── insights.routes.ts  # /api/insights route definition
│   │   ├── stats.routes.ts     # /api/stats route definition
│   │   └── index.ts            # Central API route aggregator
│   ├── schemas/
│   │   └── insight.schema.ts   # Zod validation schemas for query parameters
│   ├── scripts/
│   │   └── seed.ts             # Database seeding & data cleansing script
│   ├── types/
│   │   └── insight.types.ts    # TypeScript interfaces & types
│   ├── utils/
│   │   ├── asyncHandler.ts     # Async error forwarding wrapper
│   │   └── cleanRecord.ts      # Null string and NaN sanitization utility
│   └── server.ts               # Express application entry point & listener
├── .env.example                # Environment variables template
├── jest.config.js              # Jest configuration
├── package.json                # Dependencies & npm scripts
└── tsconfig.json               # TypeScript compiler options
```

---

## API Routes & Endpoints Reference

### 1. Health & Status

#### `GET /health`
- **Description**: Returns server liveness, uptime timestamp, and active MongoDB connection status.
- **Access**: Public
- **Response**: `200 OK`
```json
{
  "status": "UP",
  "timestamp": "2026-09-08T03:47:52.444Z",
  "database": "connected"
}
```

#### `GET /`
- **Description**: Root entry point providing an overview and available API endpoints.
- **Response**: `200 OK`
```json
{
  "success": true,
  "message": "Blackcoffer Dashboard API is running",
  "endpoints": {
    "health": "/health",
    "documentation": "/api-docs",
    "insights": "/api/insights",
    "filters": "/api/filters",
    "stats": "/api/stats"
  }
}
```

---

### 2. Filters Endpoint

#### `GET /api/filters`
- **Description**: Retrieves distinct, non-empty values from the database for all 7 filter dropdowns. Used by the frontend to dynamically populate selector options.
- **Access**: Public
- **Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "topics": ["Energy", "Oil", "Gas", "Finance", "Healthcare", "Technology", ...],
    "sectors": ["Energy", "Financial services", "Manufacturing", "Retail", ...],
    "regions": ["Africa", "Asia", "Central America", "Europe", "Northern America", ...],
    "pestles": ["Economic", "Environmental", "Political", "Social", "Technological", ...],
    "sources": ["Bloomberg", "EIA", "Gartner", "IEA", "World Bank", ...],
    "countries": ["China", "Germany", "India", "Russia", "United States of America", ...],
    "endYears": [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2025, 2030, ...]
  }
}
```

---

### 3. Aggregated Analytics & Statistics

#### `GET /api/stats`
- **Description**: Executes multi-pipeline MongoDB aggregations across 6 analytical dimensions. When filter query parameters are provided, aggregations are dynamically scoped to match the filtered subset.
- **Query Parameters (Optional Filters)**:
  - `completeness` *(string)*: `all` (default), `complete`, or `incomplete`
  - `topic` *(string)*: Filter by Topic
  - `sector` *(string)*: Filter by Sector
  - `region` *(string)*: Filter by Region
  - `pestle` *(string)*: Filter by PESTLE
  - `source` *(string)*: Filter by Source
  - `country` *(string)*: Filter by Country
  - `end_year` *(number)*: Filter by Target End Year
- **Aggregated Dimensions Returned**:
  1. `intensityByTopic`: Average intensity grouped by topic (sorted descending).
  2. `insightsByYear`: Volume of insights grouped by target end year (sorted chronologically).
  3. `intensityByCountry`: Average intensity and average relevance scored across countries.
  4. `sectorDistribution`: Proportional insight count across economic sectors.
  5. `regionDistribution`: Proportional insight count across global geographical regions.
  6. `topicRegionHeatmap`: Cross-tabulation of average intensity by Topic and Region.

- **Response**: `200 OK`

---

#### `GET /api/stats/completeness`
- **Description**: Returns overall data completeness statistics and a breakdown of missing values across the 6 core dimensions (`topic`, `sector`, `region`, `pestle`, `source`, `country`).
- **Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "total": 1000,
    "complete": 263,
    "incomplete": 737,
    "missingFieldBreakdown": {
      "topic": 93,
      "sector": 229,
      "region": 453,
      "pestle": 93,
      "source": 1,
      "country": 650
    }
  }
}
```

---

### 4. Paginated Master Insights Records

#### `GET /api/insights`
- **Description**: Returns paginated, searchable, and sortable insight documents from MongoDB matching applied filters and search keywords.
- **Query Parameters**:

| Parameter | Type | Default | Description |
|---|---|---|---|
| `completeness` | string | `all` | Filter by completeness: `all` (default), `complete` (all 6 core fields present), `incomplete` (missing $\ge 1$ required field) |
| `topic` | string | — | Filter by Topic |
| `sector` | string | — | Filter by Sector |
| `region` | string | — | Filter by Region |
| `pestle` | string | — | Filter by PESTLE category |
| `source` | string | — | Filter by Source organization |
| `country` | string | — | Filter by Country name |
| `end_year` | number | — | Filter by 4-digit End Year (e.g. `2025`) |
| `search` | string | — | Case-insensitive regex search in `title` and `insight` description |
| `sortBy` | string | `added` | Sort field: `added`, `intensity`, `relevance`, `likelihood`, `end_year` |
| `order` | string | `desc` | Sort direction: `asc` or `desc` |
| `page` | number | `1` | Page number (1-indexed) |
| `limit` | number | `25` | Results per page (max `100`) |

- **Response**: `200 OK`
```json
{
  "success": true,
  "count": 25,
  "total": 1000,
  "page": 1,
  "limit": 25,
  "totalPages": 40,
  "data": [
    {
      "_id": "64f9b8c3a1e2d45b78901234",
      "title": "Renewable energy adoption to accelerate in Northern America",
      "insight": "Rapid deployment of solar and wind generation capacity...",
      "url": "http://www.eia.gov/forecasts/aeo/er/",
      "topic": "energy",
      "sector": "Energy",
      "region": "Northern America",
      "country": "United States of America",
      "intensity": 12,
      "likelihood": 4,
      "relevance": 5,
      "pestle": "Economic",
      "source": "EIA",
      "start_year": 2022,
      "end_year": 2026,
      "added": "2023-01-20T10:45:00.000Z",
      "published": "2023-01-15T00:00:00.000Z",
      "impact": null
    }
  ]
}
```

---

### 5. Swagger Interactive Documentation

#### `GET /api-docs`
- **Description**: Interactive OpenAPI 3.0 documentation interface powered by Swagger UI. Allows real-time parameter testing and response inspection directly in the browser.

---

## Data Model (Mongoose Schema)

```typescript
export interface IInsight {
  end_year: number | null;
  intensity: number;
  sector: string | null;
  topic: string;
  insight: string;
  url: string;
  region: string | null;
  start_year: number | null;
  impact: number | null;
  added: Date;
  published: Date | null;
  country: string | null;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
}
```

---

## Data Notes & Cleansing Logic

1. **Data Completeness Standard**:
   - A record is classified as **Complete** when all 6 core attributes are populated: `topic`, `sector`, `region`, `pestle`, `source`, and `country`.
   - Records with `null` in any of these 6 fields are classified as **Incomplete** and can be queried via `completeness=incomplete`.
   - In MongoDB, all 1,000 raw documents are seeded; 263 are fully complete and 737 are incomplete across the 6 dimensions.
2. **Missing Brief Fields**:
   - The original assignment mentioned `city` and `swot`. The provided `jsondata.json` dataset does not contain these fields.
   - PESTLE analysis (`pestle`) and industry categories (`sector`) are implemented as the dual-segmentation framework.
3. **Sanitization (`server/src/utils/cleanRecord.ts`)**:
   - Converts empty strings (`""`) into `null` to ensure accurate sparse indexing and predictable null queries.
   - Parses date strings into ISO `Date` objects.
   - Converts empty numerical values to numeric defaults or `null` to prevent aggregation calculation anomalies.
4. **Optimized Aggregations**:
   - Distinct queries and statistical pipelines utilize `{ $nin: [null, ""] }` to ensure only valid data points are grouped.

---

## Setup & Running Locally

### 1. Environment Configuration
Create `.env` in the `server` root:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?appName=Cluster0
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### 2. Install & Seed
```bash
# Install dependencies
npm install

# Ingest and seed the MongoDB database
npm run seed
```

### 3. Run Server
```bash
# Start development server with live reload (tsx watch)
npm run dev

# Run automated tests
npm test

# Build TypeScript to dist/
npm run build

# Start production server
npm start
```
