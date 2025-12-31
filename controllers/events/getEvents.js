const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../../db");

async function getEvents(req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("events");

    // Get event by ID
    if (req.query.id) {
      const eventId = req.query.id;

      if (!ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID format" });
      }

      const event = await collection.findOne({ _id: new ObjectId(eventId) });

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      return res.json(event);
    }

    // Get latest events with pagination
    if (req.query.type === "latest") {
      const limit = parseInt(req.query.limit) || 5;
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;

      const events = await collection
        .find({})
        .sort({ schedule: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

      return res.json(events);
    }

    // Default: return all events
    const events = await collection.find({}).toArray();
    return res.json(events);
  } catch (error) {
    console.error("[GET] Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getEvents;
