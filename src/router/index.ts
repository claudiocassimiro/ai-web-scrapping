import { Router } from "express";
import topicController from "../controllers/topicController/handlerTopic";
import resolver from "../middleware/errorAdapter";
const router = Router();

router.post("/api/topic", resolver(topicController.topic));

export default router;
