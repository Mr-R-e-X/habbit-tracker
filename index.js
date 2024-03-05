import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1 * 60 * 60 * 1000, // Set to 1 hours (in milliseconds)
      secure: false, // Set to true in a production environment with HTTPS
    },
  })
);

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`App is running in Port number ---> ${port}`);
});
