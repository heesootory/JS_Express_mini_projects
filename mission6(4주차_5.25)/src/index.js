import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import { PassThrough } from "stream";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"))

const textRouter = express.Router();

const textUpload = multer({ dest : "uploads" });

const getText = (req, res) => {
    fs.readdir('uploads', (err, files) =>{
        console.log(files);
        return res.render("read", {pageTitle: "TXT to HTML", files});
    });
    
} 

const postText = (req, res) =>{
    const file = req.file;
    //console.log(file);
    fs.readFile( file.path,'utf8', (err, data) => {
        //if(err) throw err;
        console.log(data);
        return res.render("seefile", {data});
    });
}

const readText = (req, res) =>{
    const { id } = req.params;
    //console.log(id);
    fs.readFile(`uploads/${id}`, 'utf8', (err, data)=>{
        return res.render("seefile", {data});
    });
}

app.use("/", textRouter);
textRouter.get("/", getText);
textRouter.post("/read",textUpload.single("text"), postText);
textRouter.get("/read/:id([0-9a-f]{32})", readText)

const PORT = 4000;
// 외부로 개방
const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);