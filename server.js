const express = require("express");
const movieRouter = require("./routes/movie_routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", movieRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
