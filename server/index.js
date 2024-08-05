const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./config/database");
const PORT = process.env.PORT || 4000;
const cookieParser = require("body-parser");
// Loading environment variables from .env file
dotenv.config();
app.use(express.json());

app.use(cors());
database.connect();

app.use("/api/v1/auth", userRoutes);
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

