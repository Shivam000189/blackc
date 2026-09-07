import { Router } from "express";
import insightsRoutes from "./insights.routes";
import filtersRoutes from "./filters.routes";
import statsRoutes from "./stats.routes";

const router = Router();

router.use("/insights", insightsRoutes);
router.use("/filters", filtersRoutes);
router.use("/stats", statsRoutes);

export default router;
