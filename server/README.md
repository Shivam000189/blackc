# Blackcoffer Dashboard API

Node.js + TypeScript + Express + MongoDB backend for the data visualization dashboard.

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Validation:** Zod
- **Documentation:** Swagger UI
- **Testing:** Jest + Supertest
- **Security:** Helmet, CORS, Express Rate Limit, Compression, Morgan

## Project Structure

```
src/
├── __tests__/          # Jest test suites
├── config/             # Swagger configuration & DB/Env
├── controllers/        # Route handlers
├── middleware/         # Validation, pagination, error handling
├── models/             # Mongoose schemas
├── routes/             # API route definitions
├── schemas/            # Zod validation schemas
├── scripts/            # Database seed script
├── types/              # TypeScript interfaces
├── utils/              # Helper functions
└── server.ts           # Application entry point
```

## Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Setup Instructions

```bash
# Install dependencies
npm install

# Seed the database
npm run seed

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check & database connection status |
| GET | `/api/insights` | Get filtered, searchable, and paginated insights |
| GET | `/api/filters` | Get distinct values for all dropdowns |
| GET | `/api/stats` | Get aggregated statistics across 6 chart dimensions |

### Query Parameters for `/api/insights`

| Param | Type | Description |
|---|---|---|
| `topic` | string | Filter by topic |
| `sector` | string | Filter by sector |
| `region` | string | Filter by region |
| `pestle` | string | Filter by PESTLE category |
| `source` | string | Filter by source |
| `country` | string | Filter by country |
| `end_year` | number | Filter by end year |
| `search` | string | Search in title and insight |
| `sortBy` | string | Sort field (`added`, `intensity`, `relevance`, `likelihood`, `end_year`) |
| `order` | string | Sort order (`asc`, `desc`) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 25, max: 100) |

## Data Notes

The original project brief references a "SWOT filter," but the dataset does not contain a SWOT field. The dashboard uses `pestle` (PESTLE categories) and `sector` (industry sectors) as the dual-filter system instead. The `city` field is also absent from the dataset and has been excluded from the API.

## Swagger Documentation

Interactive API documentation is available at `http://localhost:5000/api-docs` when the server is running.
