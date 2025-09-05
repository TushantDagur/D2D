const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const testRoutes = require('./routes/testRoute')
const doctorRoutes = require("./routes/doctorRoute");
const userRoutes = require("./routes/userRoute");
const bookingRoutes = require("./routes/bookingRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const labRoutes = require("./routes/labRoute");
const labBookingRoutes = require("./routes/labBookingRoute"); // Add this line

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Routes
app.use('/api/test', testRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/labs", labRoutes);
app.use("/api/labbookings", labBookingRoutes); // Add this line

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));