import client from "../config/db.config.js";

const userSchema = () => {
  const database = client.db("Habit_Tracker");
  const userCollection = database.collection("users");

  return userCollection;
};

export const addUser = async (username, email, password) => {
  try {
    const newUser = {
      username: username,
      email: email,
      password: password,
      habbits: [],
    };
    const userCollection = userSchema();
    const user = await userCollection.findOne({ email: email });
    if (user) {
      return {
        success: false,
        error: "User Email Id already exists !",
      };
    }
    await userCollection.insertOne(newUser);
    return {
      success: true,
      user: newUser,
    };
  } catch (error) {
    console.error("Error adding user:", error);
    return {
      success: false,
      error: error,
    };
  }
};

export const findUser = async (email, password) => {
  try {
    const userCollection = userSchema();

    const user = await userCollection.findOne({ email: email });

    if (!user) {
      return {
        success: false,
        error: "User not found!!!",
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        error: "Unauthorized! Please enter a valid credentials.!",
      };
    }
    return {
      success: true,
      user: user,
    };
  } catch (error) {
    console.error("Error adding user:", error);
    return {
      success: false,
      error: error,
    };
  }
};
