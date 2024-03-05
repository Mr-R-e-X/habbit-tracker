export const isLoggedIn = (req, res, next) => {
  try {
    if (req.session.user) {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - User not logged in" });
    }
  } catch (error) {
    console.error("Error in Sign in route handler:", error);
    res.status(500).send("Internal Server Error");
  }
};
