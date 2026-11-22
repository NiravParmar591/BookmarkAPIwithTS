import { Router } from "express";
import { centralValidator } from "../shared/shared.middleware";
import { createBookmarkValidator, folderQueryValidator, updateBookmarkValidator } from "./bookmark.validator";
import { authenticate } from "../auth/auth.middleware";
import { centralController } from "../shared/shared.controller";
import { createBookmarkService, deleteBookmarkService, readBookmarksService, updateBookmarkService } from "./bookmark.service";
import { idParamsValidator } from "../shared/shared.validator";

const router = Router();

router.use(authenticate);

router.post("/", centralValidator(createBookmarkValidator, "body"), centralController(createBookmarkService, 201));
router.delete("/:id", centralValidator(idParamsValidator, "params"), centralController(deleteBookmarkService));
router.patch("/:id", centralValidator(idParamsValidator, "params"), centralValidator(updateBookmarkValidator, "body"), centralController(updateBookmarkService));
router.get("/", centralValidator(folderQueryValidator, "query"), centralController(readBookmarksService));

export default router;