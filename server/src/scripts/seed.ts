import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { IRawInsight } from "../types/insight.types";
import { cleanRecord } from "../utils/cleanRecord";
import { Insight } from "../models/Insight";
import dotenv from "dotenv";

dotenv.config();

const DATA_PATH = path.join(__dirname, "../../data/jsondata.json");
const MONGO_URI = process.env.MONGO_URI as string;

const seed = async () => {
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI not found in .env");

    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Optional: wipe collection before seeding (remove if you want to append)
    await Insight.deleteMany({});
    console.log("Cleared existing insights");

    const rawData: IRawInsight[] = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    const cleanedData = rawData.map(cleanRecord);

    const result = await Insight.insertMany(cleanedData, { ordered: false });
    console.log(`Seeded ${result.length} documents`);

    await mongoose.disconnect();
    console.log("Disconnected");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();