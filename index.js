import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import posts from "./routers/posts.js";
import users from "./routers/users.js";

dotenv.config();


const URL = process.env.MONGO_URL;

const app = express();
const PORT = 5000 || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

// app.get('/', (req, res) => {
//     res.send('SUCCESS');
// });

// http://localhost:5000/posts
app.use('/api/v1/posts', posts);
app.use('/api/v1/user', users);


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connect done");
        app.listen(5000, () => {
            console.log(`server is runing on port 5000`);
        });
    }).catch(err => {
        console.log('err', err);
    })