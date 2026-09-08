import { Router } from "express";
import { getStats, getCompletenessStats } from "../controllers/stats.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validateQuery } from "../middleware/validateRequest";
import { statsQuerySchema } from "../schemas/insight.schema";

const router = Router();

router.get("/completeness", asyncHandler(getCompletenessStats));
router.get("/", validateQuery(statsQuerySchema), asyncHandler(getStats));

export default router;
