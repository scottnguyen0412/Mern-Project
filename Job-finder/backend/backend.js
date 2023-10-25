import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import morgan  from 'morgan';
import bodyParser from 'body-parser';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import dbConfig from './dbConfig/dbConfig.js';

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5001;

// Mongo connection
dbConfig();

app.use(cors());
app.use(xss());
app.use(bodyParser.urlencoded({extended: true}));
app.use(mongoSanitize);
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true}))

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})