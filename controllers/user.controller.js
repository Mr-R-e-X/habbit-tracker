import { connectToDB, closeDBConnection } from "../config/db.config.js";
import { addUser, findUser } from "../models/user.schema.js";
export const registerController = async (req, res) => {
  try {
    await connectToDB();
    const { username, email, password } = req.body;
    const addingUser = await addUser(username, email, password);
    if (addingUser.success) {
      //   console.log(addingUser.user);
      return res.status(200).json({
        success: true,
        message: "User Successfully Registered!",
        user: {
          username: addingUser.user.username,
          email: addingUser.user.email,
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        error: addingUser.error,
      });
    }
  } catch (error) {
    console.error("Error in Registration route handler:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await closeDBConnection();
  }
};

export const signInController = async (req, res) => {
  try {
    await connectToDB();
    const { email, password } = req.body;
    const user = await findUser(email, password);
    if (user.success) {
      req.session.user = {
        username: user.user.username,
        email: user.user.email,
      };
      return res.status(200).json({
        success: true,
        message: "Logged In Successfully !",
        user: {
          username: user.user.username,
          email: user.user.email,
        },
      });
    } else {
      if (user.error === "User not found!!!") {
        return res.status(400).json({
          success: false,
          message: user.error,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: user.error,
        });
      }
    }
  } catch (error) {
    console.error("Error in Sign in route handler:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await closeDBConnection();
  }
};

export const profileController = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User profile page",
    user: {
      username: req.session.user.username,
      email: req.session.user.email,
    },
  });
};
