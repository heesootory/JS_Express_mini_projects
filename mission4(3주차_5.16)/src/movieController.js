/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

// Add your magic here!

export const home = async (req, res) =>{
    const movies = await Movie.find({}).sort({rating : "desc"});
    return res.render("home", {pageTitle: "home", movies});
}
export const getUpload = (req, res) =>{
    return res.render("upload", {pageTitle: "upload movie"});
}
export const postUpload = async (req, res) =>{
    const {title, summary, year, genres, rating} = req.body;
    try{
        await Movie.create({
            title,
            summary,
            year,
            genres : Movie.sharps_genres(genres),
            rating,
        });
        return res.redirect("/");
    }catch{error}{
        return res.render("upload",{ 
            pageTitle: "Please, ReUpload movie",
            errorMessage : error._message
        });
    }
}
export const detailMovie = async (req, res) =>{
    const {id} = req.params;
    const movie = await Movie.findById(id);
    if(movie){
        return res.render("detail", {pageTitle: "detail", movie});
    }
    return res.render("404", {pageTitle: "Not Found"});
}
export const getEdit = async (req, res) =>{
    const {id} = req.params;
    const movie = await Movie.findById(id);
    if(!movie){
        return res.render("404", {pageTitle: "Not Found"});
    }
    return res.render("edit", {pageTitle: `Edit ${movie.title}`, movie});
}
export const postEdit = async (req, res) =>{
    const {id} = req.params;
    const {title, summary, year, genres, rating} = req.body;
    const movie = await Movie.exists({_id:id});
    await Movie.findByIdAndUpdate(id, {
        title,
        summary,
        year,
        genres : Movie.sharps_genres(genres),
        rating,
    })
    if(!movie){
        return res.render("404", {pageTitle: "Not Found"});
    }
    return res.redirect(`/movies/${id}`)
}
export const deleteMovie = async (req, res) =>{
    const {id} = req.params;
    await Movie.findByIdAndDelete(id);
    return res.redirect("/");
}
export const search = async (req, res) =>{
    const { query : {key_title, key_rating } } = req;
    console.log(key_title);
    console.log(key_rating);
    let found_movies = [];
    if(key_title && key_rating){
        found_movies = await Movie.find({
            title:{
                $regex: new RegExp(key_title, "i"),
            },
            rating: key_rating
        })
    }
    else if(key_title){
        found_movies = await Movie.find({
            title:{
                $regex: new RegExp(key_title, "i"),
            }
        })
    }else if(key_rating){
        found_movies = await Movie.find({
            rating: key_rating
        })
    }
    return res.render("search", {pageTitle: "Search", found_movies});
}