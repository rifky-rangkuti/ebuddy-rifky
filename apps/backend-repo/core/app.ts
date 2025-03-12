import express, { Request, Response } from "express";
import { styleText } from "util";
import bodyParser from "body-parser";
import cors from "cors";

//* Router
import userRoutes from "../routes/userRoutes";

const app = express();
const port = 4000;

app.options("*", cors());
app.use(cors());

//* Api to check whether server is alive
app.get("/healthcheck", (req: Request, res: Response) => {
  res.json({ status: "Server is alive." });
});

app.use(bodyParser.json());

//* Register routes
app.use(userRoutes);

app.listen(port, () => {
  console.log(
    styleText("greenBright", "Application listening on"),
    `http://localhost:${port}`
  );
});
