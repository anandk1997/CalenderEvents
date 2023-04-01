import express from "express";
import {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent
} from "../controllers/eventsController.js";

const router = express.Router();

router.get("/event", getEvents);
router.post("/event", createEvent);
router.put("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);




export default router;