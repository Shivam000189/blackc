import { Request, Response, NextFunction } from "express";

export interface PaginatedRequest extends Request {
  pagination?: {
    page: number;
    limit: number;
    skip: number;
  };
}

export const paginate = (defaultLimit: number = 25) => {
  return (req: PaginatedRequest, _res: Response, next: NextFunction): void => {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || defaultLimit));

    req.pagination = { page, limit, skip: (page - 1) * limit };
    next();
  };
};
