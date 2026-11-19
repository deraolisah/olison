// import mongoose from "mongoose";

// export async function connectDB() {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI);
//     // ${conn.connection.host}

//     console.log(`✅ MongoDB connected`);
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// }


// server/config/db.js
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 5,               // small pool is enough for serverless
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}