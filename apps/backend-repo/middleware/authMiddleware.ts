import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization?.split("Bearer ")[1] !==
    "shortlist-rifky-rangkuti"
  ) {
    res.status(401).json({
      error: true,
      message: "Add 'Bearer shortlist-rifky-rangkuti' to your header.",
    });
  }
  next();
};

export { authMiddleware as default };
