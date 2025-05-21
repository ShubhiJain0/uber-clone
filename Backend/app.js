
const express = require("express");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

app.use(cors({
  origin: 'https://uber-clone-frontend-69ue.onrender.com', // ✅ frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

express.options("*", cors());
const conntectToDb = require('./db/db')

const userRoutes = require('./routes/user.routes')

const captainRoutes = require("./routes/captain.routes")

const mapsRoutes = require("./routes/maps.routes")

const rideRoutes = require("./routes/ride.routes")

const cookieParser = require("cookie-parser")

app.use(express.json());

app.use(express.urlencoded({extended : true}))

app.use(cookieParser());

conntectToDb();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/users' , userRoutes)

app.use("/captains" , captainRoutes)

app.use("/maps", mapsRoutes);

app.use("/rides", rideRoutes)

module.exports = app;
