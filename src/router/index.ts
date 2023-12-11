import { Router } from "express";
import resolver from "../middleware/errorAdapter";
import { authenticateToken } from "../middleware/authenticateToken";
import { searchTopicController } from "../controllers/Topic/searchTopicController";
import { getSingleUserController } from "../controllers/User/getUserController";
import { createUserController } from "../controllers/User/createUserController";
import { authPasswordController } from "../controllers/Auth/authPasswordController";
import { updateUserPasswordController } from "../controllers/User/updateUserController";
import { deleteUserController } from "../controllers/User/deleteUserController";
import { getAllTopicsController } from "../controllers/Topic/getAllTopicsController";

const router = Router();

router.post("/api/topic", authenticateToken, resolver(searchTopicController));
router.get(
  "/api/getTopics",
  authenticateToken,
  resolver(getAllTopicsController),
);

router.post("/api/register", resolver(createUserController));
router.post("/api/login", resolver(authPasswordController));
router.get("/api/:id", authenticateToken, resolver(getSingleUserController));
router.put(
  "/api/:id",
  authenticateToken,
  resolver(updateUserPasswordController),
);
router.delete("/api/:id", authenticateToken, resolver(deleteUserController));

export default router;
