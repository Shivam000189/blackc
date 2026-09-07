import { Router } from "express";
import { getInsights } from "../controllers/insights.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validateQuery } from "../middleware/validateRequest";
import { insightFiltersSchema } from "../schemas/insight.schema";
import { paginate } from "../middleware/paginate";

const router = Router();

router.get("/", paginate(25), validateQuery(insightFiltersSchema), asyncHandler(getInsights));

export default router;
