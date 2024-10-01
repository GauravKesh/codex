const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const logger = require("./utils/logger");
const { limiter } = require("./utils/apiRateLimit");
const { connectToDatabases } = require("../config/db"); // Update with your correct path
const jwt = require("jsonwebtoken");
const { error } = require("console");
const http = require("http");
const login = require("./routes/loginRoutes")
const signup = require("./routes/signupRoutes");
const { sign } = require("crypto");


const app = express();
const PORT = process.env.PORT || 9090;
const server = http.createServer(app);

// Middleware
app.use(helmet()); 
const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming origin is in the list of allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Enables Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parses incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded data
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files
app.use(limiter);
// Socket {TO SHOW ACTIVE USERS}
// setupSocket(server);
// setupSocketLive(server);

// Database Connection
connectToDatabases((err) => {
  if (!err) {
    logger.info("Database connected successfully"); // Log successful database connection
  } else {
    logger.error("Error connecting to database:", err); // Log error connecting to database
  }
});

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Ensure to set this in your environment variables

// Utility function to generate JWT
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

// Connect to Databases
connectToDatabases()
  .then(() => {
    logger.info("All databases connected successfully");

    // Routes
    app.get("/", (req, res) => {
      let total = 0;
      for (let i = 0; i < 50_000_000; i++) {
        total++;
      }
      res.send(`Welcome to the ieee :- ${total}`); // Default
      console.log("called...");
    });

    app.use("/api/user/login",login);
    app.use("/api/user/signup",signup);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error("Error:", err.stack); 
      res.status(500).json({ message: "Something went wrong!" }); 
    });

    // Start server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Error connecting to databases:", err); 
    process.exit(1); 
  });
