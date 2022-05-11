import express from "express";
import path from "path";
import "./db";
import movieRouter from "./movieRouter";

const PORT = 4000;

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/", movieRouter);

// Codesanbox does not need PORT :)
//app.listen(() => console.log(`✅  Server Ready!`));

const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
