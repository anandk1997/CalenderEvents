import mongoose from "mongoose";

const eventsSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.ObjectId,
      ref: "events",
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      max: 500,
      index: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    endDate: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventsSchema);

export default Event;
