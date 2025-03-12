import { controller } from "../controller/api";
import authMiddleware from "../middleware/authMiddleware";

const express = require("express");
const r = express.Router();

r.get("/fetch-user-data", authMiddleware, controller.fetchUser);
r.put("/update-user-data", authMiddleware, controller.updateUser);

export default r;
