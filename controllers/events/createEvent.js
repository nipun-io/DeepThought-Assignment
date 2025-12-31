const { connectToDatabase } = require("../../db.js");

async function createEvent(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("events");

    const eventData = {
      type: "event",
      uid: req.body.uid ? parseInt(req.body.uid) : 18,
      name: req.body.name,
      tagline: req.body.tagline,
      schedule: req.body.schedule ? new Date(req.body.schedule) : new Date(),
      description: req.body.description,
      files: req.file ? { image: req.file.path } : {},
      moderator: req.body.moderator,
      category: req.body.category,
      sub_category: req.body.sub_category,
      rigor_rank: req.body.rigor_rank ? parseInt(req.body.rigor_rank) : 0,
      attendees: [],
    };

    const result = await collection.insertOne(eventData);

    console.log(`[POST] Event created successfully. ID: ${result.insertedId}`);
    res.status(201).json({
      message: "Event created successfully",
      eventId: result.insertedId,
    });
  } catch (error) {
    console.error("[POST] Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = createEvent;
