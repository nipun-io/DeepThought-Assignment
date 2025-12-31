const { ObjectId } = require("mongodb");
const fs = require("fs");
const { connectToDatabase } = require("../../db");

async function deleteEvent(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("events");
    const eventId = req.params.id;

    if (!ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: "Invalid event ID format" });
    }

    // Find event first to get file path
    const event = await collection.findOne({ _id: new ObjectId(eventId) });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Delete image file if exists
    if (event.files && event.files.image) {
      const filePath = event.files.image;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await collection.deleteOne({ _id: new ObjectId(eventId) });

    console.log(`[DELETE] Event deleted successfully: ${eventId}`);
    res.json({
      message: "Event deleted successfully",
      deletedCount: 1,
    });
  } catch (error) {
    console.error("[DELETE] Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = deleteEvent;
