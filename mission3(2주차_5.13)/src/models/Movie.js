import mongoose from "mongoose";

// Create a Movie Model here.
const movieSchema = new mongoose.Schema({
    title: {type: String, required: true, maxlength: 30},
    summary: {type: String, required: true,  maxlength: 500},
    year: {type: Date, default: Date.now},
    rating: {type: Number, required: true},
    genres: {
        type: [String], 
        required: true
    },
    hidden: Boolean,
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;



