import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import { syncModels } from "./repository/syncModels";
import cors from "cors";

const app = express();
const port = process.env.API_PORT;

// Enable CORS for all origins
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API Routes
app.use("/api", routes);

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log('Syncing models...');
    await syncModels();
});
