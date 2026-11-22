import { Router } from "express";
import { centralValidator } from "../shared/shared.middleware";
import { createFolderValidator, updateFolderValidator } from "./folder.validator";
import { centralController } from "../shared/shared.controller";
import { createFolderService, deleteFolderService, readFoldersService, updateFolderService } from "./folder.service";
import { authenticate } from "../auth/auth.middleware";
import { idParamsValidator } from "../shared/shared.validator";

const router = Router();

router.use(authenticate);

router.post("/", centralValidator(createFolderValidator, "body"), centralController(createFolderService, 201));
router.get("/", centralController(readFoldersService));
router.patch("/:id", centralValidator(idParamsValidator, "params"), centralValidator(updateFolderValidator, "body"), centralController(updateFolderService));
router.delete("/:id", centralValidator(idParamsValidator, "params"), centralController(deleteFolderService));

export default router;