import express from "express";
import {
  createMember,
  deleteMember,
  getMemberById,
  getMembers,
} from "../controllers/memberController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getMembers);
router.get("/:id", getMemberById);
router.post("/", upload.single("image"), createMember);
router.delete("/:id", deleteMember);

export default router;
