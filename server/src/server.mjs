import express from "express";
import cors from "cors";
import router from "./router/main.mjs";
import checkAndCreateTables from "./lib/tables.mjs";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    credentials: true,
    exposedHeaders: "Authorization",
  })
);
checkAndCreateTables();
app.use(express.json());
app.use(express.urlencoded());
app.use(router);
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
