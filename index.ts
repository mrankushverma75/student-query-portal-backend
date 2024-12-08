import express, { query, Request, Response } from "express";
import bodyParser from "body-parser";
import routes  from "./routes";
import { syncModels } from "./repository/syncModels";
const app = express();
const port = process.env.API_PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api",routes);

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log('syncing models');
    await syncModels();
});
