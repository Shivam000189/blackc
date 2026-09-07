import { Router } from "express";
import { getFilters } from "../controllers/filters.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getFilters));

export default router;
