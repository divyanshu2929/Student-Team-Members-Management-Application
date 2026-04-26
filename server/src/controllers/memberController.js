import fs from "node:fs";
import path from "node:path";
import { Member } from "../models/Member.js";

export const createMember = async (req, res) => {
  const {
    fullName,
    role,
    email,
    contactNumber,
    department,
    bio,
  } = req.body;

  if (!fullName || !role || !email || !contactNumber || !department || !req.file) {
    return res.status(400).json({
      message: "All required fields and a profile image must be provided.",
    });
  }

  const member = await Member.create({
    fullName,
    role,
    email,
    contactNumber,
    department,
    bio,
    image: req.file.filename,
  });

  return res.status(201).json(member);
};

export const getMembers = async (_req, res) => {
  const members = await Member.find().sort({ createdAt: -1 });
  return res.json(members);
};

export const getMemberById = async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  return res.json(member);
};

export const deleteMember = async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  const imagePath = path.resolve("uploads", member.image);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  await member.deleteOne();

  return res.json({ message: "Member deleted successfully" });
};
