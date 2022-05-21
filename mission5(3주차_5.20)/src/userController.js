/*
You DONT have to import the User with your username.
Because it's a default export we can nickname it whatever we want.
So import User from "./models"; will work!
You can do User.find() or whatever you need like normal!
*/
import User from "./models/User";
import bcrypt from 'bcrypt';

// Add your magic here!

export const home = (req, res) =>{
    return res.render("home", {pageTitle : "Home"});
}

export const getJoin = (req, res) =>{
    return res.render("join", {pageTitle : "Join"} );
}

export const postJoin = async (req, res) =>{
    const {name, username, password} = req.body;
    const pageTitle = "Join";
    const exist = await User.exists({username});
    if(exist){
        return res.status(400).render("join",{
            pageTitle,
            errorMessage: "username already taken",
        })
    }
    try{
        await User.create({
            name,
            username,
            password,
        });
    return res.redirect("/login");
    }catch(error){
        return res.status(400).render("join", {
            pageTitle,
            errorMessage : error._message
        });
    }
}

export const getLogin = (req, res) =>{
    return res.render("login", {pageTitle : "Login"});
}

export const postLogin = async (req, res) =>{
    const {username, password} = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login", {
            pageTitle,
            errorMessage :"Does not exist",
        });
    }
    const validate = await bcrypt.compare(password, user.password);
    if(!validate){
        return res.status(400).render("login", {
            pageTitle,
            errorMessage :"Wrong password",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    console.log("welcome!!");
    return res.redirect("/");
}