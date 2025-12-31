const express = require("express");
const path = require("path");
const { connectToDatabase } = require("./db");
const eventRoutes = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v3/app/events", eventRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Event API is running",
    version: "v3",
    endpoints: {
      getEventById: "GET /api/v3/app/events?id=:event_id",
      getLatestEvents: "GET /api/v3/app/events?type=latest&limit=5&page=1",
      createEvent: "POST /api/v3/app/events",
      updateEvent: "PUT /api/v3/app/events/:id",
      deleteEvent: "DELETE /api/v3/app/events/:id",
    },
  });
});

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
