import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
  });
}

// POST /api/auth/register
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ token: signToken(user.id), user });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.trim().toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    res.json({ token: signToken(user.id), user });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me
export async function getMe(req, res) {
  res.json(req.user);
}