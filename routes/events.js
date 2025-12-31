const express = require("express");
const multer = require("multer");
const path = require("path");

// Import controllers
const getEvents = require("../controllers/events/getEvents");
const createEvent = require("../controllers/events/createEvent");
const updateEvent = require("../controllers/events/updateEvent");
const deleteEvent = require("../controllers/events/deleteEvent");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes
router.get("/", getEvents);
router.post("/", upload.single("files[image]"), createEvent);
router.put("/:id", upload.single("files[image]"), updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
