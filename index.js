import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'

import posts from "./routers/posts.js";
import users from "./routers/users.js";


const URL = 'mongodb+srv://eanh270:s5EtsJzCwltEhDTz@cluster0.tjxyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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
        app.listen(PORT, () => {
            console.log(`server is runing on port ${PORT}`);
        });
    }).catch(err => {
        console.log('err', err);
    })