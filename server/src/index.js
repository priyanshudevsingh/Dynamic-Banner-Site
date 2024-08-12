const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const bannerRouter = require("./routes/banner");

const app = express();
dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tuf.priyanshudevsingh.me",
      "https://www.tuf.priyanshudevsingh.me",
    ],
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/banner", bannerRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
