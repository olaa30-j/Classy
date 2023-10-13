import express from 'express';
import authRouting from './routes/auth.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import {registration} from './controller/auth.js';
import usersRouting from './routes/users.js';
import postRouthing from './routes/post.js';
import {createPost} from './controller/post.js'
import { verifyToken } from './middleware/auth.js';
// import User from './model/auth.js';
// import Post from './model/post.js';


// config environment
dotenv.config();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use("/assets", express.static(path.join(_dirname, "public/assets")))

app.use(express.json()); // Use built-in JSON parsing
app.use(express.urlencoded({ extended: true })); // Use built-in URL-encoded parsing
app.use(cors());

const storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, "public/assets")
  },  
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})
const upload = multer({storage});

// file routes 
app.post("/auth/register/", upload.single("picture"), registration);
app.post("/posts/create", verifyToken, upload.single("picture"), createPost);


// routes 
app.use('/auth', authRouting);
app.use('/user', usersRouting); 
app.use('/posts', postRouthing);

//configuration the server side with mongoose library 
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });






