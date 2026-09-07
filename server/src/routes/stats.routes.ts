import { Router } from "express";
import { getStats } from "../controllers/stats.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validateQuery } from "../middleware/validateRequest";
import { statsQuerySchema } from "../schemas/insight.schema";

const router = Router();

router.get("/", validateQuery(statsQuerySchema), asyncHandler(getStats));

export default router;
