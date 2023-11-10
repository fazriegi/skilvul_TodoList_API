const express = require("express");
const routes = require("./routes");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

db.then(() => {
  console.log("success connect to database");
}).catch((error) => {
  console.log("failed to connect to database", error);
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
