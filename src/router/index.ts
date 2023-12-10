import { Router } from "express";
import topicController from "../controllers/Topic/handlerTopicController";
import resolver from "../middleware/errorAdapter";
import { authenticateToken } from "../middleware/authenticateToken";
import { getSingleUserController } from "../controllers/User/getUserController";
import { createUserController } from "../controllers/User/createUserController";
import { authPasswordController } from "../controllers/Auth/authPasswordController";
import { updateUserPasswordController } from "../controllers/User/updateUserController";
import { deleteUserController } from "../controllers/User/deleteUserController";

const router = Router();

router.post("/api/topic", authenticateToken, resolver(topicController.topic));
router.get("/api/:id", authenticateToken, resolver(getSingleUserController));
router.post("/api/register", resolver(createUserController));
router.post("/api/login", resolver(authPasswordController));
router.put(
  "/api/:id",
  authenticateToken,
  resolver(updateUserPasswordController),
);
router.delete("/api/:id", authenticateToken, resolver(deleteUserController));

export default router;
