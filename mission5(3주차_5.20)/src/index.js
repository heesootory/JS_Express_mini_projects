import "./db";
import "./models/User";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import userRouter from "./userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true
  })
);
app.use(localsMiddleware);
app.use("/", userRouter);


const PORT = 4000;


// 외부로 개방
const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);




// Codesanbox does not need PORT :)
//app.listen(() => console.log(`✅  Server Ready!`));
