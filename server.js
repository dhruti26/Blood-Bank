const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
//dot config
dotenv.config();

//mongodb connection
connectDB();
//express features are stored in object named app (rest object)
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); //give message on console about url hit..etc
//routes
//test route
app.use("/api/v1/test", require("./routes/testRoutes"));
//authController
app.use("/api/v1/auth", require("./routes/authRoutes"));
//port
const PORT = process.env.PORT || 8085;

//listen port on 8080
app.listen(PORT, () => {
  console.log(
    `Node Server Running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`
  );
});
