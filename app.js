import express from "express";
import { statusCode } from "./utils/helpers.js";
import reservationRoutes from "./routes/reservationRoutes.js";

const app = express();
const port = 5000;
const hostname = "127.0.0.1";

app.use(express.json()); // parse JSON request bodies (needed for POST/PUT)

app.get("/", (_req, res) => {
  res.status(statusCode.OK).send("welcome to restaurant reservation");
});

app.use("/reservations", reservationRoutes); // mount the reservation API

export default app

// app.listen(port, () => {
//   console.log(`server running at http://${hostname}:${port}/`);
// });
