import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { DBConnection } from "./config/dbConfig";

(async () => {
    await DBConnection();
})();

app.listen(process.env.PORT, () => {
    console.log(`your site listen on http://localhost:${process.env.PORT}`);
});