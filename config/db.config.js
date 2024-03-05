import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongodbUrl = process.env.DBURL;

const client = new MongoClient(
  "mongodb+srv://Souvik:Souvik123@rex.cdo4xtk.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
export const connectToDB = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export const closeDBConnection = async () => {
  await client.close();
  console.log("Connection to the database closed");
};

export default client;
