import express from "express";
import authRoutes from "./features/auth/auth.routes";
import folderRoutes from "./features/folder/folder.routes";
import bookmakrRoutes from "./features/bookmark/bookmark.routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./features/shared/errorHandler";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";

const app = express();

app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests, try again later" }
}));

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/folders", folderRoutes);
app.use("/bookmarks", bookmakrRoutes);

app.use(errorHandler);

export default app;