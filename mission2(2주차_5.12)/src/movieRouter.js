import express from "express";
import { home, movieDetail, getUpload, postUpload } from "./movieController";

const movieRouter = express.Router();

// create the '/' route
// create the /:id route
// create the /add route (GET + POST)
movieRouter.get("/", home);
movieRouter.get("/:id(\\d+)", movieDetail);
movieRouter.route("/add").get(getUpload).post(postUpload);


export default movieRouter;
