require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

// 🔥 DEBUG LOG (to confirm deployment)
console.log("🔥 NEW CODE DEPLOYED");

// IMPORT ROUTES
const authRoutes    = require("./routes/auth.routes");
const adminRoutes   = require("./routes/admin.routes");
const mentorRoutes  = require("./routes/mentor.routes");
const studentRoutes = require("./routes/student.routes");
const teacherRoutes = require("./routes/teacher.routes");
const parentRoutes  = require("./routes/parent.routes");

const app = express();

// ================= DATABASE CONNECTION =================
console.log("🔄 Connecting to Railway DB...");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ Connected to Railway DB");
  }
});

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth",    authRoutes);
app.use("/api/admin",   adminRoutes);
app.use("/api/mentor",  mentorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/parent",  parentRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Mentra Backend Running");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});