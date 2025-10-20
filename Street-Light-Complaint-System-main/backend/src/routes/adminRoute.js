import { Router } from "express";

const router = Router();

import {login, logout, register, profile} from "../controllers/adminController.js";

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.get("/profile", profile)

export default router;