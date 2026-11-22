import express from "express";
import { centralValidator } from "../shared/shared.middleware";
import { loginUserValidator, registerUserValidator } from "./auth.validator";
import { authController } from "./auth.controller";
import { loginUserService, registerUserService } from "./auth.service";

const router = express.Router();

router.post("/register", centralValidator(registerUserValidator, "body"), authController(registerUserService, "User registred successfully", 201));
router.post("/login", centralValidator(loginUserValidator, "body"), authController(loginUserService, "User login successfully"));

export default router;