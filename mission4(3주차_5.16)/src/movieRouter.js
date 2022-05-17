import express from "express";
import {home, getUpload, postUpload, detailMovie, getEdit, postEdit, deleteMovie, search} from "../src/movieController.js";
const movieRouter = express.Router();

// Add your magic here!

movieRouter.get("/", home);
movieRouter.route("/upload").get(getUpload).post(postUpload);
movieRouter.get("/movies/:id([0-9a-f]{24})", detailMovie);
movieRouter.route("/movies/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
movieRouter.get("/movies/:id([0-9a-f]{24})/delete", deleteMovie);
movieRouter.get("/search", search);

export default movieRouter;


//([0-9a-f]{24})