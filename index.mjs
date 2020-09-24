import mongoose from 'mongoose';
import express from 'express';
import ejs from 'ejs';
import nav from './routes/navigation/nav.mjs';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';

import routerMain from './routes/main.mjs';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

// Command to establish connection with mongo db;
mongoose.connect('mongodb+srv://Users:sudhir@1997@bloggersproject.cdtyx.mongodb.net/Blog', {useNewUrlParser: true,useUnifiedTopology: true});

const app=express();
// This is For parsing multipart data.
app.use(fileUpload());
// This is used for parsing Json Request
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'keyboard cat'
  }))
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true}));
// Templating Engine
app.set('view engine', 'ejs');
// Command to send Static Files
app.use(express.static('public'));


app.use('/',nav);
app.use('/',routerMain);
// app.use('/',(req,res)=>{res.render('./views/error.ejs')});


let port=process.env.PORT;
app.listen(port,()=>{console.log("Conection Established")});