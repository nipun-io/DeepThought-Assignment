const { ObjectId } = require("mongodb");
const fs = require("fs");
const { connectToDatabase } = require("../../db");

async function updateEvent(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("events");
    const eventId = req.params.id;

    if (!ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: "Invalid event ID format" });
    }

    // 1. Fetch existing event first to get old file path
    const existingEvent = await collection.findOne({
      _id: new ObjectId(eventId),
    });

    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.tagline) updateData.tagline = req.body.tagline;
    if (req.body.schedule) updateData.schedule = new Date(req.body.schedule);
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.moderator) updateData.moderator = req.body.moderator;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.sub_category) updateData.sub_category = req.body.sub_category;
    if (req.body.rigor_rank)
      updateData.rigor_rank = parseInt(req.body.rigor_rank);
    if (req.file) updateData.files = { image: req.file.path };

    // 2. Update the database
    const result = await collection.updateOne(
      { _id: new ObjectId(eventId) },
      { $set: updateData }
    );

    // 3. If update successful and new file uploaded, delete old file
    if (req.file && existingEvent.files && existingEvent.files.image) {
      const oldFilePath = existingEvent.files.image;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    console.log(`[PUT] Event updated successfully: ${eventId}`);
    res.json({
      message: "Event updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("[PUT] Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = updateEvent;
