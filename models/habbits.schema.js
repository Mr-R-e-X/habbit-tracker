import client from "../config/db.config.js";

const habbitSchema = () => {
  const database = client.db("Habit_Tracker");
  const habbitCollection = database.collection("habbits");
};
