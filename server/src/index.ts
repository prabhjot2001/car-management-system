import express from "express";
import cors from "cors";
import { APP_ORIGIN, PORT, URL } from "../constants/env";

const app = express();

app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.get("/:id/", (req, res) => {
  const { id } = req.params;
  res.send(`car id :  ${id}`);
});

//running server
app.listen(PORT, () => {
  console.log(`✅Server is up and running...
URL:http://${URL}:${PORT}`);
});
