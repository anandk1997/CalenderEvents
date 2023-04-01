import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {
    fileURLToPath
} from 'url';
// import router from "./routes/index.js";
// import router from "./routes/eventsRoutes";
import router from "./routes/index.js"
// import {generateAdmin} from './Utils/UniversalFunctions.js'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
dotenv.config()

let app = express();

app.all('*', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
    next();
});

let corsOptions = {};

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true
}));
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, "../download-csv")));
app.use(express.static(path.join(__dirname, "../upload")));
app.use("/api/v1", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// generateAdmin()
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// mongoose.connect(process.env.MONGODB_URI, {
//     useUnifiedTopology:true,
//     useNewUrlParser:true
// }, ()=>console.log("Connected to Mongodb"))

let DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
};


const PORT = 3028;
let DB_HOST = "127.0.0.1" || "localhost";
// let DB_PORT = 27017;
let DB_NAME = "calender_scheduler";
const databaseUrl = "mongodb://" + DB_HOST + "/" + DB_NAME;



let mongodb = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await mongoose.connect(databaseUrl, DB_OPTIONS);
            console.log("***********mongodb db connected sucessfully***********");
            app.listen(PORT, () => {
                console.log(`APP is running successfully on port ${PORT}`);
            });
            return resolve(client);
        } catch (error) {
            console.log(error, "***********db connection Error***********");
            return reject(error);
        }
    });
};
//MongoClient.set('debug', false);
mongodb();

export default app;