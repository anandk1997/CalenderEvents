import events from "../models/eventsModel.js";

export const getEvents = async (req, res) => {
  try {
    const allEvents = await events.find();
    res.status(200).json({
      message: "Success",
      allEvents,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export const createEvent = async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    description,
    priority
  } = req.body;
  const newEvent = new events({
    title,
    startDate,
    endDate,
    description,
    priority,
  });

  try {
    await newEvent.save();
    res.status(201).json({
      message: "Event Created successfully",
      newEvent,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
}

export const updateEvent = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    title,
    startDate,
    endDate,
    description,
    priority
  } = req.body;

  try {
    const event = await events.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    event.title = title || event.title;
    event.startDate = startDate || event.startDate;
    event.endDate = endDate || event.endDate;
    event.description = description || event.description;
    event.priority = priority || event.priority;

    const updatedEvent = await event.save();
    res.status(200).json({
      message: "Event Updated successfully",
      updatedEvent,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
}

export const deleteEvent = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const deletedEvent = await events.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }
    res.status(200).json({
      message: "Event deleted successfully"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server Error"
    });
  }
}